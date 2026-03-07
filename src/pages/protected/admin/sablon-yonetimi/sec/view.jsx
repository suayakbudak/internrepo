import { orderBy } from "es-toolkit";
import { useSetState } from "minimal-shared/hooks";
import { useCallback, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import { paths } from "src/routes/paths";
import { RouterLink } from "src/routes/router-link";

import { POST_SORT_OPTIONS } from "src/_mock";
import { useGetPosts } from "src/lib/actions/blog";
import { DashboardContent } from "src/pages/protected/layout";

import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";
import { Iconify } from "src/components/iconify";
import { Label } from "src/components/label";
import { PostListHorizontal } from "src/pages/protected/kurumsal/haberler/liste/components/post-list-horizontal";
import { PostSearch } from "src/pages/protected/kurumsal/haberler/liste/components/post-search";
import { PostSort } from "src/pages/protected/kurumsal/haberler/liste/components/post-sort";
import { titleParam } from "src/routes/param";

// ----------------------------------------------------------------------

export function SablonSec() {
  const { posts, postsLoading } = useGetPosts();

  const [sortBy, setSortBy] = useState("latest");

  const { state, setState } = useSetState({ publish: "all" });

  const dataFiltered = applyFilter({ inputData: posts, filters: state, sortBy });

  const handleFilterPublish = useCallback(
    (event, newValue) => {
      setState({ publish: newValue });
    },
    [setState]
  );

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Şablon Listesi"
        links={[
          { name: "Anasayfa" },
          { name: "Admin Panel" },
          { name: "Şablon Yönetimi" },
          { name: "Şablon Listesi" },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.anasayfa.admin.sablonOlustur}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Şablon Oluştur
          </Button>
        }
        sx={{ mb: { xs: 2, md: 3 } }}
      />

      <Box
        sx={{
          gap: 3,
          display: "flex",
          mb: { xs: 3, md: 5 },
          justifyContent: "space-between",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-end", sm: "center" },
        }}
      >
        <PostSearch
          redirectPath={(title) => titleParam(paths.anasayfa.kurumsal.haberler.details, title)}
        />

        <PostSort
          sort={sortBy}
          onSort={(newValue) => setSortBy(newValue)}
          sortOptions={POST_SORT_OPTIONS}
        />
      </Box>

      <Tabs value={state.publish} onChange={handleFilterPublish} sx={{ mb: { xs: 2, md: 3 } }}>
        {["all", "published", "draft"].map((tab) => (
          <Tab
            key={tab}
            iconPosition="end"
            value={tab}
            label={tab}
            icon={
              <Label
                variant={((tab === "all" || tab === state.publish) && "filled") || "soft"}
                color={(tab === "published" && "info") || "default"}
              >
                {tab === "all" && posts.length}
                {tab === "published" && posts.filter((post) => post.publish === "published").length}
                {tab === "draft" && posts.filter((post) => post.publish === "draft").length}
              </Label>
            }
            sx={{ textTransform: "capitalize" }}
          />
        ))}
      </Tabs>

      <PostListHorizontal posts={dataFiltered} loading={postsLoading} />
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, filters, sortBy }) {
  const { publish } = filters;

  if (sortBy === "latest") {
    inputData = orderBy(inputData, ["createdAt"], ["desc"]);
  }

  if (sortBy === "oldest") {
    inputData = orderBy(inputData, ["createdAt"], ["asc"]);
  }

  if (sortBy === "popular") {
    inputData = orderBy(inputData, ["totalViews"], ["desc"]);
  }

  if (publish !== "all") {
    inputData = inputData.filter((post) => post.publish === publish);
  }

  return inputData;
}
