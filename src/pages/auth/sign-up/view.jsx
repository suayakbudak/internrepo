import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import { Field, Form } from "src/components/hook-form";
import { Iconify } from "src/components/iconify";
import { paths } from "src/routes/paths";
import { RouterLink } from "src/routes/router-link";
import { FormHead } from "../components/form-head";
import { SignUpTerms } from "../components/sign-up-terms";
import { useSignUpForm } from "./use-sign-up-form";

export function JwtSignUpView() {
  const { onSubmit, errorMessage, isSubmitting, methods, showPassword } = useSignUpForm();

  return (
    <>
      <FormHead
        title="Tamamen ücretsiz başlayın"
        description={
          <>
            Zaten hesabınız var mı?{" "}
            <Link component={RouterLink} href={paths.auth.giris} variant="subtitle2">
              Giriş yap
            </Link>
          </>
        }
        sx={{ textAlign: { xs: "center", md: "left" } }}
      />

      {!!errorMessage && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        <Box sx={{ gap: 3, display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              gap: { xs: 3, sm: 2 },
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Field.Text name="firstName" label="İsim" />
            <Field.Text name="lastName" label="Soyisim" />
          </Box>

          <Field.Phone name="phoneNumber" label="Telefon" country="TR" />

          <Field.Text name="email" label="E-posta adresi" />

          <Field.Text
            name="password"
            label="Şifre"
            placeholder="8+ karakter"
            type={showPassword.value ? "text" : "password"}
            slotProps={{
              inputLabel: { shrink: true },
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={showPassword.onToggle} edge="end">
                      <Iconify
                        icon={showPassword.value ? "solar:eye-bold" : "solar:eye-closed-bold"}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <LoadingButton
            fullWidth
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            loadingIndicator="Hesap oluşturuluyor..."
          >
            Hesap Oluştur
          </LoadingButton>
        </Box>
      </Form>

      <SignUpTerms />
    </>
  );
}
