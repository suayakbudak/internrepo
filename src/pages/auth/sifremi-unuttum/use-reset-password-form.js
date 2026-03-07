import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { forgotPassword } from "src/lib/actions/auth";
import { useRouter } from "src/routes/hooks";
import { paths } from "src/routes/paths";
import { z as zod } from "zod";

export const ResetPasswordSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: "Email gerekli!" })
    .email({ message: "Geçerli bir email adresi giriniz!" }),
});

export function useResetPasswordForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const methods = useForm({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      await forgotPassword(data);
      setErrorMessage("Şifrenizi sıfırlama linki gönderildi.");
      router.push(`${paths.auth.resetPassword}?email=${encodeURIComponent(data.email)}`);
    } catch (error) {
      console.error("Error details:", error);

      if (error.message === "User not found") {
        setErrorMessage("Bu email adresi sistemde kayıtlı değil!");
      } else {
        setErrorMessage("Şifrenizi sıfırlama linki gönderimi başarısız oldu");
      }
    }
  });

  return {
    onSubmit,
    isSubmitting: methods.formState.isSubmitting,
    methods,
    errorMessage,
  };
}
