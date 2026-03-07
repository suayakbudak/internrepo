import { DashboardContent } from "src/pages/protected/layout";

import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";
import { UserNewEditForm } from "./components/user-new-edit-form";

// ----------------------------------------------------------------------

export function RolOlustur() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Rol Oluştur"
        links={[
          { name: "Anasayfa" },
          { name: "Admin Panel" },
          { name: "Kullanıcı İşlemleri" },
          { name: "Roller" },
          { name: "Rol Oluştur" },
        ]}
        sx={{ mb: { xs: 2, md: 3 } }}
      />

      <UserNewEditForm />
    </DashboardContent>
  );
}
