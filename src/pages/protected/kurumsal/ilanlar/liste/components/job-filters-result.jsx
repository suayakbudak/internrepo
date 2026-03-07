import { useCallback } from "react";

import Chip from "@mui/material/Chip";
import { Stack, Box, Typography, Button } from "@mui/material";

import { FiltersBlock } from "src/components/filters-result";
import { Iconify } from "src/components/iconify";

// ----------------------------------------------------------------------

export function JobFiltersResult({ filters, totalResults, sx }) {
  const { state: currentFilters, setState: updateFilters, resetState: resetFilters } = filters;

  const handleRemoveCategories = useCallback(
    (inputValue) => {
      const newValue = currentFilters.categories.filter((item) => item !== inputValue);
      updateFilters({ categories: newValue });
    },
    [updateFilters, currentFilters.categories]
  );

  const handleClearAll = () => {
    resetFilters();
    updateFilters({ categories: [] });
  };

  return (
    <Stack spacing={1.5} sx={{ p: 3, ...sx }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
          <strong> {totalResults} </strong>
          <Box component="span" sx={{ color: "text.secondary", ml: 0.25 }}>
            sonuç bulundu
          </Box>
        </Typography>

        <Button
          color="error"
          onClick={handleClearAll}
          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
        >
          Temizle
        </Button>
      </Box>

      <Stack flexGrow={1} spacing={1} direction="row" flexWrap="wrap" alignItems="center">
        <FiltersBlock label="Kategoriler:" isShow={!!currentFilters.categories.length}>
          {currentFilters.categories.map((item) => (
            <Chip key={item} label={item} onDelete={() => handleRemoveCategories(item)} />
          ))}
        </FiltersBlock>
      </Stack>
    </Stack>
  );
}
