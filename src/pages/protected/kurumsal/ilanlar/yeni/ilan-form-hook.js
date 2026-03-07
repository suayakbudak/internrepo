import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z as zod } from "zod";
import { useRouter } from "src/routes/hooks";
import { paths } from "src/routes/paths";
import { toast } from "src/components/snackbar";
import {
  getCategories,
  getCategoryFeatures,
  addAdvertFeatures,
  addAdvertImage,
  createAdvert,
} from "src/lib/actions/ilan";
import { axiosAuth, endpoints } from "src/lib/axios";

export const NewJobSchema = zod.object({
  title: zod.string().min(1, { message: "Başlık zorunludur!" }),
  content: zod.string().min(1, { message: "Açıklama zorunludur!" }),
  category: zod.any().refine((val) => val && val.value && val.label, {
    message: "Kategori zorunludur!",
  }),
  price: zod
    .number()
    .min(0, { message: "Fiyat pozitif olmalıdır!" })
    .or(
      zod
        .string()
        .min(1, { message: "Fiyat zorunludur!" })
        .refine((val) => !isNaN(Number(val)), {
          message: "Geçerli bir fiyat giriniz!",
        })
        .transform((val) => Number(val))
    ),

  images: zod.any().refine((val) => val && val.length > 0, {
    message: "En az bir fotoğraf yüklemelisiniz!",
  }),
  features: zod.record(zod.string()).optional(),
});

const defaultValues = {
  title: "",
  content: "",
  category: "",
  price: "",
  fullName: "",
  phone: "",
  email: "",
  features: {},
};

export const useIlanForm = (newIlan = null) => {
  const router = useRouter();
  const [uploadedImages, setUploadedImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryFeatures, setCategoryFeatures] = useState([]);
  const [isLoadingFeatures, setIsLoadingFeatures] = useState(false);

  const methods = useForm({
    mode: "all",
    resolver: zodResolver(NewJobSchema),
    defaultValues,
    values: newIlan,
  });

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      try {
        const [categoriesData] = await Promise.all([getCategories()]);

        if (mounted) {
          if (categoriesData && Array.isArray(categoriesData)) {
            const formattedCategories = categoriesData
              .filter((category) => category && typeof category === "object")
              .map((category) => ({
                value: category.id,
                label: category.name,
              }));
            setCategories(formattedCategories);
          } else {
            setCategories([]);
          }
        }
      } catch (error) {
        if (mounted) {
          console.error("Initialization error:", error);
          toast.error("Veriler yüklenirken hata oluştu!");
          setCategories([]);
        }
      }
    };

    initialize();

    return () => {
      mounted = false;
    };
  }, []);

  const handleImageUpload = useCallback(
    (event) => {
      const files = Array.from(event.target.files);
      const newImages = files.map((file) => ({
        url: URL.createObjectURL(file),
        file,
      }));
      setUploadedImages((prev) => [...prev, ...newImages]);

      methods.setValue("images", [...uploadedImages, ...newImages], {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    },
    [methods, uploadedImages]
  );

  const handleImageDelete = useCallback(
    (indexToDelete) => {
      setUploadedImages((prev) => prev.filter((_, index) => index !== indexToDelete));

      methods.setValue(
        "images",
        uploadedImages.filter((_, index) => index !== indexToDelete),
        {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        }
      );
    },
    [methods, uploadedImages]
  );

  const handleCategoryChange = useCallback(async (selectedCategory) => {
    if (!selectedCategory?.value) {
      setCategoryFeatures([]);
      return;
    }

    setIsLoadingFeatures(true);
    try {
      const features = await getCategoryFeatures(selectedCategory.value);
      setCategoryFeatures(features);
    } catch (error) {
      console.error("Error fetching category features:", error);
      toast.error("Kategori özellikleri yüklenirken hata oluştu!");
      setCategoryFeatures([]);
    } finally {
      setIsLoadingFeatures(false);
    }
  }, []);

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      const userResponse = await axiosAuth.post(endpoints.auth.me);
      if (!userResponse) {
        toast.error("Kullanıcı bilgisi bulunamadı!");
        return;
      }

      const advertData = {
        title: data.title,
        description: data.content,
        price: Number(data.price),
        categoryId: data.category.value,
        userId: userResponse.data.id,
      };

      const createdAdvert = await createAdvert(advertData);
      const advertId = createdAdvert.id;

      if (data.features && Object.keys(data.features).length > 0 && categoryFeatures.length > 0) {
        const featurePayload = {
          meta: {
            advertId,
            categoryId: data.category.value,
          },
          features: categoryFeatures.map((feature) => ({
            featureName: feature.featureName,
            featureValue: data.features?.[feature.id] || "",
          })),
        };

        await addAdvertFeatures(featurePayload);
      }
      // Resimleri form-data olarak gönder
      const formData = new FormData();
      formData.append("advertId", advertId);
      for (let i = 0; i < uploadedImages.length; i++) {
        const image = uploadedImages[i];
        formData.append("file", image.file);
      }
      await addAdvertImage(formData);
      methods.reset();
      toast.success(newIlan ? "Güncellendi!" : "Oluşturuldu!");
      router.push(paths.anasayfa.kurumsal.ilanlar.root);
    } catch (error) {
      console.error(error);
      toast.error("İlan oluşturulurken bir hata oluştu!");
    }
  });

  return {
    methods,
    onSubmit,
    isSubmitting: methods.formState.isSubmitting,
    uploadedImages,
    setUploadedImages,
    handleImageUpload,
    handleImageDelete,
    categories,
    categoryFeatures,
    isLoadingFeatures,
    handleCategoryChange,
  };
};
