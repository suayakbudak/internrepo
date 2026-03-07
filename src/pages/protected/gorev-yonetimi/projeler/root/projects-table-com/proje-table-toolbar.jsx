import { useCallback } from "react";
import { usePopover } from "minimal-shared/hooks";

import Box from "@mui/material/Box";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import { Iconify } from "src/components/iconify";
import { CustomPopover } from "src/components/custom-popover";

export function ProjeTableToolbar({ filters, onResetPage }) {
  const menuActions = usePopover();

  const { state: currentFilters, setState: updateFilters } = filters;

  const handleFilterName = useCallback(
    (event) => {
      onResetPage();
      updateFilters({ name: event.target.value });
    },
    [onResetPage, updateFilters]
  );

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{ arrow: { placement: "right-top" } }}
    >
      <MenuList>
        <MenuItem onClick={() => menuActions.onClose()}>
          <Iconify icon="solar:printer-minimalistic-bold" />
          Print
        </MenuItem>

        <MenuItem onClick={() => menuActions.onClose()}>
          <Iconify icon="solar:import-bold" />
          Import
        </MenuItem>

        <MenuItem onClick={() => menuActions.onClose()}>
          <Iconify icon="solar:export-bold" />
          Export
        </MenuItem>
      </MenuList>
    </CustomPopover>
  );

  return (
    <>
      <Box
        sx={{
          p: 2.5,
          gap: 2,
          display: "flex",
          pr: { xs: 2.5, md: 1 },
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-end", md: "center" },
        }}
      >
        <TextField
          fullWidth
          value={currentFilters.name}
          onChange={handleFilterName}
          placeholder="Proje ara"
          slotProps={{
            input: {
              sx: { height: 40 },
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: "text.disabled" }} />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      {renderMenuActions()}
    </>
  );
}
