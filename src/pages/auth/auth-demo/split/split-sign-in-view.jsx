import { z as zod } from "zod";
import { useForm } from "react-hook-form";
import { useBoolean } from "minimal-shared/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import InputAdornment from "@mui/material/InputAdornment";

import { paths } from "src/routes/paths";
import { RouterLink } from "src/routes/router-link";

import { Iconify } from "src/components/iconify";
import { Form, Field } from "src/components/hook-form";

import { FormHead } from "src/pages/auth/components/form-head";
import { FormSocials } from "src/pages/auth/components/form-socials";
import { FormDivider } from "src/pages/auth/components/form-divider";

// ----------------------------------------------------------------------

export const SignInSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: "Email adresi gereklidir!" })
    .email({ message: "Email geçerli bir email adresi olmalıdır!" }),
  password: zod
    .string()
    .min(1, { message: "Şifre gereklidir!" })
    .min(6, { message: "Şifre en az 6 karakter içermelidir!" }),
});

// ----------------------------------------------------------------------

export function SplitSignInView() {
  const showPassword = useBoolean();

  const defaultValues = {
    email: "",
    password: "",
  };

  const methods = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.info("VERİLER", data);
    } catch (error) {
      console.error(error);
    }
  });

  const renderForm = () => (
    <Box
      sx={{
        gap: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Field.Text name="email" label="Email adresi" />

      <Box
        sx={{
          gap: 1.5,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Link
          component={RouterLink}
          href={paths.authDemo.split.resetPassword}
          variant="body2"
          color="inherit"
          sx={{ alignSelf: "flex-end" }}
        >
          Şifrenizi mi unuttunuz?
        </Link>

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
        Giriş yap
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <FormHead
        title="Hesabınıza giriş yapın"
        description={
          <>
            {`Hesabınız yok mu? `}
            <Link component={RouterLink} href={paths.authDemo.split.signUp} variant="subtitle2">
              Başlayın
            </Link>
          </>
        }
        sx={{ textAlign: { xs: "center", md: "left" } }}
      />

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm()}
      </Form>

      <FormDivider />

      <FormSocials
        signInWithGoogle={() => {}}
        singInWithGithub={() => {}}
        signInWithTwitter={() => {}}
      />
    </>
  );
}
