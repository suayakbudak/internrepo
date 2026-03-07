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
import { FormDivider } from "src/pages/auth/components/form-divider";
import { FormSocials } from "src/pages/auth/components/form-socials";
import { SignUpTerms } from "src/pages/auth/components/sign-up-terms";

// ----------------------------------------------------------------------

export const SignUpSchema = zod.object({
  firstName: zod.string().min(1, { message: "First name is required!" }),
  lastName: zod.string().min(1, { message: "Last name is required!" }),
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

export function SplitSignUpView() {
  const showPassword = useBoolean();

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const methods = useForm({
    resolver: zodResolver(SignUpSchema),
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
    <Box sx={{ gap: 3, display: "flex", flexDirection: "column" }}>
      <Box
        sx={{ display: "flex", gap: { xs: 3, sm: 2 }, flexDirection: { xs: "column", sm: "row" } }}
      >
        <Field.Text name="firstName" label="Adı" />
        <Field.Text name="lastName" label="Soyadı" />
      </Box>

      <Field.Text name="email" label="Email adresi" />

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

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Hesabınız oluşturuluyor..."
      >
        Hesap oluştur
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <FormHead
        title="Tamamen ücretsiz başlayın"
        description={
          <>
            {`Zaten bir hesabınız mı var? `}
            <Link component={RouterLink} href={paths.authDemo.split.signIn} variant="subtitle2">
              Başlayın
            </Link>
          </>
        }
        sx={{ textAlign: { xs: "center", md: "left" } }}
      />

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm()}
      </Form>

      <SignUpTerms />

      <FormDivider />

      <FormSocials
        signInWithGoogle={() => {}}
        singInWithGithub={() => {}}
        signInWithTwitter={() => {}}
      />
    </>
  );
}
