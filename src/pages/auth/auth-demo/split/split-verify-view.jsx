import { z as zod } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";

import { paths } from "src/routes/paths";

import { EmailInboxIcon } from "src/assets/icons";

import { Form, Field } from "src/components/hook-form";

import { FormHead } from "src/pages/auth/components/form-head";
import { FormReturnLink } from "src/pages/auth/components/form-return-link";
import { FormResendCode } from "src/pages/auth/components/form-resend-code";

// ----------------------------------------------------------------------

export const VerifySchema = zod.object({
  code: zod
    .string()
    .min(1, { message: "Kod gereklidir!" })
    .min(6, { message: "Kod en az 6 karakter içermelidir!" }),
  email: zod
    .string()
    .min(1, { message: "Email adresi gereklidir!" })
    .email({ message: "Email geçerli bir email adresi olmalıdır!" }),
});

// ----------------------------------------------------------------------

export function SplitVerifyView() {
  const defaultValues = {
    code: "",
    email: "",
  };

  const methods = useForm({
    resolver: zodResolver(VerifySchema),
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
      <Field.Text name="email" label="Email adresi" placeholder="example@gmail.com" />

      <Field.Code name="code" />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Doğrulanıyor..."
      >
        Doğrula
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <FormHead
        icon={<EmailInboxIcon />}
        title="Lütfen mailinizi kontrol ediniz!"
        description={`Mailinize 6 haneli doğrulama kodu gönderildi. \nEmailinizi doğrulamak için lütfen kodunuzu aşağıdaki kutucuğa giriniz.`}
      />

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm()}
      </Form>

      <FormResendCode onResendCode={() => {}} value={0} disabled={false} />

      <FormReturnLink href={paths.authDemo.split.signIn} />
    </>
  );
}
