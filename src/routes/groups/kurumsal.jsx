import { paths } from "../paths";

import IlanDetay from "src/pages/protected/kurumsal/ilanlar/detay/index";
import IlanDuzenle from "src/pages/protected/kurumsal/ilanlar/duzenle/index";
import IlanListe from "src/pages/protected/kurumsal/ilanlar/liste/index";
import IlanOlustur from "src/pages/protected/kurumsal/ilanlar/yeni/index";

import TesisDetay from "src/pages/protected/kurumsal/tesisler/detay/index";
import TesisDuzenle from "src/pages/protected/kurumsal/tesisler/duzenle/index";
import TesisListe from "src/pages/protected/kurumsal/tesisler/liste/index";
import TesisOlustur from "src/pages/protected/kurumsal/tesisler/yeni/index";

import TalepDetay from "src/pages/protected/kurumsal/talep/detay/index";
import TalepListe from "src/pages/protected/kurumsal/talep/liste/index";

import HaberDetay from "src/pages/protected/kurumsal/haberler/detay/index";
import HaberDuzenle from "src/pages/protected/kurumsal/haberler/duzenle/index";
import HaberListe from "src/pages/protected/kurumsal/haberler/liste/index";
import HaberOlustur from "src/pages/protected/kurumsal/haberler/yeni/index";

export const kurumsalRoutes = {
  path: "/anasayfa/kurumsal",
  children: [
    {
      path: "/anasayfa/kurumsal/ilanlar",
      children: [
        { index: true, element: <IlanListe /> },
        { path: paths.anasayfa.kurumsal.ilanlar.details, element: <IlanDetay /> },
        { path: paths.anasayfa.kurumsal.ilanlar.olustur, element: <IlanOlustur /> },
        { path: paths.anasayfa.kurumsal.ilanlar.duzenle, element: <IlanDuzenle /> },
      ],
    },
    {
      path: paths.anasayfa.kurumsal.tesisler.root,
      children: [
        { index: true, element: <TesisListe /> },
        { path: paths.anasayfa.kurumsal.tesisler.details, element: <TesisDetay /> },
        { path: paths.anasayfa.kurumsal.tesisler.olustur, element: <TesisOlustur /> },
        { path: paths.anasayfa.kurumsal.tesisler.duzenle, element: <TesisDuzenle /> },
      ],
    },
    {
      path: paths.anasayfa.kurumsal.talep.root,
      children: [
        { index: true, element: <TalepListe /> },
        { path: paths.anasayfa.kurumsal.talep.details, element: <TalepDetay /> },
      ],
    },
    {
      path: paths.anasayfa.kurumsal.haberler.root,
      children: [
        { index: true, element: <HaberListe /> },
        { path: paths.anasayfa.kurumsal.haberler.details, element: <HaberDetay /> },
        { path: paths.anasayfa.kurumsal.haberler.olustur, element: <HaberOlustur /> },
        { path: paths.anasayfa.kurumsal.haberler.duzenle, element: <HaberDuzenle /> },
      ],
    },
  ],
};
