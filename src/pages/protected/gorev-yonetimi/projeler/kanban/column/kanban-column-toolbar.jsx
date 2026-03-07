import { varAlpha } from "minimal-shared/utils";
import { useBoolean, usePopover } from "minimal-shared/hooks";
import { useId, useRef, useEffect } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";

import { Label } from "src/components/label";
import { Iconify } from "src/components/iconify";
import { ConfirmDialog } from "src/components/custom-dialog";
import { CustomPopover } from "src/components/custom-popover";

import { KanbanInputName } from "../components/kanban-input-name";
import { deleteColumn, updateColumnTitle } from "../actions";
import { NewTaskDialog } from "../new-task-dialog";

// ----------------------------------------------------------------------

export function KanbanColumnToolBar({
  columnName,
  boardId,
  columnId,
  totalTasks,
  handleProps,
  projectId,
}) {
  const inputId = useId();
  const renameRef = useRef(null);
  const menuActions = usePopover();
  const confirmDialog = useBoolean();
  const newTaskDialog = useBoolean();

  useEffect(() => {
    if (menuActions.open) {
      if (renameRef.current) {
        renameRef.current.focus();
      }
    }
  }, [menuActions.open]);

  function handleNameSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const newColumnName = data.get("new-column-name");
    updateColumnTitle(boardId, columnId, newColumnName);
    if (renameRef.current) {
      renameRef.current.blur();
    }
    menuActions.onClose();
  }

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Label
          sx={[
            (theme) => ({
              borderRadius: "50%",
              borderColor: varAlpha(theme.vars.palette.grey["500Channel"], 0.24),
            }),
          ]}
        >
          {totalTasks}
        </Label>

        <form onSubmit={handleNameSubmit}>
          <KanbanInputName
            name="new-column-name"
            defaultValue={columnName}
            inputRef={renameRef}
            placeholder="Column name"
            inputProps={{ id: `${columnName}-${inputId}-column-input` }}
            sx={{ mx: 1 }}
          />
        </form>

        <IconButton size="small" color="inherit" onClick={newTaskDialog.onTrue}>
          <Iconify icon="solar:add-circle-bold" />
        </IconButton>

        <IconButton
          size="small"
          color={menuActions.open ? "inherit" : "default"}
          onClick={menuActions.onOpen}
        >
          <Iconify icon="solar:menu-dots-bold-duotone" />
        </IconButton>

        <IconButton size="small" {...handleProps}>
          <Iconify icon="nimbus:drag-dots" />
        </IconButton>
      </Box>

      <MenuActions menuActions={menuActions} confirmDialog={confirmDialog} />
      <DeleteConfirmDialog confirmDialog={confirmDialog} boardId={boardId} columnId={columnId} />
      <NewTaskDialog
        open={newTaskDialog.value}
        onClose={newTaskDialog.onFalse}
        defaultColumnId={columnId}
        boardId={boardId}
        defaultProjectId={projectId}
      />
    </>
  );
}

function MenuActions({ menuActions, confirmDialog }) {
  return (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
    >
      <MenuList>
        <MenuItem onClick={menuActions.onClose}>
          <Iconify icon="solar:pen-bold" />
          İsim Düzenle
        </MenuItem>

        <MenuItem
          onClick={() => {
            confirmDialog.onTrue();
            menuActions.onClose();
          }}
          sx={{ color: "error.main" }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Sil
        </MenuItem>
      </MenuList>
    </CustomPopover>
  );
}

function DeleteConfirmDialog({ confirmDialog, columnId, boardId }) {
  function handleDeleteColumn() {
    deleteColumn(boardId, columnId);
    confirmDialog.onFalse();
  }

  return (
    <ConfirmDialog
      open={confirmDialog.value}
      onClose={confirmDialog.onFalse}
      title="Durumu Sil"
      content={
        <>
          Durumu silmek istediğinizden emin misiniz?
          <Box sx={{ typography: "caption", color: "error.main", mt: 2 }}>
            <strong> NOT: </strong> Bu kategoriye ait tüm görevler de silinecektir.
          </Box>
        </>
      }
      action={
        <Button variant="contained" color="error" onClick={handleDeleteColumn}>
          Sil
        </Button>
      }
    />
  );
}
