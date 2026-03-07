import { orderBy } from "es-toolkit";
import { useBoolean, useSetState } from "minimal-shared/hooks";
import { useCallback, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { paths } from "src/routes/paths";
import { RouterLink } from "src/routes/router-link";

import { fIsAfter, fIsBetween } from "src/utils/format-time";

import { _tourGuides, _tours, TOUR_SERVICE_OPTIONS, TOUR_SORT_OPTIONS } from "src/_mock";
import { DashboardContent } from "src/pages/protected/layout";

import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";
import { EmptyContent } from "src/components/empty-content";
import { Iconify } from "src/components/iconify";

import { idParam } from "src/routes/param";
import { TourFilters } from "./components/tour-filters";
import { TourFiltersResult } from "./components/tour-filters-result";
import { TourList } from "./components/tour-list";
import { TourSearch } from "./components/tour-search";
import { TourSort } from "./components/tour-sort";

// ----------------------------------------------------------------------

export function TourListView() {
  const openFilters = useBoolean();

  const [sortBy, setSortBy] = useState("latest");

  const filters = useSetState({
    destination: [],
    tourGuides: [],
    services: [],
    startDate: null,
    endDate: null,
  });
  const { state: currentFilters } = filters;

  const dateError = fIsAfter(currentFilters.startDate, currentFilters.endDate);

  const dataFiltered = applyFilter({
    inputData: _tours,
    filters: currentFilters,
    sortBy,
    dateError,
  });

  const canReset =
    currentFilters.destination.length > 0 ||
    currentFilters.tourGuides.length > 0 ||
    currentFilters.services.length > 0 ||
    (!!currentFilters.startDate && !!currentFilters.endDate);

  const notFound = !dataFiltered.length && canReset;

  const handleSortBy = useCallback((newValue) => {
    setSortBy(newValue);
  }, []);

  const renderFilters = () => (
    <Box
      sx={{
        gap: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: { xs: "flex-end", sm: "center" },
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <TourSearch redirectPath={(id) => idParam(paths.anasayfa.kurumsal.tesisler.details, id)} />

      <Box sx={{ gap: 1, flexShrink: 0, display: "flex" }}>
        <TourFilters
          filters={filters}
          canReset={canReset}
          dateError={dateError}
          open={openFilters.value}
          onOpen={openFilters.onTrue}
          onClose={openFilters.onFalse}
          options={{
            tourGuides: _tourGuides,
            services: TOUR_SERVICE_OPTIONS.map((option) => option.label),
          }}
        />

        <TourSort sort={sortBy} onSort={handleSortBy} sortOptions={TOUR_SORT_OPTIONS} />
      </Box>
    </Box>
  );

  const renderResults = () => (
    <TourFiltersResult filters={filters} totalResults={dataFiltered.length} />
  );

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Tesis Listesi"
        links={[{ name: "Anasayfa", href: paths.anasayfa.root }, { name: "Sosyal Tesisler" }]}
        action={
          <Button
            component={RouterLink}
            href={paths.anasayfa.kurumsal.tesisler.olustur}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Tesis Oluştur
          </Button>
        }
        sx={{ mb: { xs: 2, md: 3 } }}
      />

      <Stack spacing={2.5} sx={{ mb: { xs: 2, md: 3 } }}>
        {renderFilters()}
        {canReset && renderResults()}
      </Stack>

      {notFound && <EmptyContent filled sx={{ py: 10 }} />}

      <TourList tours={dataFiltered} />
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, filters, sortBy, dateError }) {
  const { services, destination, startDate, endDate, tourGuides } = filters;

  const tourGuideIds = tourGuides.map((tourGuide) => tourGuide.id);

  // Sort by
  if (sortBy === "latest") {
    inputData = orderBy(inputData, ["createdAt"], ["desc"]);
  }

  if (sortBy === "oldest") {
    inputData = orderBy(inputData, ["createdAt"], ["asc"]);
  }

  if (sortBy === "popular") {
    inputData = orderBy(inputData, ["totalViews"], ["desc"]);
  }

  // Filters
  if (destination.length) {
    inputData = inputData.filter((tour) => destination.includes(tour.destination));
  }

  if (tourGuideIds.length) {
    inputData = inputData.filter((tour) =>
      tour.tourGuides.some((filterItem) => tourGuideIds.includes(filterItem.id))
    );
  }

  if (services.length) {
    inputData = inputData.filter((tour) => tour.services.some((item) => services.includes(item)));
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter((tour) =>
        fIsBetween(startDate, tour.available.startDate, tour.available.endDate)
      );
    }
  }

  return inputData;
}
