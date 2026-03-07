// Anket durumları için enum
export const SURVEY_STATUS = {
  ACTIVE: "Aktif",
  PASSIVE: "Pasif",
  COMPLETED: "Tamamlandı",
  CONTINUE: "Devam Et",
  ANSWER: "Anketi Yanıtla",
};

export const _anketData = [
  {
    id: 1,
    title: "Personel Memnuniyet Anketi",
    description:
      "Kurumumuzun sağladığı hizmetlerin kalitesini değerlendirmek ve geliştirmek amacıyla hazırlanmıştır.",
    publishDate: "17 Ocak 2025 10:00",
    status: SURVEY_STATUS.ACTIVE,
    activeStatus: {
      status: SURVEY_STATUS.COMPLETED,
    },
    participationRate: 8.2,
    userParticipated: true,
    questions: [
      {
        id: 1,
        type: "coktan-secmeli",
        question: "Kurumumuza ulaşımınızı nasıl değerlendiriyorsunuz?",
        isRequired: true,
        options: ["Çok kolay", "Kolay", "Zor", "Çok zor"],
        helperText: "Zorunlu alanları yanıtlamanız gerekmektedir.",
      },
      {
        id: 2,
        type: "coktan-secmeli",
        question: "Çalışma ortamımızı genel olarak nasıl değerlendirirsiniz?",
        isRequired: false,
        options: ["Çok memnunum", "Memnunum", "Kararsızım", "Memnun değilim"],
        helperText: "Zorunlu alanları yanıtlamanız gerekmektedir.",
      },
      {
        id: 3,
        type: "acik-uclu",
        question: "Çalışma ortamımızın verimliliğini artırmak için neler yapılabilir?",
        isRequired: false,
        placeholder: "Değerlendirmenizi yazınız...",
      },
      {
        id: 4,
        type: "puan-olcegi",
        question:
          "Çalıştığınız birimde iş arkadaşlarınızla etkili bir iletişim kurabildiğinizi düşünüyor musunuz?",
        isRequired: false,
        scale: {
          min: 1,
          max: 5,
          labels: {
            start: "Katılmıyorum",
            end: "Katılıyorum",
          },
        },
      },
    ],
  },
  {
    id: 2,
    title: "Teknoloji Kullanımı Anketi",
    description:
      "Kurum içi dijital araçların etkinliğinin değerlendirilmesi ve geliştirilmesi amacıyla hazırlanmıştır.",
    publishDate: "16 Ocak 2025 10:00",
    status: SURVEY_STATUS.ACTIVE,
    activeStatus: {
      status: SURVEY_STATUS.ANSWER,
    },
    participationRate: 8.1,
    userParticipated: false,

    questions: [
      {
        id: 1,
        type: "coktan-secmeli",
        question: "Kurumumuza ulaşımınızı nasıl değerlendiriyorsunuz?",
        isRequired: true,
        options: ["Çok kolay", "Kolay", "Zor", "Çok zor"],
        helperText: "Zorunlu alanları yanıtlamanız gerekmektedir.",
      },
      {
        id: 2,
        type: "coktan-secmeli",
        question: "Çalışma ortamımızı genel olarak nasıl değerlendirirsiniz?",
        isRequired: false,
        options: ["Çok memnunum", "Memnunum", "Kararsızım", "Memnun değilim"],
        helperText: "Zorunlu alanları yanıtlamanız gerekmektedir.",
      },
      {
        id: 3,
        type: "acik-uclu",
        question: "Çalışma ortamımızın verimliliğini artırmak için neler yapılabilir?",
        isRequired: false,
        placeholder: "Değerlendirmenizi yazınız...",
      },
      {
        id: 4,
        type: "puan-olcegi",
        question:
          "Çalıştığınız birimde iş arkadaşlarınızla etkili bir iletişim kurabildiğinizi düşünüyor musunuz?",
        isRequired: false,
        scale: {
          min: 1,
          max: 5,
          labels: {
            start: "Katılmıyorum",
            end: "Katılıyorum",
          },
        },
      },
    ],
  },
  {
    id: 3,
    title: "Eğitim İhtiyaçları Anketi",
    description: "Gelişim alanlarımızı belirlemek amacıyla hazırlanmıştır.",
    publishDate: "03 Ocak 2025 12:00",
    status: SURVEY_STATUS.PASSIVE,

    participationRate: 7.9,
    userParticipated: true,

    questions: [
      {
        id: 1,
        type: "coktan-secmeli",
        question: "Kurumumuza ulaşımınızı nasıl değerlendiriyorsunuz?",
        isRequired: true,
        options: ["Çok kolay", "Kolay", "Zor", "Çok zor"],
        helperText: "Zorunlu alanları yanıtlamanız gerekmektedir.",
      },
      {
        id: 2,
        type: "coktan-secmeli",
        question: "Çalışma ortamımızı genel olarak nasıl değerlendirirsiniz?",
        isRequired: false,
        options: ["Çok memnunum", "Memnunum", "Kararsızım", "Memnun değilim"],
        helperText: "Zorunlu alanları yanıtlamanız gerekmektedir.",
      },
      {
        id: 3,
        type: "acik-uclu",
        question: "Çalışma ortamımızın verimliliğini artırmak için neler yapılabilir?",
        isRequired: false,
        placeholder: "Değerlendirmenizi yazınız...",
      },
      {
        id: 4,
        type: "puan-olcegi",
        question:
          "Çalıştığınız birimde iş arkadaşlarınızla etkili bir iletişim kurabildiğinizi düşünüyor musunuz?",
        isRequired: false,
        scale: {
          min: 1,
          max: 5,
          labels: {
            start: "Katılmıyorum",
            end: "Katılıyorum",
          },
        },
      },
    ],
  },
  {
    id: 4,
    title: "Performans Geri Bildirim Anketi",
    description: "İş süreçlerinin değerlendirilmek amacıyla hazırlanmıştır.",
    publishDate: "23 Kasım 2025 11:00",
    status: SURVEY_STATUS.ACTIVE,
    activeStatus: {
      status: SURVEY_STATUS.CONTINUE,
    },
    participationRate: 6.5,
    userParticipated: false,

    questions: [
      {
        id: 1,
        type: "coktan-secmeli",
        question: "Kurumumuza ulaşımınızı nasıl değerlendiriyorsunuz?",
        isRequired: true,
        options: ["Çok kolay", "Kolay", "Zor", "Çok zor"],
        helperText: "Zorunlu alanları yanıtlamanız gerekmektedir.",
      },
      {
        id: 2,
        type: "coktan-secmeli",
        question: "Çalışma ortamımızı genel olarak nasıl değerlendirirsiniz?",
        isRequired: false,
        options: ["Çok memnunum", "Memnunum", "Kararsızım", "Memnun değilim"],
        helperText: "Zorunlu alanları yanıtlamanız gerekmektedir.",
      },
      {
        id: 3,
        type: "acik-uclu",
        question: "Çalışma ortamımızın verimliliğini artırmak için neler yapılabilir?",
        isRequired: false,
        placeholder: "Değerlendirmenizi yazınız...",
      },
      {
        id: 4,
        type: "puan-olcegi",
        question:
          "Çalıştığınız birimde iş arkadaşlarınızla etkili bir iletişim kurabildiğinizi düşünüyor musunuz?",
        isRequired: false,
        scale: {
          min: 1,
          max: 5,
          labels: {
            start: "Katılmıyorum",
            end: "Katılıyorum",
          },
        },
      },
    ],
  },
];

