import { zodResolver } from "@hookform/resolvers/zod";
import { useBoolean } from "minimal-shared/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "sonner";
import { schemaHelper } from "src/components/hook-form";
// import { useAuthContext } from "src/context/auth-context";
import { signUp } from "src/lib/actions/auth";
import { useRouter } from "src/routes/hooks";
import { paths } from "src/routes/paths";
import { getErrorMessage } from "src/utils/get-error-message";
import { hasDigit, hasLowerCase, hasSpecial, hasUpperCase } from "src/utils/text-utils";
import { z as zod } from "zod";

export const SignUpSchema = zod.object({
  firstName: zod.string().min(1, { message: "İsim zorunludur!" }),
  lastName: zod.string().min(1, { message: "Soyisim zorunludur!" }),
  phoneNumber: schemaHelper.phoneNumber({ isValid: isValidPhoneNumber }),
  email: zod
    .string()
    .min(1, { message: "Email zorunludur!" })
    .email({ message: "Geçerli bir email adresi giriniz!" }),
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
});

export function useSignUpForm() {
  const router = useRouter();
  const showPassword = useBoolean();
  // const { checkUserSession } = useAuthContext();
  const [errorMessage, setErrorMessage] = useState("");

  const methods = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      await signUp({
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        password: data.password,
      });
      // await checkUserSession?.();

      router.push(paths.auth.giris);
      toast.success("Hesabınız başarıyla oluşturuldu.");
    } catch (error) {
      console.error(error);
      setErrorMessage(getErrorMessage(error));
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
