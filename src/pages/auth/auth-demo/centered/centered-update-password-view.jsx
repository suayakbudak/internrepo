import { z as zod } from "zod";
import { useForm } from "react-hook-form";
import { useBoolean } from "minimal-shared/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import InputAdornment from "@mui/material/InputAdornment";

import { paths } from "src/routes/paths";

import { SentIcon } from "src/assets/icons";

import { Iconify } from "src/components/iconify";
import { Form, Field } from "src/components/hook-form";

import { FormHead } from "src/pages/auth/components/form-head";
import { FormResendCode } from "src/pages/auth/components/form-resend-code";
import { FormReturnLink } from "src/pages/auth/components/form-return-link";

// ----------------------------------------------------------------------

export const UpdatePasswordSchema = zod
  .object({
    code: zod
      .string()
      .min(1, { message: "Kod gereklidir!" })
      .min(6, { message: "Kod en az 6 karakter içermelidir!" }),
    email: zod
      .string()
      .min(1, { message: "Email adresi gereklidir!" })
      .email({ message: "Email geçerli bir email adresi olmalıdır!" }),
    password: zod
      .string()
      .min(1, { message: "Şifre gereklidir!" })
      .min(6, { message: "Şifre en az 6 karakter içermelidir!" }),
    confirmPassword: zod.string().min(1, { message: "Şifre onayı gerekli!dir" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor!",
    path: ["confirmPassword"],
  });

// ----------------------------------------------------------------------

export function CenteredUpdatePasswordView() {
  const showPassword = useBoolean();

  const defaultValues = {
    code: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const methods = useForm({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.info("DATA", data);
    } catch (error) {
      console.error(error);
    }
  });

  const renderForm = () => (
    <Box sx={{ gap: 3, display: "flex", flexDirection: "column" }}>
      <Field.Text name="email" label="Email adresi" placeholder="example@gmail.com" />

      <Field.Code name="code" />

      <Field.Text
        name="password"
        label="Şifre"
        placeholder="6+ karakter"
        type={showPassword.value ? "text" : "password"}
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={showPassword.onToggle} edge="end">
                  <Iconify icon={showPassword.value ? "solar:eye-bold" : "solar:eye-closed-bold"} />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <Field.Text
        name="confirmPassword"
        label="Şifreyi onayla"
        type={showPassword.value ? "text" : "password"}
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={showPassword.onToggle} edge="end">
                  <Iconify icon={showPassword.value ? "solar:eye-bold" : "solar:eye-closed-bold"} />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Şifre güncelleniyor..."
      >
        Şifreyi güncelle
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <FormHead
        icon={<SentIcon />}
        title="Talebiniz başarıyla gönderildi!"
        description={`Mailinize 6 haneli doğrulama kodu gönderildi. \nEmailinizi doğrulamak için lütfen kodunuzu aşağıdaki kutucuğa giriniz.`}
      />

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm()}
      </Form>

      <FormResendCode onResendCode={() => {}} value={0} disabled={false} />

      <FormReturnLink href={paths.authDemo.centered.signIn} />
    </>
  );
}
