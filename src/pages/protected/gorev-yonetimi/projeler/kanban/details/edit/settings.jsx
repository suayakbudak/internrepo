import { Box, Stack, MenuItem, Grid2 } from "@mui/material";
import { styled } from "@mui/material/styles";
import { KanbanDetailsAttachments } from "../kanban-details-attachments";
import { KanbanDetailsPriority } from "../kanban-details-priority";
import { ProjectAddContact } from "../../../root/projects-table-com/add-contact";
import { Field } from "src/components/hook-form";
import { useState } from "react";
import { UserAvatar } from "src/components/user-avatar";

export function TaskSettingsEdit({ task, methods }) {
  const BlockLabel = styled("span")(({ theme }) => ({
    ...theme.typography.caption,
    width: 100,
    flexShrink: 0,
    color: theme.vars.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
  }));

  const [priority, setPriority] = useState("medium");

  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ px: 1, pb: 1 }}>
        <BlockLabel>Raporlayan</BlockLabel>

        <UserAvatar user={task.created_by} />
      </Stack>

      <ProjectAddContact
        name="assigned_to"
        label="Atanacak Kişiler"
        setValue={methods.setValue}
        defaultValue={task.assigned_to}
      />

      <Field.DatePicker name="due_date" label="Teslim Tarihi" />

      <Field.Autocomplete
        multiple
        name="labels"
        label="Etiketler"
        options={["Araştırma", "Tasarım", "Hata"]}
        filterSelectedOptions
        freeSolo
      />

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

      <Field.Select name="taskPeriod" label="Gorev Tekrar Periyodu">
        <MenuItem value="tekrarlanmaz">Tekrarlanmaz</MenuItem>
        <MenuItem value="daily">Günlük</MenuItem>
        <MenuItem value="weekly">Haftalık</MenuItem>
        <MenuItem value="monthly">Aylık</MenuItem>
      </Field.Select>

      {/* <Box sx={{ display: "flex" }}>
        <BlockLabel sx={{ height: 40, lineHeight: "40px" }}>Atanan</BlockLabel>

        <Box sx={{ gap: 1, display: "flex", flexWrap: "wrap" }}>
          {task.assigned_to.map((user) => (
            <Avatar key={user.id} alt={user.firstName} src={user.profilePhoto} />
          ))}

          <Tooltip title="Add assignee">
            <IconButton
              onClick={contactsDialog.onTrue}
              sx={[
                (theme) => ({
                  border: `dashed 1px ${theme.vars.palette.divider}`,
                  bgcolor: varAlpha(theme.vars.palette.grey["500Channel"], 0.08),
                }),
              ]}
            >
              <Iconify icon="mingcute:add-line" />
            </IconButton>
          </Tooltip>

          <KanbanContactsDialog
            assignee={task.assigned_to}
            open={contactsDialog.value}
            onClose={contactsDialog.onFalse}
          />
        </Box>
      </Box> 
      
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <BlockLabel>Teslim Tarihi</BlockLabel>
        <time dateTime={task.due_date}>{fDate(task.due_date)}</time>
      </Box>

      <Box sx={{ display: "flex" }}>
        <BlockLabel sx={{ height: 24, lineHeight: "24px" }}>Etiket</BlockLabel>

        {!!task.labels.length && (
          <Box sx={{ gap: 1, display: "flex", flexWrap: "wrap" }}>
            {task.labels.map((label) => (
              <Chip key={label.id} color="info" label={label.name} size="small" variant="soft" />
            ))}
          </Box>
        )}
      </Box> 

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <BlockLabel>Önceliklendirme</BlockLabel>
        <KanbanPriorityChip
          option={{
            value: task.priority,
            label: {
              low: "Düşük",
              medium: "Orta",
              high: "Yüksek",
            }[task.priority],
          }}
        />
      </Box> */}

      <KanbanDetailsAttachments attachments={task.attachments} showUpload={0} />
    </Stack>
  );
}
