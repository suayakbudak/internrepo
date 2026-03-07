import { useState, useEffect, useCallback } from "react";
import { z as zod } from "zod";
import { useForm } from "react-hook-form";
import { useBoolean } from "minimal-shared/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "src/routes/hooks";
import { paths } from "src/routes/paths";
import { hasDigit, hasLowerCase, hasSpecial, hasUpperCase } from "src/utils/text-utils";
import {
  resetPassword,
  verifyCode as verifyCodeAction,
  forgotPassword,
} from "src/lib/actions/auth";

export const UpdatePasswordSchema = zod
  .object({
    code: zod
      .string()
      .min(1, { message: "Kod gerekli!" })
      .min(6, { message: "Kod en az 6 karakter olmalıdır!" }),
    email: zod
      .string()
      .min(1, { message: "E-posta gerekli!" })
      .email({ message: "Geçerli bir e-posta adresi giriniz!" }),
    password: zod
      .string()
      .min(1, { message: "Şifre zorunludur!" })
      .min(8, { message: "Şifre en az 8 karakter olmalıdır!" })
      .refine((value) => hasUpperCase(value), {
        message: "Şifre en az bir büyük harf içermelidir.",
      })
      .refine((value) => hasLowerCase(value), {
        message: "Şifre en az bir küçük harf içermelidir.",
      })
      .refine((value) => hasDigit(value), {
        message: "Şifre en az bir rakam içermelidir.",
      })
      .refine((value) => hasSpecial(value), {
        message: "Şifre en az bir özel karakter içermelidir.",
      }),
    confirmPassword: zod.string().min(1, { message: "Şifre onayı gerekli!" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor!",
    path: ["confirmPassword"],
  });

export function useUpdatePasswordForm() {
  const router = useRouter();
  const showPassword = useBoolean();
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [status, setStatus] = useState({
    message: "",
    severity: "info",
  });

  const searchParams = new URLSearchParams(window.location.search);
  const emailFromUrl = searchParams.get("email") || "";

  const defaultValues = {
    code: "",
    password: "",
    confirmPassword: "",
    email: emailFromUrl,
  };

  const methods = useForm({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues,
  });

  const {
    watch,
    formState: { isSubmitting },
  } = methods;

  const code = watch("code");

  const verifyCode = useCallback(
    async (verificationCode) => {
      try {
        setStatus({ message: "Kod doğrulanıyor...", severity: "info" });

        const payload = {
          email: methods.getValues("email"),
          verificationCode,
        };

        await verifyCodeAction(payload);

        setIsCodeVerified(true);
        setStatus({ message: "Kod başarıyla doğrulandı!", severity: "success" });
      } catch (error) {
        console.error("Verify Code Error:", error.response?.data || error);
        setIsCodeVerified(false);
        setStatus({
          message: error.response?.data?.message || "Kod doğrulaması başarısız oldu",
          severity: "error",
        });
      }
    },
    [methods]
  );

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      if (!isCodeVerified) {
        setStatus({
          message: "Lütfen geçerli bir doğrulama kodu giriniz",
          severity: "warning",
        });
        return;
      }
      await resetPassword({
        email: methods.getValues("email"),
        password: data.password,
        confirmNewPassword: data.confirmPassword,
      });
      setStatus({
        message: "Şifreniz başarıyla güncellendi! Yönlendiriliyorsunuz...",
        severity: "success",
      });
      setTimeout(() => {
        router.push(paths.auth.signIn);
      }, 2000);

      router.push(paths.auth.giris);
    } catch (error) {
      console.error(error);
      setStatus({
        message: error.response?.data?.message || "Şifre güncelleme başarısız oldu",
        severity: "error",
      });
    }
  });

  const handleResendCode = async () => {
    try {
      await forgotPassword({
        email: methods.getValues("email"),
      });

      methods.setValue("code", "");
      setCountdown(30);
      setIsCodeVerified(false);
      setStatus({
        message: "Yeni doğrulama kodu email adresinize gönderildi!",
        severity: "success",
      });
    } catch (error) {
      console.error("Kod yeniden gönderme başarısız:", error);
      setStatus({
        message: "Kod yeniden gönderme başarısız oldu!",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    if (code?.length === 6) {
      verifyCode(code);
    }
  }, [code, verifyCode]);

  useEffect(() => {
    const timer =
      countdown > 0 &&
      setInterval(() => {
        setCountdown((current) => current - 1);
      }, 1000);

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown]);

  return {
    showPassword,
    isCodeVerified,
    countdown,
    status,
    methods,
    isSubmitting,
    onSubmit: methods.handleSubmit(onSubmit),
    handleResendCode,
  };
}
