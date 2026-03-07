import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function useSocialForm(socialLinks) {
  const defaultValues = {
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
  };

  const methods = useForm({
    defaultValues,
    values: socialLinks,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success("Kaydetme başarılı!");
      console.info("VERİLER", data);
    } catch (error) {
      console.error(error);
    }
  });

  return { methods, onSubmit, isSubmitting };
}
