import { Button } from "@mui/material";
import { paths } from "src/routes/paths";
import { RouterLink } from "src/routes/router-link";
import { DashboardContent } from "src/pages/protected/layout";
import { Iconify } from "src/components/iconify";
import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";
import { AdminListe } from "./components/admin-liste";

export function AnketView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Anket Listesi"
        links={[
          { name: "Anasayfa", href: paths.anasayfa.root },
          { name: "Admin paneli", href: paths.anasayfa.admin.root },
          { name: "Anket Listesi" },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.anasayfa.admin.anket.olustur}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Anket oluştur
          </Button>
        }
        sx={{ mb: { xs: 2, md: 3 } }}
      />

      <AdminListe />
    </DashboardContent>
  );
}
