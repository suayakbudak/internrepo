import { useBoolean, usePopover } from "minimal-shared/hooks";
import { useCallback, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import useMediaQuery from "@mui/material/useMediaQuery";

import { toast } from "sonner";
import { ConfirmDialog } from "src/components/custom-dialog";
import { CustomPopover } from "src/components/custom-popover";
import { Iconify } from "src/components/iconify";
import { deleteTask } from "src/lib/actions/kanban";
import { Typography } from "@mui/material";

// ----------------------------------------------------------------------

export function KanbanDetailsToolbar({ sx, task, onCloseDetails, onClickEdit, ...other }) {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  const menuActions = usePopover();
  const confirmDialog = useBoolean();
  const morePopover = usePopover();

  const [status, setStatus] = useState(task.column.name);

  const handleChangeStatus = useCallback(
    (newValue) => {
      menuActions.onClose();
      setStatus(newValue);
    },
    [menuActions]
  );

  const onDeleteTask = useCallback(async () => {
    try {
      deleteTask(task.column.id, task.id);
      toast.success("Delete success!", { position: "top-center" });
    } catch (error) {
      console.error(error);
    }
  }, [task.column.id, task.id]);

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{ arrow: { placement: "top-right" } }}
    >
      <MenuList>
        {["To do", "In progress", "Ready to test", "Done"].map((option) => (
          <MenuItem
            key={option}
            selected={status === option}
            onClick={() => handleChangeStatus(option)}
          >
            {option}
          </MenuItem>
        ))}
      </MenuList>
    </CustomPopover>
  );

  const renderConfirmDialog = () => (
    <ConfirmDialog
      open={confirmDialog.value}
      onClose={confirmDialog.onFalse}
      title="Delete"
      content={
        <>
          Are you sure want to delete <strong> {task.title} </strong>?
        </>
      }
      action={
        <Button variant="contained" color="error" onClick={onDeleteTask}>
          Delete
        </Button>
      }
    />
  );

  function MorePopover() {
    return (
      <CustomPopover
        open={morePopover.open}
        anchorEl={morePopover.anchorEl}
        onClose={morePopover.onClose}
        slotProps={{ arrow: { placement: "top-right" } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              onClickEdit();
              morePopover.onClose();
            }}
          >
            Düzenle
          </MenuItem>
        </MenuList>
      </CustomPopover>
    );
  }

  return (
    <>
      <Box
        sx={[
          {
            display: "flex",
            alignItems: "center",
            p: theme.spacing(2.5, 1, 2.5, 2.5),
            borderBottom: `solid 1px ${theme.vars.palette.divider}`,
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        {!smUp && (
          <Tooltip title="Back">
            <IconButton onClick={onCloseDetails} sx={{ mr: 1 }}>
              <Iconify icon="eva:arrow-ios-back-fill" />
            </IconButton>
          </Tooltip>
        )}

        {/* <Button
          size="small"
          variant="soft"
          endIcon={<Iconify icon="eva:arrow-ios-downward-fill" width={16} sx={{ ml: -0.5 }} />}
          onClick={menuActions.onOpen}
        >
          {status}
        </Button> */}

        <Box
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            py: 0.8,
            px: 1.6,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ pr: 1 }}>
            Görev Kodu
          </Typography>
          <Typography component="span" variant="body2">
            {task.taskCode}
          </Typography>
        </Box>

        <Box component="span" sx={{ flexGrow: 1 }} />

        <Box sx={{ display: "flex" }}>
          {/* <Tooltip title="Görevi sil">
            <IconButton onClick={confirmDialog.onTrue}>
              <Iconify icon="solar:trash-bin-trash-bold" />
            </IconButton>
          </Tooltip> */}

          <Tooltip title="Daha fazla">
            <IconButton onClick={morePopover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Detaylar diyalogunu kapat">
            <IconButton onClick={onCloseDetails}>
              <Iconify icon="lucide:x" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {renderMenuActions()}
      {renderConfirmDialog()}
      <MorePopover />
    </>
  );
}
