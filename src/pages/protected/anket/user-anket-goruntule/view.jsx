import { DashboardContent } from "src/pages/protected/layout";
import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";
import { Anket } from "./components/anket";
import { _anketGoruntule } from "src/_mock/anket-goruntule";
import { paths } from "src/routes/paths";

// ----------------------------------------------------------------------

export function AnketGoruntule() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Anket Görüntüle"
        links={[
          { name: "Anasayfa", href: paths.anasayfa.root },
          { name: "Anket" },
          { name: "Anket Görüntüle" },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Anket data={_anketGoruntule} />
    </DashboardContent>
  );
}
