import { paths } from "src/routes/paths";
import { DashboardContent } from "src/pages/protected/layout";
import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";
import { UserListe } from "./components/user-liste";
// import { UserAnketListe } from "../components/user-liste";

export function UserAnketView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Kullanıcı Anket Listesi"
        links={[
          { name: "Anasayfa", href: paths.anasayfa.root },
          { name: "Anket" },
          { name: "Kullanıcı Anket Listesi" },
        ]}
      />

      <UserListe />
    </DashboardContent>
  );
}
