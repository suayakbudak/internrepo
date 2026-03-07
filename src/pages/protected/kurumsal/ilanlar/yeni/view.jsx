import { paths } from "src/routes/paths";

import { DashboardContent } from "src/pages/protected/layout";

import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";

import { JobNewEditForm } from "../duzenle/components/job-new-edit-form";

import { Box } from "@mui/material";

// ----------------------------------------------------------------------

export function JobCreateView() {
  return (
    <DashboardContent>
      <Box
        sx={{
          mx: "auto",
          maxWidth: { xs: 720, xl: 1200 },
        }}
      >
        <CustomBreadcrumbs
          heading="Yeni İlan Oluştur"
          links={[
            { name: "Kurumsal" },
            { name: "İlanlar", href: paths.anasayfa.kurumsal.ilanlar.liste },
          ]}
          activeLast
          sx={{ mb: { xs: 2, md: 3 } }}
        />

        <JobNewEditForm />
      </Box>
    </DashboardContent>
  );
}
