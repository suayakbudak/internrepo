import LoadingButton from "@mui/lab/LoadingButton";
import { MenuItem, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Field, Form } from "src/components/hook-form";
import { STATUS_OPTIONS, STATUS_KEYS } from "../utils";
import { ProjectAddContact } from "./projects-table-com/add-contact";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosAuth } from "src/lib/axios";
import { endpoints } from "src/lib/endpoints";
import { mutate } from "swr";
import { z as zod } from "zod";
import dayjs from "dayjs";

export const NewProjectSchema = zod.object({
  name: zod.string().min(1, "Proje adı zorunlu bir alandır"),
  description: zod.string().min(1, "Açıklama zorunlu bir alandır"),
  status: zod.enum(STATUS_KEYS),
  start_date: zod.coerce.date("Başlangıç tarihi zorunlu bir alandır"),
  end_date: zod.coerce.date("Bitiş tarihi zorunlu bir alandır"),
  assignerIds: zod.array(zod.string()),
  projectCode: zod.string(),
});

export function NewProjectDialog({ open, onClose, isEditForm = false, values }) {
  const methods = useForm({
    resolver: zodResolver(NewProjectSchema),
    defaultValues: isEditForm
      ? values
      : {
          name: "",
          description: "",
          status: "",
          start_date: dayjs(new Date()).format(),
          end_date: dayjs(new Date()).format(),
          assignerIds: [""],
          projectCode: "",
        },
  });

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      const url = isEditForm
        ? endpoints.put.projects.id(values.id)
        : endpoints.post.projects.create;

      const request = isEditForm ? axiosAuth.put(url, data) : axiosAuth.post(url, data);

      await request;
      await mutate(endpoints.get.projects.root, (oldData) =>
        oldData.data.map((item) => {
          if (isEditForm && item.id === values.id) {
            return {
              ...item,
              ...data,
            };
          }
          return item;
        })
      );

      methods.reset();
      onClose();
    } catch (e) {
      console.error(e);
    }
  });

  return (
    <Dialog fullWidth maxWidth="xs" sx={{ overflow: "hidden" }} open={open} onClose={onClose}>
      <DialogTitle sx={{ pb: 0 }}>Yeni Proje</DialogTitle>
      <DialogContent>
        <Box sx={{ py: 4 }}>
          <Form methods={methods} onSubmit={onSubmit}>
            <Stack direction="column" spacing={3}>
              <Field.Text name="name" label="Proje Adı" />
              <Field.Select name="status" label="Proje durumu">
                {STATUS_OPTIONS.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </Field.Select>
              <Field.Text name="projectCode" label="Proje Kodu" />
              <Field.Editor name="description" label="Açıklama" />
              <Field.DatePicker name="start_date" label="Başlama Tarihi" />
              <Field.DatePicker name="end_date" label="Bitiş Tarihi" />
              <ProjectAddContact
                name="assignerIds"
                label="Atanacak Kişiler"
                setValue={methods.setValue}
                defaultValue={values?.assignedUsers || []}
              />

              <LoadingButton
                fullWidth
                color="inherit"
                size="large"
                type="submit"
                variant="contained"
                loadingIndicator={isEditForm ? "Proje kaydediliyor..." : "Proje oluşturuluyor..."}
                loading={methods.formState.isSubmitting}
              >
                {isEditForm ? "Proje Kaydet" : "Proje Oluştur"}
              </LoadingButton>
            </Stack>
          </Form>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
