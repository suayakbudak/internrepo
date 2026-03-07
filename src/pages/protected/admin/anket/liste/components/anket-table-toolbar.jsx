import { Box, TextField, InputAdornment } from "@mui/material";
import { Iconify } from "src/components/iconify";
import { FilterMenu } from "./filter-menu";

export function AnketTableToolbar({ filters, onResetPage, onSort }) {
  const { state: currentFilters, setState: updateFilters } = filters;

  const handleFilterName = (event) => {
    onResetPage();
    updateFilters({ name: event.target.value });
  };

  return (
    <Box
      sx={{
        p: 2.5,
        gap: 2,
        display: "flex",
        pr: { xs: 2.5, md: 1 },
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "flex-end", md: "center" },
        justifyContent: "space-between",
      }}
    >
      <TextField
        value={currentFilters.name}
        onChange={handleFilterName}
        placeholder="Anket ara..."
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: "text.disabled" }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{ width: { xs: 1, md: 260 } }}
      />

      <FilterMenu onSort={onSort} />
    </Box>
  );
}
