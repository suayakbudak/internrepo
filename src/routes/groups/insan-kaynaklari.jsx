// import { paths } from "../paths";

// import MasrafDetay from "src/pages/protected/insan-kaynaklari/masraf-yonetimi/masraf-detayi/index";
// import MasrafDuzenle from "src/pages/protected/insan-kaynaklari/masraf-yonetimi/masraf-duzenle/index";
// import MasrafOlustur from "src/pages/protected/insan-kaynaklari/masraf-yonetimi/masraf-olustur/index";
// import MasrafListe from "src/pages/protected/insan-kaynaklari/masraf-yonetimi/masraflar/index";

// import PersonelListe from "src/pages/protected/insan-kaynaklari/personeller/index";

// import ZimmetDetay from "src/pages/protected/insan-kaynaklari/zimmetler/zimmet-detay/index";
// import ZimmetDuzenle from "src/pages/protected/insan-kaynaklari/zimmetler/zimmet-duzenle/index";
// import ZimmetOlustur from "src/pages/protected/insan-kaynaklari/zimmetler/zimmet-olustur/index";
// import ZimmetListe from "src/pages/protected/insan-kaynaklari/zimmetler/zimmetler/index";

// export const insanKaynaklariRoutes = {
//   path: paths.anasayfa.insanKaynaklari.root,
//   children: [
//     {
//       path: paths.anasayfa.insanKaynaklari.masraflar.root,
//       children: [
//         { index: true, element: <MasrafListe /> },
//         {
//           path: paths.anasayfa.insanKaynaklari.masraflar.details,
//           element: <MasrafDetay />,
//         },
//         {
//           path: paths.anasayfa.insanKaynaklari.masraflar.olustur,
//           element: <MasrafOlustur />,
//         },
//         {
//           path: paths.anasayfa.insanKaynaklari.masraflar.duzenle,
//           element: <MasrafDuzenle />,
//         },
//       ],
//     },
//     {
//       path: paths.anasayfa.insanKaynaklari.zimmetler.root,
//       children: [
//         { index: true, element: <ZimmetListe /> },
//         {
//           path: paths.anasayfa.insanKaynaklari.zimmetler.details,
//           element: <ZimmetDetay />,
//         },
//         {
//           path: paths.anasayfa.insanKaynaklari.zimmetler.olustur,
//           element: <ZimmetOlustur />,
//         },
//         {
//           path: paths.anasayfa.insanKaynaklari.zimmetler.duzenle,
//           element: <ZimmetDuzenle />,
//         },
//       ],
//     },
//     { path: paths.anasayfa.insanKaynaklari.personeller, element: <PersonelListe /> },
//   ],
// };
