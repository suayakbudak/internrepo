import { z as zod } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isValidPhoneNumber } from "react-phone-number-input/input";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import MenuItem from "@mui/material/MenuItem";
import LoadingButton from "@mui/lab/LoadingButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import { USER_STATUS_OPTIONS } from "src/_mock";

import { toast } from "src/components/snackbar";
import { Form, Field, schemaHelper } from "src/components/hook-form";

// ----------------------------------------------------------------------

export const UserQuickEditSchema = zod.object({
  name: zod.string().min(1, { message: "İsim gereklidir!" }),
  email: zod
    .string()
    .min(1, { message: "E-posta gereklidir!" })
    .email({ message: "Geçerli bir e-posta adresi olmalıdır!" }),
  phoneNumber: schemaHelper.phoneNumber({ isValid: isValidPhoneNumber }),
  country: schemaHelper.nullableInput(zod.string().min(1, { message: "Ülke gereklidir!" }), {
    // message for null value
    message: "Ülke gereklidir!",
  }),
  state: zod.string().min(1, { message: "Bölge gereklidir!" }),
  city: zod.string().min(1, { message: "Şehir gereklidir!" }),
  address: zod.string().min(1, { message: "Adres gereklidir!" }),
  zipCode: zod.string().min(1, { message: "Posta kodu gereklidir!" }),
  company: zod.string().min(1, { message: "Şirket gereklidir!" }),
  role: zod.string().min(1, { message: "Rol gereklidir!" }),
  // Not required
  status: zod.string(),
});

// ----------------------------------------------------------------------

export function UserQuickEditForm({ currentUser, open, onClose }) {
  const defaultValues = {
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    status: "",
    company: "",
    role: "",
  };

  const methods = useForm({
    mode: "all",
    resolver: zodResolver(UserQuickEditSchema),
    defaultValues,
    values: currentUser,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const promise = new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      reset();
      onClose();

      toast.promise(promise, {
        loading: "Yükleniyor...",
        success: "Güncelleme başarılı!",
        error: "Güncelleme hatası!",
      });

      await promise;

      console.info("VERİLER", data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { maxWidth: 720 } }}
    >
      <DialogTitle>Quick update</DialogTitle>

      <Form methods={methods} onSubmit={onSubmit}>
        <DialogContent>
          <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
            Account is waiting for confirmation
          </Alert>

          <Box
            sx={{
              rowGap: 3,
              columnGap: 2,
              display: "grid",
              gridTemplateColumns: { xs: "repeat(1, 1fr)", sm: "repeat(2, 1fr)" },
            }}
          >
            <Field.Select name="status" label="Status">
              {USER_STATUS_OPTIONS.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </Field.Select>

            <Box sx={{ display: { xs: "none", sm: "block" } }} />

            <Field.Text name="name" label="Tam Adı" />
            <Field.Text name="email" label="E-posta adresi" />
            <Field.Phone name="phoneNumber" label="Telefon no" />

            <Field.CountrySelect fullWidth name="country" label="Ülke" placeholder="Ülke seçin" />

            <Field.Text name="state" label="Eyalet/bölge" />
            <Field.Text name="city" label="Şehir" />
            <Field.Text name="address" label="Adres" />
            <Field.Text name="zipCode" label="Posta kodu" />
            <Field.Text name="company" label="Şirket" />
            <Field.Text name="role" label="Rol" />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Update
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
