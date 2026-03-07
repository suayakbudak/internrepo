import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";

import { paths } from "src/routes/paths";

import { PasswordIcon } from "src/assets/icons";

import { Form, Field } from "src/components/hook-form";

import { FormHead } from "src/pages/auth/components/form-head";
import { FormReturnLink } from "src/pages/auth/components/form-return-link";

import { useResetPasswordForm } from "./use-reset-password-form";

// ----------------------------------------------------------------------

export function ResetPasswordView() {
  const { errorMessage, isSubmitting, methods, onSubmit } = useResetPasswordForm();

  return (
    <>
      <FormHead
        icon={<PasswordIcon />}
        title="Şifrenizi mi unuttunuz?"
        description="Lütfen hesabınızla ilişkili e-posta adresini girin. Şifrenizi sıfırlamanız için size bir bağlantı göndereceğiz."
      />

      {!!errorMessage && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        <Box sx={{ gap: 3, display: "flex", flexDirection: "column" }}>
          <Field.Text autoFocus name="email" label="E-posta adresi" placeholder="ornek@gmail.com" />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            loadingIndicator="İstek gönderiliyor..."
          >
            İstek Gönder
          </LoadingButton>
        </Box>
      </Form>

      <FormReturnLink href={paths.auth.giris} />
    </>
  );
}
