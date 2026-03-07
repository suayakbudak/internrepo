import { paths } from "src/routes/paths";

import { DashboardContent } from "src/pages/protected/layout";

import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";

import { UserNewEditForm } from "./components/user-new-edit-form";

// ----------------------------------------------------------------------

export function UserCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Kullanıcı Oluştur"
        links={[
          { name: "Anasayfa", href: paths.anasayfa.root },
          { name: "Kullanıcı İşlemleri", href: paths.anasayfa.ayarlar.root },
          { name: "Kullanıcı Oluştur", href: paths.anasayfa.ayarlar.olustur },
        ]}
        sx={{ mb: { xs: 2, md: 3 } }}
      />

      <UserNewEditForm />
    </DashboardContent>
  );
}
