import { paths } from "src/routes/paths";

import { CONFIG } from "src/global-config";

import { Iconify } from "src/components/iconify";
import { SvgColor } from "src/components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  job: icon("ic-job"),
  blog: icon("ic-blog"),
  chat: icon("ic-chat"),
  mail: icon("ic-mail"),
  user: icon("ic-user"),
  file: icon("ic-file"),
  lock: icon("ic-lock"),
  tour: icon("ic-tour"),
  order: icon("ic-order"),
  label: icon("ic-label"),
  blank: icon("ic-blank"),
  kanban: icon("ic-kanban"),
  folder: icon("ic-folder"),
  course: icon("ic-course"),
  banking: icon("ic-banking"),
  booking: icon("ic-booking"),
  invoice: icon("ic-invoice"),
  product: icon("ic-product"),
  calendar: icon("ic-calendar"),
  disabled: icon("ic-disabled"),
  external: icon("ic-external"),
  menuItem: icon("ic-menu-item"),
  ecommerce: icon("ic-ecommerce"),
  analytics: icon("ic-analytics"),
  dashboard: icon("ic-dashboard"),
  parameter: icon("ic-parameter"),
  settings: icon("ic-setting"),
  anket: icon("ic-anket"),
};

// ----------------------------------------------------------------------

export const navData = [
  {
    subheader: "",
    items: [
      { title: "Anasayfa", path: paths.anasayfa.root, icon: ICONS.dashboard },
      {
        title: "Kurumsal",
        path: paths.anasayfa.kurumsal.root,
        icon: ICONS.job,
        children: [
          { title: "İlanlar", path: paths.anasayfa.kurumsal.ilanlar.root },
          // {
          //   title: "Sosyal Tesisler",
          //   path: paths.anasayfa.kurumsal.tesisler.root,
          //   icon: ICONS.tour,
          // },
          // { title: "Talepler", path: paths.anasayfa.kurumsal.talep.root, icon: ICONS.order },
          { title: "Haberler", path: paths.anasayfa.kurumsal.haberler.root },
          { title: "Duyurular", path: "#" },
        ],
      },
      { title: "Sosyal Medya", path: paths.anasayfa.sosyalMedya, icon: ICONS.user },
      {
        title: "Anket",
        path: paths.anasayfa.anket.root,
        icon: ICONS.anket,
        children: [{ title: "Kullanıcı Anket Listesi", path: paths.anasayfa.anket.listeUser }],
      },
      {
        title: "Görev Yönetimi",
        path: paths.anasayfa.gorevYonetimi.projeler.root,
        icon: ICONS.kanban,
      },
      { title: "Dosya Yönetimi", path: paths.anasayfa.dosyaYonetimi, icon: ICONS.folder },
      { title: "Takvim", path: paths.anasayfa.takvim, icon: ICONS.calendar },
      // {
      //   title: "Admin Panel",
      //   path: paths.anasayfa.admin.root,
      //   icon: <Iconify icon="solar:settings-bold-duotone" />,
      //   children: [
      //     {
      //       title: "Anket",
      //       path: paths.anasayfa.admin.anket.root,
      //       children: [
      //         { title: "Anket Oluştur", path: paths.anasayfa.admin.anket.olustur },
      //         { title: "Admin Anket Listesi", path: paths.anasayfa.admin.anket.listeAdmin },
      //       ],
      //     },
      //     {
      //       title: "İnsan Kaynakları",
      //       path: paths.anasayfa.admin.insanKaynaklari.root,
      //       //icon: ICONS.product,
      //       children: [
      //         { title: "Masraflar", path: paths.anasayfa.admin.insanKaynaklari.masraflar.root },
      //         { title: "Zimmetler", path: paths.anasayfa.admin.insanKaynaklari.zimmetler.root },
      //         { title: "Personeller", path: paths.anasayfa.admin.insanKaynaklari.personeller },
      //       ],
      //     },

      //     {
      //       title: "Kullanıcı Yönetimi",
      //       path: paths.anasayfa.admin.kullaniciYonetimi.root,
      //       children: [
      //         {
      //           title: "Yetkilendirme",
      //           path: paths.anasayfa.admin.kullaniciYonetimi.yetkilendirme,
      //         },
      //         { title: "Roller", path: paths.anasayfa.admin.kullaniciYonetimi.roller },
      //       ],
      //     },
      //     {
      //       title: "İçerik Yönetimi",
      //       path: paths.anasayfa.admin.icerikYonetimi.root,
      //       children: [
      //         {
      //           title: "Sosyal Tesis Oluştur",
      //           path: paths.anasayfa.admin.icerikYonetimi.tesisOlustur,
      //         },
      //         { title: "İlan Oluştur", path: paths.anasayfa.admin.icerikYonetimi.ilanOlustur },
      //         { title: "Haber Oluştur", path: paths.anasayfa.admin.icerikYonetimi.haberOlustur },
      //       ],
      //     },
      //     {
      //       title: "Şablon Yönetimi",
      //       path: paths.anasayfa.admin.sablon.root,
      //       children: [
      //         { title: "Şablon Listesi", path: paths.anasayfa.admin.sablon.sec },
      //         { title: "Şablon Oluştur", path: paths.anasayfa.admin.sablon.olustur },
      //       ],
      //     },
      //     {
      //       title: "Raporlama",
      //       path: paths.anasayfa.admin.log,
      //       children: [{ title: "Kullanıcı Log İzleme", path: paths.anasayfa.admin.log }],
      //     },
      //     {
      //       title: "Envanter",
      //       path: paths.anasayfa.admin.zimmetOlustur,
      //       children: [{ title: "Zimmet Oluştur", path: paths.anasayfa.admin.zimmetOlustur }],
      //     },
      //   ],
      // },
      {
        title: "Ayarlar",
        path: paths.anasayfa.ayarlar.root,
        icon: ICONS.parameter,
        children: [{ title: "Profil", path: paths.anasayfa.ayarlar.profil.root }],
      },
    ],
  },
];
