import { DashboardContent } from "src/pages/protected/layout";
import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";
import { paths } from "src/routes/paths";
import { Anket } from "./components/anket";

export default function AnketOlustur() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Anket oluştur"
        links={[
          { name: "Admin Panel", href: paths.anasayfa.admin.root },
          { name: "Anket oluştur" },
        ]}
        sx={{ mb: { xs: 2, md: 3 } }}
      />
      <Anket />
    </DashboardContent>
  );
}
