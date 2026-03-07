import { zodResolver } from "@hookform/resolvers/zod";
import { useBoolean } from "minimal-shared/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "src/context/auth-context";
import { signInWithPassword } from "src/lib/actions/auth";
import { useRouter } from "src/routes/hooks";
import { getErrorMessage } from "src/utils/get-error-message";
import { z as zod } from "zod";

export const SignInSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: "Email gerekli!" })
    .email({ message: "Geçerli bir email adresi giriniz!" }),
  password: zod
    .string()
    .min(1, { message: "Şifre gerekli!" }),
});

export function useSignInForm() {
  const router = useRouter();
  const showPassword = useBoolean();
  const { checkUserSession } = useAuthContext();
  const [errorMessage, setErrorMessage] = useState("");

  const defaultValues = {
    email: "demo@minimals.cc",
    password: "@demo1",
  };

  const methods = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      console.log("🔐 Giriş yapılıyor...");
      
      // 1. Token'ı kaydet
      await signInWithPassword({ email: data.email, password: data.password });
      console.log("✅ Token kaydedildi");
      
      // 2. User session'ı güncelle ve BEKLE
      await checkUserSession?.();
      console.log("✅ User session güncellendi");
      
      // 3. Kısa bir bekleme (state güncellemesi için)
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // 4. Yönlendir
      console.log("🔄 Yönlendiriliyor...");
      router.push("/anasayfa/kurumsal/ilanlar/liste");
    } catch (error) {
      console.error("❌ Giriş hatası:", error);
      const feedbackMessage = getErrorMessage(error);
      setErrorMessage(feedbackMessage);
    }
  });

  return {
    onSubmit,
    isSubmitting: methods.formState.isSubmitting,
    methods,
    errorMessage,
    showPassword,
  };
}
