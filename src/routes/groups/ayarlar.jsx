import { paths } from "../paths";

import ProfilLayout from "src/pages/protected/ayarlar/profil/account-layout";
import ProfilBildirimler from "src/pages/protected/ayarlar/profil/bildirimler/index";
import ProfilFatura from "src/pages/protected/ayarlar/profil/fatura/index";
import ProfilGenel from "src/pages/protected/ayarlar/profil/genel/index";
import ProfilSifreDegistir from "src/pages/protected/ayarlar/profil/guvenlik/index";
import ProfilSosyalMedya from "src/pages/protected/ayarlar/profil/sosyal-baglantilar/index";

export const ayarlarRoutes = {
  path: paths.anasayfa.ayarlar.root,
  element: <ProfilLayout />,
  children: [
    { index: true, element: <ProfilGenel /> },
    { path: paths.anasayfa.ayarlar.profil.root, element: <ProfilGenel /> },
    { path: paths.anasayfa.ayarlar.profil.fatura, element: <ProfilFatura /> },
    { path: paths.anasayfa.ayarlar.profil.bildirimler, element: <ProfilBildirimler /> },
    { path: paths.anasayfa.ayarlar.profil.sosyalMedya, element: <ProfilSosyalMedya /> },
    {
      path: paths.anasayfa.ayarlar.profil.sifreDegistir,
      element: <ProfilSifreDegistir />,
    },
  ],
};
