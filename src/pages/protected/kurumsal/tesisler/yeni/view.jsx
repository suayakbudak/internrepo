import { paths } from "src/routes/paths";

import { DashboardContent } from "src/pages/protected/layout";

import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";

import { TourNewEditForm } from "../duzenle/components/tour-new-edit-form";

// ----------------------------------------------------------------------

export function TourCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Sosyal Tesis Oluştur"
        backHref={paths.anasayfa.kurumsal.tesisler.root}
        links={[
          { name: "Anasayfa", href: paths.anasayfa.root },
          { name: "Sosyal Tesisler", href: paths.anasayfa.kurumsal.tesisler.root },
          { name: "Sosyal Tesis Oluştur" },
        ]}
        sx={{ mb: { xs: 2, md: 3 } }}
      />

      <TourNewEditForm />
    </DashboardContent>
  );
}
