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
import { useSignInForm } from "./use-sign-in-form";

export function JwtSignInView() {
  const { errorMessage, isSubmitting, methods, onSubmit, showPassword } = useSignInForm();

  return (
    <>
      <FormHead
        title="Hesabınıza giriş yapın"
        description={
          <>
            Hesabınız yok mu?{" "}
            <Link component={RouterLink} href={paths.auth.kayit} variant="subtitle2">
              Başlayın
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
          <Field.Text name="email" label="Email adresi" />

          <Box sx={{ gap: 1.5, display: "flex", flexDirection: "column" }}>
            <Link
              component={RouterLink}
              href={paths.auth.sifremiUnuttum}
              variant="body2"
              color="inherit"
              sx={{ alignSelf: "flex-end" }}
            >
              Şifrenizi mi unuttunuz?
            </Link>

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
          </Box>

          <LoadingButton
            fullWidth
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            loadingIndicator="Giriş yapılıyor..."
          >
            Giriş Yap
          </LoadingButton>
        </Box>
      </Form>
    </>
  );
}
