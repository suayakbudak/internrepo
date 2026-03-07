import { useBoolean } from "minimal-shared/hooks";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import InputAdornment from "@mui/material/InputAdornment";

import { Iconify } from "src/components/iconify";
import { Form, Field } from "src/components/hook-form";
import { useSecurityForm } from "./use-security-form";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function AccountChangePasswordView() {
  const showPassword = useBoolean();

  const { methods, onSubmit, isSubmitting } = useSecurityForm();

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card
        sx={{
          p: 3,
          gap: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Field.Text
          name="oldPassword"
          type={showPassword.value ? "text" : "password"}
          label="Eski şifre"
          slotProps={{
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
          name="newPassword"
          label="Yeni şifre"
          type={showPassword.value ? "text" : "password"}
          slotProps={{
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
          helperText={
            <Box component="span" sx={{ gap: 0.5, display: "flex", alignItems: "center" }}>
              <Iconify icon="eva:info-fill" width={16} /> Şifre en az 6 karakter olmalıdır.
            </Box>
          }
        />

        <Field.Text
          name="confirmNewPassword"
          type={showPassword.value ? "text" : "password"}
          label="Yeni şifreyi onayla"
          slotProps={{
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

        <LoadingButton type="submit" variant="contained" loading={isSubmitting} sx={{ ml: "auto" }}>
          Değişiklikleri kaydet
        </LoadingButton>
      </Card>
    </Form>
  );
}
