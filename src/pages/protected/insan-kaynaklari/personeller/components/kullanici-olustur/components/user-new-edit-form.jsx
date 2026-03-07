import React from "react";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input/input";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl, InputLabel, MenuItem, Select, Checkbox, ListItemText } from "@mui/material";

import { paths } from "src/routes/paths";
import { useRouter } from "src/routes/hooks";

import { fData } from "src/utils/format-number";

import { Label } from "src/components/label";
import { toast } from "src/components/snackbar";
import { Form, Field, schemaHelper } from "src/components/hook-form";

// ----------------------------------------------------------------------

export const NewUserSchema = zod.object({
  avatarUrl: schemaHelper.file({ message: "Avatar is required!" }),
  name: zod.string().min(1, { message: "Name is required!" }),
  email: zod
    .string()
    .min(1, { message: "Email is required!" })
    .email({ message: "Email must be a valid email address!" }),
  phoneNumber: schemaHelper.phoneNumber({ isValid: isValidPhoneNumber }),
  country: schemaHelper.nullableInput(zod.string().min(1, { message: "Country is required!" }), {
    // message for null value
    message: "Country is required!",
  }),
  address: zod.string().min(1, { message: "Address is required!" }),
  company: zod.string().min(1, { message: "Company is required!" }),
  state: zod.string().min(1, { message: "State is required!" }),
  city: zod.string().min(1, { message: "City is required!" }),
  role: zod.string().min(1, { message: "Role is required!" }),
  zipCode: zod.string().min(1, { message: "Zip code is required!" }),
  // Not required
  status: zod.string(),
  isVerified: zod.boolean(),
});

// ----------------------------------------------------------------------

export function UserNewEditForm({ currentUser }) {
  const [selectedValues, setSelectedValues] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedValues(
      // Eğer dizi yerine sadece değer dönerse string olarak gelmesini önlemek için kontrol
      typeof value === "string" ? value.split(",") : value
    );
  };

  const options = ["Şef", "Müdür", "Teknisyen", "Başkan", "Mühendis"];

  const router = useRouter();

  const defaultValues = {
    status: "",
    avatarUrl: null,
    isVerified: true,
    name: "",
    email: "",
    phoneNumber: "",
    country: "",
    state: "",
    city: "",
    address: "",
    zipCode: "",
    company: "",
    role: "",
  };

  const methods = useForm({
    mode: "onSubmit",
    resolver: zodResolver(NewUserSchema),
    defaultValues,
    values: currentUser,
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success(currentUser ? "Update success!" : "Create success!");
      router.push(paths.anasayfa.ayarlar.liste);
      console.info("DATA", data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {currentUser && (
              <Label
                color={
                  (values.status === "active" && "success") ||
                  (values.status === "banned" && "error") ||
                  "warning"
                }
                sx={{ position: "absolute", top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <Field.UploadAvatar
                name="avatarUrl"
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
                    *.jpeg, *.jpg, *.png, *.gif
                    <br /> maksimum boyut {fData(3145728)}
                  </Typography>
                }
              />
            </Box>

            {currentUser && (
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value !== "active"}
                        onChange={(event) =>
                          field.onChange(event.target.checked ? "banned" : "active")
                        }
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Banned
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      Apply disable account
                    </Typography>
                  </>
                }
                sx={{
                  mx: 0,
                  mb: 3,
                  width: 1,
                  justifyContent: "space-between",
                }}
              />
            )}

            <Field.Switch
              name="isVerified"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Email Doğrulama
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Aktivasyon linki mail adresine gönderilecektir.
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: "space-between" }}
            />

            {currentUser && (
              <Stack sx={{ mt: 3, alignItems: "center", justifyContent: "center" }}>
                <Button variant="soft" color="error">
                  Delete user
                </Button>
              </Stack>
            )}
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
              <Field.Text name="name" label="İsim" />
              <Field.Text name="email" label="Email" />
              <Field.Phone
                name="phoneNumber"
                label="Telefon Numarası"
                country={!currentUser ? "TR" : undefined}
              />
              <Field.CountrySelect
                fullWidth
                name="country"
                label="Ülke"
                placeholder="Ülke Seçiniz"
              />
              <Field.Text name="state" label="İl" />
              <Field.Text name="city" label="İlçe" />
              <Field.Text name="address" label="Adres" />
              <Field.Text name="zipCode" label="Posta Kodu" />
              <Field.Text name="company" label="Birim" />
              <FormControl fullWidth>
                <InputLabel id="multi-select-label">Roller</InputLabel>
                <Select
                  labelId="multi-select-label"
                  id="multi-select"
                  multiple
                  value={selectedValues}
                  onChange={handleChange}
                  renderValue={(selected) => selected.join(", ")} // Seçilen değerlerin nasıl görüneceği
                >
                  {options.map((option) => (
                    <MenuItem key={option} value={option}>
                      <Checkbox checked={selectedValues.indexOf(option) > -1} />
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>{" "}
            </Box>

            <Stack sx={{ mt: 3, alignItems: "flex-end" }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentUser ? "Create user" : "Save changes"}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
