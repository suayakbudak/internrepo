import { paths } from "src/routes/paths";

import { DashboardContent } from "src/pages/protected/layout";

import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";

import { JobNewEditForm } from "./components/job-new-edit-form";

import { RouterLink } from "src/routes/router-link";


// ----------------------------------------------------------------------

export function JobEditView({ ilan }) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="İlan Düzenle"
        backHref={paths.anasayfa.kurumsal.ilanlar.root}
        links={[
          { name: "Anasayfa", href: paths.anasayfa.root },
          { name: "İlanlar", href: paths.anasayfa.kurumsal.ilanlar.root },
          { name: "İlan", compotent: RouterLink} ,
          { name: "Düzenle", href: paths.anasayfa.kurumsal.ilanlar.ilan }
        ]}
        sx={{ mb: { xs: 2, md: 3 } }}
      />

      <JobNewEditForm currentJob={ilan} />
    </DashboardContent>
  );
}
