import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import InputAdornment from "@mui/material/InputAdornment";
import Alert from "@mui/material/Alert";

import { paths } from "src/routes/paths";
import { SentIcon } from "src/assets/icons";
import { Iconify } from "src/components/iconify";
import { Form, Field } from "src/components/hook-form";
import { FormHead } from "src/pages/auth/components/form-head";
import { FormResendCode } from "src/pages/auth/components/form-resend-code";
import { FormReturnLink } from "src/pages/auth/components/form-return-link";
import { useUpdatePasswordForm } from "./use-update-password-form";

export function UpdatePasswordView() {
  const {
    showPassword,
    isCodeVerified,
    countdown,
    status,
    methods,
    isSubmitting,
    onSubmit,
    handleResendCode,
  } = useUpdatePasswordForm();

  return (
    <>
      <FormHead
        icon={<SentIcon />}
        title="İstek başarıyla gönderildi!"
        description={`E-posta adresinize 6 haneli bir doğrulama kodu gönderdik. \nLütfen e-postanızı doğrulamak için kodu aşağıdaki kutuya girin.`}
      />

      {status.message && (
        <Alert severity={status.severity} sx={{ mb: 3 }}>
          {status.message}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        <Box sx={{ gap: 3, display: "flex", flexDirection: "column" }}>
          <Field.Code name="code" />

          {isCodeVerified && (
            <>
              <Field.Text
                name="password"
                label="Şifre"
                placeholder="En az 6 karakter"
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

              <Field.Text
                name="confirmPassword"
                label="Şifreyi onayla"
                placeholder="En az 6 karakter"
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
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Şifreyi Güncelle
              </LoadingButton>
            </>
          )}
        </Box>
      </Form>

      <FormResendCode onResendCode={handleResendCode} value={countdown} disabled={countdown > 0} />

      <FormReturnLink href={paths.auth.giris} />
    </>
  );
}
