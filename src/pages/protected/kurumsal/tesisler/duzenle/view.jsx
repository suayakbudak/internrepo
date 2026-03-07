import { paths } from "src/routes/paths";

import { DashboardContent } from "src/pages/protected/layout";

import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";

import { TourNewEditForm } from "./components/tour-new-edit-form";

// ----------------------------------------------------------------------

export function TourEditView({ tour }) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Tesis Düzenle"
        backHref={paths.anasayfa.kurumsal.tesisler.root}
        links={[
          { name: "Anasayfa", href: paths.anasayfa.root },
          { name: "Sosyal Tesisler", href: paths.anasayfa.kurumsal.tesisler.root },
          { name: "Düzenle: " + tour?.name },
        ]}
        sx={{ mb: { xs: 2, md: 3 } }}
      />

      <TourNewEditForm currentTour={tour} />
    </DashboardContent>
  );
}
