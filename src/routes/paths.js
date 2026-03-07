// ----------------------------------------------------------------------

export const paths = {
  root: "/",
  hakkimizda: "/hakkimizda",
  bizeUlasin: "/bize-ulasin",
  error: {
    500: "/error/500",
    404: "/error/404",
    403: "/error/403",
    yetki: "/error/yetki",
  },
  zimmetler: {
    root: "/zimmetler",
    details: "/zimmetler/:id",
    liste: "/zimmetler/liste",
  },
  haberler: {
    root: "/haberler",
    details: "/haberler/:title",
    liste: "/haberler/liste",
  },
  auth: {
    root: "/auth",
    giris: "/auth/giris",
    kayit: "/auth/kayit",
    sifremiUnuttum: "/auth/sifremi-unuttum",
    sifreDegistir: "/auth/sifre-degistir",
  },
  anasayfa: {
    root: "/anasayfa",
    eticaret: "/anasayfa/e-ticaret",
    analiz: "/anasayfa/analiz",
    banka: "/anasayfa/banka",
    rezervasyon: "/anasayfa/rezervasyon",
    dosya: "/anasayfa/dosya",
    egitim: "/anasayfa/egitim",
    dosyaYonetimi: "/anasayfa/dosya-yonetimi",
    takvim: "/anasayfa/takvim",
    params: "/anasayfa/params",
    blank: "/anasayfa/blank",
    sosyalMedya: "/anasayfa/sosyal-medya",
    bildirimler: "/anasayfa/bildirimler",
    anket: {
      root: "/anasayfa/anket",
      listeUser: "/anasayfa/anket/liste/user",
      goruntule: "/anasayfa/anket/goruntule/:id",
    },

    gorevYonetimi: {
      root: "/anasayfa/gorev-yonetimi",
      projeler: {
        root: "/anasayfa/gorev-yonetimi/projeler",
        detay: "/anasayfa/gorev-yonetimi/projeler/:id",
        kanban: "/anasayfa/gorev-yonetimi/projeler/:id1/kanban/:id2",
      },
      kapsam: "/anasayfa/gorev-yonetimi/kapsam",
      kanban: "/anasayfa/gorev-yonetimi/kanban",
    },

    ayarlar: {
      root: "/anasayfa/ayarlar",
      profil: {
        root: "/anasayfa/ayarlar/profil",
        fatura: "/anasayfa/ayarlar/profil/fatura",
        bildirimler: "/anasayfa/ayarlar/profil/bildirimler",
        sosyalMedya: "/anasayfa/ayarlar/profil/sosyal-medya",
        sifreDegistir: "/anasayfa/ayarlar/profil/sifre-degistir",
      },
    },

    kurumsal: {
      root: "/anasayfa/kurumsal",
      talep: {
        root: "/anasayfa/kurumsal/talep",
        liste: "/anasayfa/kurumsal/talep/liste",
        details: "/anasayfa/kurumsal/talep/:id",
      },
      haberler: {
        root: "/anasayfa/kurumsal/haberler",
        liste: "/anasayfa/kurumsal/haberler/liste",
        olustur: "/anasayfa/kurumsal/haberler/olustur",
        details: "/anasayfa/kurumsal/haberler/:title",
        duzenle: "/anasayfa/kurumsal/haberler/:title/duzenle",
      },
      ilanlar: {
        root: "/anasayfa/kurumsal/ilanlar",
        liste: "/anasayfa/kurumsal/ilanlar/liste",
        olustur: "/anasayfa/kurumsal/ilanlar/olustur",
        details: "/anasayfa/kurumsal/ilanlar/:id",
        duzenle: "/anasayfa/kurumsal/ilanlar/:id/duzenle",
      },
      tesisler: {
        root: "/anasayfa/kurumsal/tesisler",
        liste: "/anasayfa/kurumsal/tesisler/liste",
        details: "/anasayfa/kurumsal/tesisler/:id",
        duzenle: "/anasayfa/kurumsal/tesisler/:id/duzenle",
        olustur: "/anasayfa/kurumsal/tesisler/olustur",
      },
    },

    iletisim: {
      root: "/anasayfa/iletisim",
      mail: "/anasayfa/iletisim/mail",
      sohbet: "/anasayfa/iletisim/sohbet",
    },

    admin: {
      root: "/anasayfa/admin",
      kullaniciYonetimi: {
        root: "/anasayfa/admin/kullanici-yonetimi",
        yetkilendirme: "/anasayfa/admin/kullanici-yonetimi/yetkilendirme",
        roller: "/anasayfa/admin/kullanici-yonetimi/roller",
        rolOlustur: "/anasayfa/admin/kullanici-yonetimi/rol-olustur",
      },
      anket: {
        root: "/anasayfa/admin/anket",
        listeAdmin: "/anasayfa/admin/anket/liste/admin",
        listeUser: "/anasayfa/admin/anket/liste/user",
        olustur: "/anasayfa/admin/anket/olustur",
        duzenle: "/anasayfa/admin/anket/:id/duzenle",
        details: "/anasayfa/admin/anket/:id",
        sonuc: "/anasayfa/admin/anket/:id/sonuc",
      },
      insanKaynaklari: {
        root: "/anasayfa/admin/insan-kaynaklari",
        zimmetler: {
          root: "/anasayfa/admin/insan-kaynaklari/zimmetler",
          liste: "/anasayfa/admin/insan-kaynaklari/zimmetler/liste",
          details: "/anasayfa/admin/insan-kaynaklari/zimmetler/:id",
          olustur: "/anasayfa/admin/insan-kaynaklari/zimmetler/olustur",
          duzenle: "/anasayfa/admin/insan-kaynaklari/zimmetler/:id/duzenle",
        },
        masraflar: {
          root: "/anasayfa/admin/insan-kaynaklari/masraflar",
          details: "/anasayfa/admin/insan-kaynaklari/masraflar/:id",
          duzenle: "/anasayfa/admin/insan-kaynaklari/masraflar/:id/duzenle",
          olustur: "/anasayfa/admin/insan-kaynaklari/masraflar/olustur",
          liste: "/anasayfa/admin/insan-kaynaklari/masraflar/liste",
        },
        personeller: "/anasayfa/admin/insan-kaynaklari/personeller",
      },
      icerikYonetimi: {
        root: "/anasayfa/admin/icerik-yonetimi",
        tesisOlustur: "/anasayfa/admin/icerik-yonetimi/tesis-olustur",
        ilanOlustur: "/anasayfa/admin/icerik-yonetimi/ilan-olustur",
        haberOlustur: "/anasayfa/admin/icerik-yonetimi/haber-olustur",
      },
      sablon: {
        root: "/anasayfa/admin/sablon",
        sec: "/anasayfa/admin/sablon/sec",
        olustur: "/anasayfa/admin/sablon/olustur",
      },

      log: "/anasayfa/admin/kullanici-log-izleme",
      zimmetOlustur: "/anasayfa/admin/zimmet-olustur",
    },
  },
};
