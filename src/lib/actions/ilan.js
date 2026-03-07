import { endpoints, axiosAuth } from "../axios";

import { getAdvertImages } from "./images";
import { _jobs, ADVERTISEMENT_CATEGORY_OPTIONS } from "src/_mock";

export const getCategories = async () => {
  try {
    const response = await axiosAuth.get(endpoints.ilan.categories);
    return response.data;
  } catch (error) {
    console.error("Error details:", error);
    // DEMO MODE: Mock kategoriler (gerçek kategorileriniz)
    console.log("🎯 DEMO MODE: Mock kategoriler yükleniyor...");
    return ADVERTISEMENT_CATEGORY_OPTIONS.map((cat, index) => ({
      id: index + 1,
      name: cat.label,
      description: cat.label,
    }));
  }
};

export const getCategoryFeatures = async (categoryId) => {
  try {
    const response = await axiosAuth.get(
      endpoints.ilan.categoryFeatures.replace("{id}", categoryId)
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching category features:", error);
    throw error;
  }
};

export const createAdvert = async (advertData) => {
  try {
    const response = await axiosAuth.post(endpoints.ilan.createAdvert, advertData);
    return response.data;
  } catch (error) {
    console.error("Error creating advert:", error);
    throw error;
  }
};

export const addAdvertFeatures = async (features) => {
  try {
    const response = await axiosAuth.post(endpoints.ilan.createAdFeature, features);
    return response.data;
  } catch (error) {
    console.error("Error creating ad features:", error);
    throw error;
  }
};

export const getAdverts = async (
  params = {
    page: 1,
    sortBy: "created_at",
    sortOrder: "DESC",
  }
) => {
  try {
    const response = await axiosAuth.post(endpoints.ilan.listAdverts, params);
    return response.data;
  } catch (error) {
    console.error("Error fetching adverts:", error);
    throw error;
  }
};

export const getAllAdverts = async (
  params = {
    page: 1,
    sortBy: "created_at",
    sortOrder: "DESC",
  }
) => {
  try {
    const queryParams = new URLSearchParams({
      page: params.page.toString(),
      sortBy: params.sortBy,
      sortOrder: params.sortOrder,
      ...(params.categoryId && { categoryId: params.categoryId }),
    }).toString();

    const response = await axiosAuth.get(`${endpoints.ilan.all}?${queryParams}`);

    const adverts = response.data;
    const advertsWithImages = await Promise.all(
      adverts.map(async (advert) => {
        try {
          const images = await getAdvertImages(advert.id);
          return {
            ...advert,
            images: images || [],
          };
        } catch (error) {
          console.error(`Error fetching images for advert ${advert.id}:`, error);
          return {
            ...advert,
            images: [],
          };
        }
      })
    );

    return {
      data: advertsWithImages,
    };
  } catch (error) {
    console.error("Error fetching all adverts:", error);
    
    // DEMO MODE: Mock ilanlar (gerçek mock data setiniz)
    console.log("🎯 DEMO MODE: Mock ilanlar yükleniyor (_jobs)...");
    
    // Kategorileri al
    const mockCategories = ADVERTISEMENT_CATEGORY_OPTIONS.map((cat, index) => ({
      id: index + 1,
      name: cat.label,
    }));
    
    // _jobs verilerini API formatına dönüştür
    let mockAdverts = _jobs.slice(0, 24).map((job, index) => {
      // Her ilana rastgele bir kategori ata
      const categoryIndex = index % mockCategories.length;
      const category = mockCategories[categoryIndex];
      
      return {
        id: job.id,
        title: job.title,
        description: job.content.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
        price: job.salary.price,
        category: category,
        features: job.features.map(f => ({
          name: f.featureName,
          value: f.featureValue,
        })),
        adImages: job.images || [],
        userId: "demo-user-123",
        created_at: job.createdAt,
      };
    });

    // Kategori filtreleme
    if (params.categoryId) {
      console.log("🔍 Kategori filtresi uygulanıyor: ID =", params.categoryId);
      mockAdverts = mockAdverts.filter(advert => advert.category.id === params.categoryId);
      console.log(`   → ${mockAdverts.length} ilan bulundu`);
    }

    // Sıralama
    mockAdverts.sort((a, b) => {
      if (params.sortBy === "price") {
        // Fiyata göre sıralama
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);
        return params.sortOrder === "ASC" ? priceA - priceB : priceB - priceA;
      } else if (params.sortBy === "created_at") {
        // Tarihe göre sıralama
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return params.sortOrder === "ASC" ? dateA - dateB : dateB - dateA;
      }
      return 0;
    });

    console.log(`✅ Sıralama: ${params.sortBy} - ${params.sortOrder}`);
    console.log(`✅ ${mockAdverts.length} ilan listeleniyor`);

    return {
      data: mockAdverts.map(advert => ({
        ...advert,
        price: advert.price.toString(),
      })),
    };
  }
};

export const addAdvertImage = async (imageData) => {
  try {
    const response = await axiosAuth.post(endpoints.ilan.addImages, imageData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
      transformRequest: [(data) => data],
    });

    return response.data;
  } catch (error) {
    console.error("Resim Yükleme Hatası:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    throw error;
  }
};

export const getAdvertFeatures = async (advertId) => {
  try {
    const response = await axiosAuth.get(
      endpoints.ilan.getAdFeatures.replace("{advertId}", advertId)
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching ad features:", error);
    throw error;
  }
};

export const getUserDetails = async (userId) => {
  try {
    const response = await axiosAuth.get(endpoints.users.userDetails.replace('{id}', userId));
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

export const getAdvertDetails = async (advertId) => {
  try {
    const response = await axiosAuth.get(endpoints.ilan.getAdvertDetails.replace('{advertId}', advertId));
    const advert = response.data;
    
    if (advert.userId) {
      try {
        const userDetails = await getUserDetails(advert.userId);
        advert.user = userDetails;
      } catch (error) {
        console.error("Error fetching user details:", error);
        advert.user = null;
      }
    }
    
    return advert;
  } catch (error) {
    console.error("Error fetching advert details:", error);
    
    // DEMO MODE: Mock ilan detayı
    console.log("🎯 DEMO MODE: Mock ilan detayı yükleniyor...", advertId);
    
    // _jobs'dan ilanı bul
    const job = _jobs.find(j => j.id === advertId);
    
    if (!job) {
      console.error("İlan bulunamadı:", advertId);
      throw new Error("İlan bulunamadı");
    }
    
    // Mock kategori ata
    const categoryIndex = parseInt(advertId.split('-')[1] || 0) % ADVERTISEMENT_CATEGORY_OPTIONS.length;
    const category = {
      id: categoryIndex + 1,
      name: ADVERTISEMENT_CATEGORY_OPTIONS[categoryIndex].label,
    };
    
    // Mock ilan detayını oluştur
    const mockAdvert = {
      id: job.id,
      title: job.title,
      description: job.content, // HTML içerik
      price: job.salary.price.toString(),
      category: category,
      features: job.features,
      adImages: job.images || [],
      userId: "demo-user-123",
      created_at: job.createdAt,
      user: {
        id: "demo-user-123",
        firstName: "Demo",
        lastName: "User",
        email: "demo@minimals.cc",
        phoneNumber: "+90 555 123 4567",
        profilePhoto: null,
      }
    };
    
    console.log("✅ Mock ilan detayı hazır:", mockAdvert.title);
    return mockAdvert;
  }
};