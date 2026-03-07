import axios from "axios";

import { CONFIG } from "src/global-config";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: CONFIG.serverUrl });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || "Something went wrong!")
);

const axiosAuth = axios.create({ baseURL: "https://servicekamu.pviser.com" });

axiosAuth.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || "Something went wrong!")
);

// ----------------------------------------------------------------------

export { axiosAuth };
export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];
  
  try {
    const res = await axiosAuth.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    
    // DEMO MODE: Mock data for different endpoints
    if (url.includes("/api/post/list")) {
      console.log("🎯 DEMO MODE: Mock haberler yükleniyor...");
      return {
        posts: [
          {
            id: "1",
            title: "Yeni Yazılım Teknolojileri Semineri",
            description: "Şirketimizde düzenlenecek olan yazılım teknolojileri semineri hakkında bilgilendirme.",
            content: "Gelişen teknolojiler ve yazılım dünyasındaki yenilikler hakkında kapsamlı bir seminer düzenlenecektir. Tüm çalışanlarımızı bekliyoruz.",
            coverUrl: "https://api-dev-minimal-v620.pages.dev/assets/images/cover/cover-1.webp",
            totalViews: 1532,
            totalComments: 12,
            totalShares: 5,
            totalFavorites: 8,
            createdAt: "2024-02-10T10:00:00Z",
            author: {
              name: "Demo User",
              avatarUrl: "https://api-dev-minimal-v620.pages.dev/assets/images/avatar/avatar-1.webp",
            },
            publish: "published",
          },
          {
            id: "2",
            title: "Kurumsal İletişim Politikalarımız Güncellendi",
            description: "Yeni kurumsal iletişim politikaları hakkında detaylı bilgi.",
            content: "Şirket içi iletişimi güçlendirmek ve verimliliği artırmak amacıyla kurumsal iletişim politikalarımız güncellendi.",
            coverUrl: "https://api-dev-minimal-v620.pages.dev/assets/images/cover/cover-2.webp",
            totalViews: 2145,
            totalComments: 18,
            totalShares: 12,
            totalFavorites: 15,
            createdAt: "2024-02-11T14:30:00Z",
            author: {
              name: "İK Departmanı",
              avatarUrl: "https://api-dev-minimal-v620.pages.dev/assets/images/avatar/avatar-2.webp",
            },
            publish: "published",
          },
          {
            id: "3",
            title: "Sosyal Tesis Rezervasyon Sistemi Aktif",
            description: "Yeni sosyal tesis rezervasyon sistemimiz hizmete girdi.",
            content: "Çalışanlarımızın sosyal tesislerimizden daha kolay faydalanabilmesi için online rezervasyon sistemi devreye alındı.",
            coverUrl: "https://api-dev-minimal-v620.pages.dev/assets/images/cover/cover-3.webp",
            totalViews: 3421,
            totalComments: 28,
            totalShares: 22,
            totalFavorites: 35,
            createdAt: "2024-02-12T09:15:00Z",
            author: {
              name: "Sosyal Tesisler",
              avatarUrl: "https://api-dev-minimal-v620.pages.dev/assets/images/avatar/avatar-3.webp",
            },
            publish: "published",
          },
          {
            id: "4",
            title: "Yeni Çalışan Oryantasyon Programı",
            description: "Yeni katılan çalışanlarımız için hazırlanan oryantasyon programı başlıyor.",
            content: "Yeni çalışanlarımızın şirkete daha hızlı adapte olabilmeleri için kapsamlı bir oryantasyon programı hazırlandı.",
            coverUrl: "https://api-dev-minimal-v620.pages.dev/assets/images/cover/cover-4.webp",
            totalViews: 1876,
            totalComments: 15,
            totalShares: 8,
            totalFavorites: 12,
            createdAt: "2024-02-13T11:00:00Z",
            author: {
              name: "İK Departmanı",
              avatarUrl: "https://api-dev-minimal-v620.pages.dev/assets/images/avatar/avatar-4.webp",
            },
            publish: "draft",
          },
        ],
      };
    }
    
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    tokenRefresh: "/auth/token-refresh",
    me: "/users/me",
    signIn: "/auth/login",
    signUp: "/auth/register",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    verifyCode: "/auth/verify-code",
  },
  mail: { list: "/api/mail/list", details: "/api/mail/details", labels: "/api/mail/labels" },
  post: {
    list: "/api/post/list",
    details: "/api/post/details",
    latest: "/api/post/latest",
    search: "/api/post/search",
  },
  product: {
    list: "/api/product/list",
    details: "/api/product/details",
    search: "/api/product/search",
  },
  chat: "/api/chat",
  kanban: "/api/kanban",
  calendar: "/api/calendar",

  ilan: {
    categories: "/categories",
    categoryFeatures: "/categories/{id}/features",
    createAdFeature: "/ad-features/create",
    getAdFeatures: "/ad-features/{advertId}",
    createAdvert: "/advert",
    listAdverts: "/advert/list",
    addImages: "/ad-images",
    all: "/advert/all",
    getImages: "/ad-images",
    getAdvertDetails: "/advert/{advertId}",
  },
  projects: {
    root: "/projects",
    id: "/projects/:id",
    backlog: "/projects/:id/backlog",
    addAssigners: "/projects/:id/add-assigners",
    removeAssigners: "/projects/:id/remove-assigners",
  },

  surveys: {
    root: "/surveys",
    id: "/surveys/:id",
    create: "/surveys",
    questions: {
      root: "/surveys/:id/questions",
      id: "/surveys/:id/questions/:question_id",
    },
    responses: {
      root: "/surveys/:id/responses",
      id: "/surveys/:id/responses/:response_id",
    },
  },
  boards: {
    root: "/boards",
    id: "/boards/:id",
    columns: {
      root: "/boards/:id/columns",
      id: "/boards/:id/columns/:id",
    },
    tasks: {
      root: "/boards/:id/tasks",
      id: "/boards/:id/tasks/:taskId",
    },
  },
  tasks: {
    root: "/tasks",
    id: "/tasks/:id",
    addAttachments: "/tasks/:id/add-attachments",
    removeAttachments: "/tasks/:id/remove-attachments",
    addAssigners: "/tasks/:id/add-assigners",
    removeAssigners: "/tasks/:id/remove-assigners",
    comments: {
      root: "/tasks/:id/comments",
      id: "/tasks/:id/comments/:commentId",
    },
  },
  notification: {
    root: "/notification",
    create: "/notification",
    list: "/notification",
    updateStatus: "/notification/update-status",
    delete: "/notification",
  },
  notificationTypes: {
    root: "/notification-types",
    id: "/notification-types/:id",
  },
  notificationTriggerTypes: {
    root: "/notification-trigger-types",
    id: "/notification-trigger-types/:id",
  },
  users: {
    userDetails: "/users/{id}",
  },

};
