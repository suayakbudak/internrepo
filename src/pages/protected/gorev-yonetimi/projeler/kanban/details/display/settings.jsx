import { Box, Avatar, Chip, IconButton, Stack, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useBoolean } from "minimal-shared/hooks";
import { varAlpha } from "minimal-shared/utils";
import { Iconify } from "src/components/iconify";
import { KanbanContactsDialog } from "../../components/kanban-contacts-dialog";
import { KanbanDetailsAttachments } from "../kanban-details-attachments";
import { KanbanPriorityChip } from "../kanban-details-priority";
import { fDate } from "src/utils/format-time";

export function TaskSettings({ task }) {
  const contactsDialog = useBoolean();

  const BlockLabel = styled("span")(({ theme }) => ({
    ...theme.typography.caption,
    width: 100,
    flexShrink: 0,
    color: theme.vars.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
  }));

  return (
    <Stack spacing={2}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <BlockLabel>Durum</BlockLabel>
        <Chip size="small" variant="outlined" sx={{ px: 1, py: 0.8 }} label={task.column.name} />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <BlockLabel>Raporlayan</BlockLabel>
        <Avatar alt={task.created_by.firstName} src={task.created_by.profilePhoto} />
      </Box>

      <Box sx={{ display: "flex" }}>
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
      </Box>

      <KanbanDetailsAttachments attachments={task.attachments} showUpload={0} />
    </Stack>
  );
}
