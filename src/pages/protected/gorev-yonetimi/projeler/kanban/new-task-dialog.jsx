import LoadingButton from "@mui/lab/LoadingButton";
import { Grid2, MenuItem, Stack, styled } from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { Field, Form } from "src/components/hook-form";
import { useGetProjects } from "src/hooks/getters/use-get-projects";

import { useParams } from "src/routes/hooks";
import { ProjectAddContact } from "../root/projects-table-com/add-contact";
import { KanbanDetailsPriority } from "./details/kanban-details-priority";
import { useFetch } from "src/hooks/getters/use-fetch";
import { endpoints } from "src/lib/endpoints";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z as zod } from "zod";
import dayjs from "dayjs";
import { createTask } from "./actions";

const NewTaskSchema = zod.object({
  assigned_to: zod.array(zod.string()).optional(),
  labels: zod.array(zod.string()).optional(),
  title: zod.string().min(1, "Görev adı zorunludur"),
  description: zod.string().optional(),
  priority: zod.enum(["low", "medium", "high"]),
  due_date: zod.coerce.date(),
  taskPeriod: zod
    .enum(["tekrarlanmaz", "daily", "weekly", "monthly"])
    .transform((value) => (value === "tekrarlanmaz" ? null : value)),
  attachments: zod.array(zod.string()).optional(),
  projectId: zod.string().min(1, "Proje seçmeniz zorunludur"),
  columnId: zod.string().min(1, "Durum seçmeniz zorunludur"),
  parentId: zod.string().nullable(),
});

const BlockLabel = styled("span")(({ theme }) => ({
  ...theme.typography.caption,
  width: 100,
  flexShrink: 0,
  color: theme.vars.palette.text.secondary,
  fontWeight: theme.typography.fontWeightMedium,
}));

export function NewTaskDialog({ open, onClose, defaultColumnId, parentTaskId }) {
  const { id1: projectId = "", id2: boardId = "" } = useParams();

  const methods = useForm({
    resolver: zodResolver(NewTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      due_date: dayjs(new Date()).format(),
      columnId: defaultColumnId || "",
      projectId: projectId || "",
      assigned_to: [""],
      labels: [],
      taskPeriod: "tekrarlanmaz",
      attachments: [],
      parentId: parentTaskId || null,
    },
  });

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      console.log(data);
      await createTask(boardId, data);
      methods.reset();
      onClose();
    } catch (e) {
      console.error(e);
    }
  });

  const isSubmitting = methods.formState.isSubmitting;

  const { data: columns } = useFetch(endpoints.get.boards.columns(boardId));
  const { data: tasks } = useFetch(endpoints.get.boards.tasks(boardId));

  const { projects } = useGetProjects();

  const [priority, setPriority] = useState("medium");
  const [selectedColumn, setSelectedColumn] = useState(defaultColumnId || "");

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     console.log("assigned", methods.getValues().assigned_to);
  //   }, 5000);
  //   return () => clearInterval(intervalId);
  // }, [methods]);

  if (!columns || !tasks) return null;

  return (
    <Dialog fullWidth maxWidth="xs" sx={{ overflow: "hidden" }} open={open} onClose={onClose}>
      <DialogTitle sx={{ pb: 0 }}>Yeni Görev</DialogTitle>
      <DialogContent>
        <Box sx={{ py: 4 }}>
          <Form methods={methods} onSubmit={onSubmit}>
            <Stack direction="column" spacing={2}>
              <Field.Select name="projectId" label="Proje Adı">
                {projects.map((project) => (
                  <MenuItem key={project.id} value={project.id}>
                    {project.name}
                  </MenuItem>
                ))}
              </Field.Select>

              <Field.Select
                name="columnId"
                label="Durum"
                value={selectedColumn}
                onChange={(e) => setSelectedColumn(e.target.value)}
              >
                {columns?.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Field.Select>

              <Field.Text name="parentId" label="Üst görev" sx={{ display: "none" }} />

              <Field.Text name="title" label="Görev Adı" />
              <Field.Editor name="description" label="Açıklama" />
              <Grid2 container spacing={3} alignItems="center">
                <Box sx={{ display: "flex", alignItems: "center", px: 2 }}>
                  <BlockLabel>Önceliklendirme</BlockLabel>
                  <KanbanDetailsPriority
                    priority={priority}
                    onChangePriority={(p) => {
                      setPriority(p);
                      methods.setValue("priority", p);
                    }}
                  />
                </Box>
              </Grid2>
              <Field.DatePicker name="due_date" label="Teslim Tarihi" />

              <ProjectAddContact
                name="assigned_to"
                label="Atanacak Kişiler"
                setValue={methods.setValue}
              />

              <Field.Autocomplete
                multiple
                name="labels"
                label="Etiketler"
                options={["Araştırma", "Tasarım", "Hata"]}
                filterSelectedOptions
                freeSolo
              />

              <Field.Select name="taskPeriod" label="Gorev Tekrar Periyodu">
                <MenuItem value="tekrarlanmaz">Tekrarlanmaz</MenuItem>
                <MenuItem value="daily">Günlük</MenuItem>
                <MenuItem value="weekly">Haftalık</MenuItem>
                <MenuItem value="monthly">Aylık</MenuItem>
              </Field.Select>

              <LoadingButton
                fullWidth
                color="inherit"
                size="large"
                type="submit"
                variant="contained"
                loadingIndicator="Görev oluşturuluyor..."
                loading={isSubmitting}
              >
                Görev Oluştur
              </LoadingButton>
            </Stack>
          </Form>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
