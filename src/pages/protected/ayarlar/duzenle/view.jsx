import { paths } from "src/routes/paths";

import { DashboardContent } from "src/pages/protected/layout";

import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";
import { UserNewEditForm } from "../../admin/kullanici-yonetimi/rol-olustur/components/user-new-edit-form";

// ----------------------------------------------------------------------

export function UserEditView({ user: currentUser }) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Edit"
        backHref={paths.anasayfa.ayarlar.liste}
        links={[
          { name: "Dashboard", href: paths.anasayfa.root },
          { name: "User", href: paths.anasayfa.ayarlar.root },
          { name: currentUser?.name },
        ]}
        sx={{ mb: { xs: 2, md: 3 } }}
      />

      <UserNewEditForm currentUser={currentUser} />
    </DashboardContent>
  );
}
