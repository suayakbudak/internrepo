import { useCallback } from "react";
import { Chip } from "@mui/material";
import { chipProps, FiltersBlock, FiltersResult } from "src/components/filters-result";

export function AnketTableFiltersResult({ filters, onResetPage, totalResults, sx }) {
  const { state: currentFilters, setState: updateFilters, resetState: resetFilters } = filters;

  const handleRemoveKeyword = useCallback(() => {
    onResetPage();
    updateFilters({ name: "" });
  }, [onResetPage, updateFilters]);

  const handleRemoveStatus = useCallback(() => {
    onResetPage();
    updateFilters({ status: "all" });
  }, [onResetPage, updateFilters]);

  const handleReset = useCallback(() => {
    onResetPage();
    resetFilters();
  }, [onResetPage, resetFilters]);

  return (
    <FiltersResult totalResults={totalResults} onReset={handleReset} sx={sx}>
      <FiltersBlock label="Durum:" isShow={currentFilters.status !== "all"}>
        <Chip
          {...chipProps}
          label={currentFilters.status === "published" ? "Aktif" : "Pasif"}
          onDelete={handleRemoveStatus}
          sx={{ textTransform: "capitalize" }}
        />
      </FiltersBlock>

      <FiltersBlock label="Anahtar kelime:" isShow={!!currentFilters.name}>
        <Chip {...chipProps} label={currentFilters.name} onDelete={handleRemoveKeyword} />
      </FiltersBlock>
    </FiltersResult>
  );
}
