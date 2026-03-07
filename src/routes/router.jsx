import { createBrowserRouter } from "react-router";
import { AppProviders } from "src/app";

import { AuthGuard } from "src/pages/auth/guard/auth-guard";
import { DashboardLayout } from "src/pages/protected/layout";
import { adminRoutes } from "./groups/admin";
import { authRoutes } from "./groups/auth";
import { ayarlarRoutes } from "./groups/ayarlar";
import { errorRoutes } from "./groups/error";
import { gorevYonetimiRoutes } from "./groups/gorev-yonetimi";
import { iletisimRoutes } from "./groups/iletisim";
//import { insanKaynaklariRoutes } from "./groups/insan-kaynaklari";
import { kurumsalRoutes } from "./groups/kurumsal";
import { mainRoutes } from "./groups/main";
import { paths } from "./paths";

import Page404 from "src/pages/error/404";
import Bildirimler from "src/pages/protected/admin/kullanici-bildirimleri/index";
import Anasayfa from "src/pages/protected/anasayfa/index";
import DosyaYonetimi from "src/pages/protected/dosya-yonetimi/index";
import Egitim from "src/pages/protected/egitim/index";
import SosyalMedya from "src/pages/protected/sosyal-medya/index";
import Takvim from "src/pages/protected/takvim/index";
import { anketRoutes } from "./groups/anket";

// ----------------------------------------------------------------------

export const router = createBrowserRouter([
  {
    element: <AppProviders />,
    children: [
      // ERROR
      errorRoutes,
      // MAIN
      mainRoutes,
      // AUTH
      authRoutes,
      // DASHBOARD
      {
        path: paths.anasayfa.root,
        element: (
          <AuthGuard>
            <DashboardLayout />
          </AuthGuard>
        ),
        children: [
          { index: true, element: <Anasayfa /> },
          { path: paths.anasayfa.bildirimler, element: <Bildirimler /> },
          { path: paths.anasayfa.sosyalMedya, element: <SosyalMedya /> },
          { path: paths.anasayfa.dosyaYonetimi, element: <DosyaYonetimi /> },
          { path: paths.anasayfa.egitim, element: <Egitim /> },
          { path: paths.anasayfa.takvim, element: <Takvim /> },
          gorevYonetimiRoutes,
          kurumsalRoutes,
          //insanKaynaklariRoutes,
          anketRoutes,
          iletisimRoutes,
          adminRoutes,
          ayarlarRoutes,
        ],
      },

      // No match
      { path: "*", element: <Page404 /> },
    ],
  },
]);
