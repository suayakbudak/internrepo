import { useForm, Controller } from "react-hook-form";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import LoadingButton from "@mui/lab/LoadingButton";
import ListItemText from "@mui/material/ListItemText";
import FormControlLabel from "@mui/material/FormControlLabel";

import { toast } from "src/components/snackbar";
import { Form } from "src/components/hook-form";

// ----------------------------------------------------------------------

const NOTIFICATIONS = [
  {
    subheader: "Etkinlik",
    caption: "Etkinlik ayarları",
    items: [
      { id: "activity_comments", label: "Makaleme yorum yapıldığında e-posta gönder" },
      { id: "activity_answers", label: "Formuma yanıt geldiğinde e-posta gönder" },
      { id: "activityFollows", label: "Biri beni takip ettiğinde e-posta gönder" },
    ],
  },
  {
    subheader: "Uygulama",
    caption: "Uygulama ayarları",
    items: [
      { id: "application_news", label: "Haberler ve duyurular" },
      { id: "application_product", label: "Haftalık ürün güncellemeleri" },
      { id: "application_blog", label: "Haftalık blog özeti" },
    ],
  },
];

// ----------------------------------------------------------------------

export function AccountNotifications() {
  const methods = useForm({
    defaultValues: { selected: ["activity_comments", "application_product"] },
  });

  const {
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success("Kaydetme başarılı!");
      console.info("VERİLER", data);
    } catch (error) {
      console.error(error);
    }
  });

  const getSelected = (selectedItems, item) =>
    selectedItems.includes(item)
      ? selectedItems.filter((value) => value !== item)
      : [...selectedItems, item];

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
        {NOTIFICATIONS.map((notification) => (
          <Grid key={notification.subheader} container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <ListItemText
                primary={notification.subheader}
                secondary={notification.caption}
                primaryTypographyProps={{ typography: "h6", mb: 0.5 }}
                secondaryTypographyProps={{ component: "span" }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
              <Stack spacing={1} sx={{ p: 3, borderRadius: 2, bgcolor: "background.neutral" }}>
                <Controller
                  name="selected"
                  control={control}
                  render={({ field }) => (
                    <>
                      {notification.items.map((item) => (
                        <FormControlLabel
                          key={item.id}
                          label={item.label}
                          labelPlacement="start"
                          control={
                            <Switch
                              checked={field.value.includes(item.id)}
                              onChange={() => field.onChange(getSelected(values.selected, item.id))}
                              inputProps={{
                                id: `${item.label}-switch`,
                                "aria-label": `${item.label} switch`,
                              }}
                            />
                          }
                          sx={{ m: 0, width: 1, justifyContent: "space-between" }}
                        />
                      ))}
                    </>
                  )}
                />
              </Stack>
            </Grid>
          </Grid>
        ))}

        <LoadingButton type="submit" variant="contained" loading={isSubmitting} sx={{ ml: "auto" }}>
          Değişiklikleri kaydet
        </LoadingButton>
      </Card>
    </Form>
  );
}
