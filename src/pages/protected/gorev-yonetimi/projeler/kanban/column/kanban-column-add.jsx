import { useRef } from "react";
import { useBoolean } from "minimal-shared/hooks";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { inputBaseClasses } from "@mui/material/InputBase";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import { Iconify } from "src/components/iconify";

import { createColumn } from "../actions";

// ----------------------------------------------------------------------

export function KanbanColumnAdd({ boardId, id }) {
  const openAddColumn = useBoolean();

  const formRef = useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("new-column-name");
    await createColumn(boardId, name);
    openAddColumn.onFalse();
  }

  function handleReset() {
    formRef.current.reset();
    openAddColumn.onFalse();
  }

  return (
    <>
      <Box
        id={id}
        sx={{
          flex: "0 0 auto",
          width: "var(--column-width)",
        }}
      >
        {openAddColumn.value ? (
          <ClickAwayListener onClickAway={handleReset}>
            <form onSubmit={handleSubmit} onReset={handleReset} ref={formRef}>
              <TextField
                name="new-column-name"
                autoFocus
                fullWidth
                placeholder="Untitled"
                helperText="Press Enter to create the column."
                sx={{ [`& .${inputBaseClasses.input}`]: { typography: "h6" } }}
              />
            </form>
          </ClickAwayListener>
        ) : (
          <Button
            fullWidth
            size="large"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="mingcute:add-line" sx={{ mr: -0.5 }} />}
            onClick={openAddColumn.onTrue}
          >
            Yeni durum
          </Button>
        )}
      </Box>

      <Box sx={{ width: "1px", flexShrink: 0 }} />
    </>
  );
}