export const _anketGoruntule = {
  title: "Personel Memnuniyeti Anketi",
  description:
    "Hizmet Kalitemizi Artırmak İçin Geri Bildirimlerinize İhtiyacımız Var!Bu anket, kurumumuzun sağladığı hizmetlerin kalitesini değerlendirmek ve geliştirmek amacıyla hazırlanmıştır. Ankete katılımınız için teşekkür ederiz. Ankete verdiğiniz yanıtlar tamamen gizli tutulacaktır...",

  questions: [
    {
      id: 1,
      type: "coktan-secmeli",
      question: "Kurumumuza ulaşımınızı nasıl değerlendiriyorsunuz?",
      isRequired: true,
      options: ["Çok kolay", "Kolay", "Zor", "Çok zor"],
      helperText: "Zorunlu alanları yanıtlamanız gerekmektedir.",
    },
    {
      id: 2,
      type: "coktan-secmeli",
      question: "Çalışma ortamımızı genel olarak nasıl değerlendirirsiniz?",
      isRequired: false,
      options: ["Çok memnunum", "Memnunum", "Kararsızım", "Memnun değilim"],
      helperText: "Zorunlu alanları yanıtlamanız gerekmektedir.",
    },
    {
      id: 3,
      type: "acik-uclu",
      question: "Çalışma ortamımızın verimliliğini artırmak için neler yapılabilir?",
      isRequired: false,
      placeholder: "Değerlendirmenizi yazınız...",
    },
    {
      id: 4,
      type: "puan-olcegi",
      question:
        "Çalıştığınız birimde iş arkadaşlarınızla etkili bir iletişim kurabildiğinizi düşünüyor musunuz?",
      isRequired: false,
      scale: {
        min: 1,
        max: 5,
        labels: {
          start: "Katılmıyorum",
          end: "Katılıyorum",
        },
      },
    },
  ],
};
