import { useBoolean, useSetState } from "minimal-shared/hooks";
import { useCallback, useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { JOB_SORT_OPTIONS } from "src/_mock";
import { DashboardContent } from "src/pages/protected/layout";
import { paths } from "src/routes/paths";
import { RouterLink } from "src/routes/router-link";

import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";
import { EmptyContent } from "src/components/empty-content";
import { Iconify } from "src/components/iconify";

import { idParam } from "src/routes/param";
import { JobFilters } from "./components/job-filters";
import { JobFiltersResult } from "./components/job-filters-result";
import { JobList } from "./components/job-list";
import { JobSearch } from "./components/job-search";
import { JobSort } from "./components/job-sort";
import { getCategories, getAllAdverts } from "src/lib/actions/ilan";
import { toast } from "sonner";
import { LoadingScreen } from "src/components/loading-screen";

// ----------------------------------------------------------------------

export function JobListView() {
  const [categories, setCategories] = useState([]);
  const [adverts, setAdverts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const openFilters = useBoolean();
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("DESC");

  const filters = useSetState({
    categories: [],
  });
  const { state: currentFilters } = filters;

  const canReset = currentFilters?.categories?.length > 0;

  const notFound = !adverts?.length && canReset;

  useEffect(() => {
    const fetchAdverts = async () => {
      try {
        setLoading(true);
        
        // Kategori ID'sini bul
        let categoryId = null;
        if (currentFilters.categories.length > 0) {
          const selectedCategory = categories.find(
            (cat) => cat.name === currentFilters.categories[0]
          );
          categoryId = selectedCategory?.id;
          console.log("🔍 Kategori filtresi:", currentFilters.categories[0], "ID:", categoryId);
        }
        
        const response = await getAllAdverts({
          page: currentPage,
          sortBy,
          sortOrder,
          ...(categoryId && { categoryId }),
        });

        const transformedAdverts = response.data.map((advert) => ({
          id: advert.id,
          title: advert.title,
          description: advert.description,
          salary: {
            price: parseFloat(advert.price),
          },
          category: advert.category,
          features: advert.features,
          company: {
            name: advert.category?.name || "N/A",
          },
          images:
            advert.adImages?.map((img) => ({
              id: img.id,
              imageUrl: img.imageUrl,
              isPrimary: img.isPrimary,
            })) || [],
        }));

        setAdverts(transformedAdverts);
        console.log(`✅ ${transformedAdverts.length} ilan yüklendi`);
      } catch (error) {
        console.error("Error fetching adverts:", error);
        toast.error("İlanlar yüklenirken hata oluştu!");
      } finally {
        setLoading(false);
      }
    };

    fetchAdverts();
  }, [currentPage, sortBy, sortOrder, currentFilters.categories, categories]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Kategoriler yüklenirken hata oluştu!");
      }
    };

    fetchCategories();
  }, []);

  const handleSortBy = useCallback((newValue) => {
    console.log("🔄 Sıralama değişti:", newValue);
    
    if (newValue === "En yeniden eskiye") {
      setSortBy("created_at");
      setSortOrder("DESC");
    } else if (newValue === "En eskiden yeniye") {
      setSortBy("created_at");
      setSortOrder("ASC");
    } else if (newValue === "Fiyata göre artan") {
      setSortBy("price");
      setSortOrder("ASC");
    } else if (newValue === "Fiyata göre azalan") {
      setSortBy("price");
      setSortOrder("DESC");
    } else if (newValue === "Varsayılan") {
      setSortBy("created_at");
      setSortOrder("DESC");
    }
  }, []);

  const renderFilters = () => (
    <Box
      sx={{
        gap: 3,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-end", sm: "center" },
      }}
    >
      <JobSearch redirectPath={(id) => idParam(paths.anasayfa.kurumsal.ilanlar.details, id)} />

      <Box sx={{ gap: 1, flexShrink: 0, display: "flex" }}>
        <JobFilters
          filters={filters}
          canReset={canReset}
          open={openFilters.value}
          onOpen={openFilters.onTrue}
          onClose={openFilters.onFalse}
          categories={categories}
        />

        <JobSort sort={sortBy} onSort={handleSortBy} sortOptions={JOB_SORT_OPTIONS} />
      </Box>
    </Box>
  );

  const renderResults = () => <JobFiltersResult filters={filters} totalResults={adverts.length} />;

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="İlan Listesi"
        links={[{ name: "Anasayfa", href: paths.anasayfa.root }, { name: "İlanlar" }]}
        action={
          <Button
            component={RouterLink}
            href={paths.anasayfa.kurumsal.ilanlar.olustur}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            İlan oluştur
          </Button>
        }
        sx={{ mb: { xs: 2, md: 3 } }}
      />

      <Stack spacing={2.5} sx={{ mb: { xs: 2, md: 3 } }}>
        {renderFilters()}
        {canReset && renderResults()}
      </Stack>

      {notFound && <EmptyContent filled sx={{ py: 10 }} />}

      {loading ? (
        <LoadingScreen />
      ) : (
        <JobList
          jobs={adverts}
          currentPage={currentPage}
          onPageChange={(_, page) => setCurrentPage(page)}
        />
      )}
    </DashboardContent>
  );
}
