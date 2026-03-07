import { paths } from "../paths";

import AdminAnketListe from "src/pages/protected/admin/anket/liste";
//import UserAnketListe from "src/pages/protected/admin/anket/liste/user";
import AnketSonuc from "src/pages/protected/admin/anket/sonuc/index";
import LogIzleme from "src/pages/protected/admin/kullanici-log-izleme/index";
import RolOlustur from "src/pages/protected/admin/kullanici-yonetimi/rol-olustur/index";
import Roller from "src/pages/protected/admin/kullanici-yonetimi/roller/index";
import Yetkilendirme from "src/pages/protected/admin/kullanici-yonetimi/yetkilendirme/index";
import SablonOlustur from "src/pages/protected/admin/sablon-yonetimi/olustur/index";
import SablonSec from "src/pages/protected/admin/sablon-yonetimi/sec/index";

import ZimmetOlustur from "src/pages/protected/insan-kaynaklari/zimmetler/zimmet-olustur/index";
import HaberOlustur from "src/pages/protected/kurumsal/haberler/yeni";
import IlanOlustur from "src/pages/protected/kurumsal/ilanlar/yeni";
import TesisOlustur from "src/pages/protected/kurumsal/tesisler/yeni";
import AnketOlustur from "../../pages/protected/admin/anket/yeni/view";

import MasrafDetay from "src/pages/protected/insan-kaynaklari/masraf-yonetimi/masraf-detayi/index";
import MasrafDuzenle from "src/pages/protected/insan-kaynaklari/masraf-yonetimi/masraf-duzenle/index";
import MasrafOlustur from "src/pages/protected/insan-kaynaklari/masraf-yonetimi/masraf-olustur/index";
import MasrafListe from "src/pages/protected/insan-kaynaklari/masraf-yonetimi/masraflar/index";

import PersonelListe from "src/pages/protected/insan-kaynaklari/personeller/index";
import ZimmetDetay from "src/pages/protected/insan-kaynaklari/zimmetler/zimmet-detay/index";
import ZimmetDuzenle from "src/pages/protected/insan-kaynaklari/zimmetler/zimmet-duzenle/index";
import ZimmetListe from "src/pages/protected/insan-kaynaklari/zimmetler/zimmetler/index";

export const adminRoutes = {
  path: paths.anasayfa.admin.root,
  children: [
    {
      path: paths.anasayfa.admin.anket.root,
      children: [
        { path: paths.anasayfa.admin.anket.sonuc, element: <AnketSonuc /> },
        { path: paths.anasayfa.admin.anket.olustur, element: <AnketOlustur /> },
        { path: paths.anasayfa.admin.anket.listeAdmin, element: <AdminAnketListe /> },
        //{ path: paths.anasayfa.admin.anket.listeUser, element: <UserAnketListe /> },
      ],
    },
    {
      path: paths.anasayfa.admin.insanKaynaklari.masraflar.root,
      children: [
        { index: true, element: <MasrafListe /> },
        {
          path: paths.anasayfa.admin.insanKaynaklari.masraflar.details,
          element: <MasrafDetay />,
        },
        {
          path: paths.anasayfa.admin.insanKaynaklari.masraflar.olustur,
          element: <MasrafOlustur />,
        },
        {
          path: paths.anasayfa.admin.insanKaynaklari.masraflar.duzenle,
          element: <MasrafDuzenle />,
        },
      ],
    },
    {
      path: paths.anasayfa.admin.insanKaynaklari.zimmetler.root,
      children: [
        { index: true, element: <ZimmetListe /> },
        {
          path: paths.anasayfa.admin.insanKaynaklari.zimmetler.details,
          element: <ZimmetDetay />,
        },
        {
          path: paths.anasayfa.admin.insanKaynaklari.zimmetler.olustur,
          element: <ZimmetOlustur />,
        },
        {
          path: paths.anasayfa.admin.insanKaynaklari.zimmetler.duzenle,
          element: <ZimmetDuzenle />,
        },
      ],
    },
    { path: paths.anasayfa.admin.insanKaynaklari.personeller, element: <PersonelListe /> },

    {
      path: paths.anasayfa.admin.kullaniciYonetimi.root,
      children: [
        { path: paths.anasayfa.admin.kullaniciYonetimi.roller, element: <Roller /> },
        {
          path: paths.anasayfa.admin.kullaniciYonetimi.rolOlustur,
          element: <RolOlustur />,
        },
        {
          path: paths.anasayfa.admin.kullaniciYonetimi.yetkilendirme,
          element: <Yetkilendirme />,
        },
      ],
    },
    {
      path: paths.anasayfa.admin.icerikYonetimi.root,
      children: [
        {
          path: paths.anasayfa.admin.icerikYonetimi.tesisOlustur,
          element: <TesisOlustur />,
        },
        {
          path: paths.anasayfa.admin.icerikYonetimi.ilanOlustur,
          element: <IlanOlustur />,
        },
        {
          path: paths.anasayfa.admin.icerikYonetimi.haberOlustur,
          element: <HaberOlustur />,
        },
      ],
    },
    {
      path: paths.anasayfa.admin.sablon.root,
      children: [
        { path: paths.anasayfa.admin.sablon.sec, element: <SablonSec /> },
        { path: paths.anasayfa.admin.sablon.olustur, element: <SablonOlustur /> },
      ],
    },
    { path: paths.anasayfa.admin.zimmetOlustur, element: <ZimmetOlustur /> },
    { path: paths.anasayfa.admin.log, element: <LogIzleme /> },
  ],
};
