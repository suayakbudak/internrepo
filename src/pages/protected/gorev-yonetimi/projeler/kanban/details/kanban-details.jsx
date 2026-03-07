import { Dialog, Grid2, Stack, Tab, Box, Card, CardContent } from "@mui/material";
import { useTabs } from "minimal-shared/hooks";
import { CustomTabs } from "src/components/custom-tabs";
import { TaskOverview } from "./display/overview";
import { TaskSubTasks } from "./display/subtasks";
import { KanbanDetailsToolbar } from "./kanban-details-toolbar";
import { Gecmis } from "./display/history";
import { Yorumlar } from "./display/comments";
import { TaskSettings } from "./display/settings";
import { useState } from "react";
import { TaskOverviewEdit } from "./edit/overview";
import { Form } from "src/components/hook-form";
import { updateTask } from "../actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z as zod } from "zod";
import { TaskSettingsEdit } from "./edit/settings";

const TaskDetailsEditFormSchema = zod.object({
  title: zod.string().min(1, "Görev adı zorunludur"),
  description: zod.string().optional(),
  assigned_to: zod.array(zod.string()).optional(),
  labels: zod.array(zod.string()).optional(),
  due_date: zod.coerce.date(),
  priority: zod.enum(["low", "medium", "high"]),
  taskPeriod: zod
    .enum(["tekrarlanmaz", "daily", "weekly", "monthly"])
    .transform((value) => (value === "tekrarlanmaz" ? null : value)),
  attachments: zod.array(zod.string()).optional(),
});

export function KanbanDetailsDialog({ task, open, onClose, boardId }) {
  const { value: tab, onChange: onTabChange } = useTabs("yorumlar");

  const [isEditing, setIsEditing] = useState(false);

  const methods = useForm({
    resolver: zodResolver(TaskDetailsEditFormSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      assigned_to: task.assigned_to,
      labels: task.labels,
      priority: task.priority,
      due_date: task.due_date,
      taskPeriod: task.taskPeriod,
      attachments: task.attachments,
    },
  });

  const onSubmit = methods.handleSubmit(async (data) => {
    if (!isEditing) return;
    try {
      const changedValues = Object.keys(data).reduce((acc, key) => {
        if (data[key] !== task[key]) {
          acc[key] = data[key];
        }
        return acc;
      }, {});

      updateTask(boardId, task.id, changedValues);
      setIsEditing(false);
    } catch (e) {
      console.error(e);
    }
  });

  if (!task) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" PaperProps={{ sx: { width: 1 } }}>
      <KanbanDetailsToolbar
        task={task}
        onCloseDetails={onClose}
        onClickEdit={() => setIsEditing(true)}
      />

      <Form methods={methods} onSubmit={onSubmit}>
        <Grid2 container spacing={3} sx={{ px: 3 }}>
          <Grid2 item size={8}>
            <Stack direction="column" spacing={3} sx={{ width: "100%", py: 3 }}>
              {isEditing ? (
                <TaskOverviewEdit
                  boardId={boardId}
                  task={task}
                  closeDialog={() => setIsEditing(false)}
                  isSubmitting={methods.formState.isSubmitting}
                />
              ) : (
                <>
                  <TaskOverview task={task} />
                  <Card
                    sx={{
                      bgcolor: "background.neutral",
                    }}
                  >
                    <CustomTabs
                      value={tab}
                      onChange={onTabChange}
                      variant="fullWidth"
                      slotProps={{ tab: { px: 0 } }}
                    >
                      {[
                        { value: "yorumlar", label: "Yorumlar" },
                        { value: "gecmis", label: "Geçmiş" },
                      ].map((t) => (
                        <Tab key={t.value} value={t.value} label={t.label} />
                      ))}
                    </CustomTabs>
                    <CardContent sx={{ p: 2 }}>
                      {tab === "yorumlar" && <Yorumlar taskId={task.id} />}
                      {tab === "gecmis" && <Gecmis taskId={task.id} />}
                    </CardContent>
                  </Card>
                </>
              )}
            </Stack>
          </Grid2>
          <Grid2 item size={4}>
            <Box
              sx={{
                gap: 3,
                display: "flex",
                flexDirection: "column",
                pl: 4,
                py: 3,
                borderLeft: (theme) => `solid 1px ${theme.vars.palette.divider}`,
              }}
            >
              {isEditing ? (
                <TaskSettingsEdit methods={methods} task={task} />
              ) : (
                <TaskSettings task={task} />
              )}

              <TaskSubTasks parentTask={task} boardId={boardId} />
            </Box>
          </Grid2>
        </Grid2>
      </Form>
    </Dialog>
  );
}
