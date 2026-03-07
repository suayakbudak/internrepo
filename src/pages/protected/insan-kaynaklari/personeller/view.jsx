import Button from "@mui/material/Button";

import { paths } from "src/routes/paths";
import { RouterLink } from "src/routes/router-link";

import { _userCards } from "src/_mock";
import { DashboardContent } from "src/pages/protected/layout";

import { Iconify } from "src/components/iconify";
import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";

import { UserCardList } from "./components/user-card-list";

// ----------------------------------------------------------------------

export function UserCardsView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Personeller"
        links={[
          { name: "Anasayfa", href: paths.anasayfa.root },
          { name: "İnsan Kaynakları", href: paths.anasayfa.admin.insanKaynaklari.personeller },
          { name: "Personeller" },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.anasayfa.ayarlar.olustur}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Yeni Kullanıcı
          </Button>
        }
        sx={{ mb: { xs: 2, md: 3 } }}
      />

      <UserCardList users={_userCards} />
    </DashboardContent>
  );
}
