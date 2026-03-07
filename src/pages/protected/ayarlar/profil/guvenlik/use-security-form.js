import { z as zod } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "src/components/snackbar";

export const ChangePassWordSchema = zod
  .object({
    oldPassword: zod
      .string()
      .min(1, { message: "Eski şifre gereklidir!" })
      .min(6, { message: "Şifre en az 6 karakter olmalıdır!" }),
    newPassword: zod.string().min(1, { message: "Yeni şifre gereklidir!" }),
    confirmNewPassword: zod.string().min(1, { message: "Yeni şifre onayı gereklidir!" }),
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "Yeni şifre, eski şifreden farklı olmalıdır.",
    path: ["newPassword"],
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Şifreler eşleşmiyor!",
    path: ["confirmNewPassword"],
  });

export function useSecurityForm() {
  const defaultValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const methods = useForm({
    mode: "all",
    resolver: zodResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success("Kaydetme başarılı!");
      console.info("VERİLER", data);
    } catch (error) {
      console.error(error);
    }
  });

  return { methods, onSubmit, isSubmitting };
}
