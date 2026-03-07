import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { fData } from "src/utils/format-number";

import { Field, Form } from "src/components/hook-form";
import { useAuthContext } from "src/context/auth-context";
import { useProfileForm } from "./use-profile-form";

export function AccountGeneralView() {
  const { methods, onSubmit } = useProfileForm();
  const { user } = useAuthContext();

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              pt: 10,
              pb: 5,
              px: 3,
              textAlign: "center",
            }}
          >
            <Field.UploadAvatar
              name="photoURL"
              maxSize={3145728}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 3,
                    mx: "auto",
                    display: "block",
                    textAlign: "center",
                    color: "text.disabled",
                  }}
                >
                  Sadece *.jpeg, *.jpg, *.png, *.gif türleri geçerlidir.
                  <br /> Maksimum boyut: {fData(3145728)}
                </Typography>
              }
            />
            {/*
            <Field.Switch
              name="isPublic"
              labelPlacement="start"
              label="Public profile"
              sx={{ mt: 5 }}
            /> */}
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                rowGap: 3,
                columnGap: 2,
                display: "grid",
                gridTemplateColumns: { xs: "repeat(1, 1fr)", sm: "repeat(2, 1fr)" },
              }}
            >
              <Field.Text name="displayName" label="Ad Soyad" disabled />
              <Field.Text name="email" label="E-posta adresi" disabled />
              <Field.Phone name="phoneNumber" label="Telefon no" disabled />
              <Field.Phone name="phoneNumberInternal" label="Kurum telefon no" disabled />
            </Box>

            <Stack spacing={3} sx={{ mt: 3, alignItems: "flex-end" }}>
              <Field.Text name="about" multiline rows={4} label="Hakkımda" disabled />

              {/* <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save changes
              </LoadingButton> */}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
