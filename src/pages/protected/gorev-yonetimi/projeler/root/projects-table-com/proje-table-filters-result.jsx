import { Chip } from "@mui/material";
import { useCallback } from "react";
import { chipProps, FiltersBlock, FiltersResult } from "src/components/filters-result";
import { getStatusName } from "../../utils";

/**
 * @component ProjeTableFiltersResult
 * @description Filter result component for project table
 * @param {object} filters - filters state
 * @param {function} onResetPage - callback function to reset page
 * @param {number} totalResults - total results count
 * @param {object} sx - custom css styles
 * @returns {ReactElement} Filter result component
 */
export function ProjeTableFiltersResult({ filters, onResetPage, totalResults, sx }) {
  const { state: currentFilters, setState: updateFilters, resetState: resetFilters } = filters;

  /**
   * @function handleRemoveKeyword
   * @description callback function to remove keyword filter
   */
  const handleRemoveKeyword = useCallback(() => {
    onResetPage();
    updateFilters({ name: "" });
  }, [onResetPage, updateFilters]);

  /**
   * @function handleRemoveStatus
   * @description callback function to remove status filter
   */
  const handleRemoveStatus = useCallback(() => {
    onResetPage();
    updateFilters({ status: "all" });
  }, [onResetPage, updateFilters]);

  /**
   * @function handleRemoveRole
   * @description callback function to remove role filter
   * @param {string} inputValue - role value to remove
   */
  const handleRemoveRole = useCallback(
    (inputValue) => {
      const newValue = currentFilters.role.filter((item) => item !== inputValue);

      onResetPage();
      updateFilters({ role: newValue });
    },
    [onResetPage, updateFilters, currentFilters.role]
  );

  /**
   * @function handleReset
   * @description callback function to reset all filters
   */
  const handleReset = useCallback(() => {
    onResetPage();
    resetFilters();
  }, [onResetPage, resetFilters]);

  return (
    <FiltersResult totalResults={totalResults} onReset={handleReset} sx={sx}>
      <FiltersBlock label="Durum:" isShow={currentFilters.status !== "all"}>
        <Chip
          {...chipProps}
          label={getStatusName(currentFilters.status)}
          onDelete={handleRemoveStatus}
          sx={{ textTransform: "capitalize" }}
        />
      </FiltersBlock>

      <FiltersBlock label="Role:" isShow={!!currentFilters.role.length}>
        {currentFilters.role.map((item) => (
          <Chip {...chipProps} key={item} label={item} onDelete={() => handleRemoveRole(item)} />
        ))}
      </FiltersBlock>

      <FiltersBlock label="Keyword:" isShow={!!currentFilters.name}>
        <Chip {...chipProps} label={currentFilters.name} onDelete={handleRemoveKeyword} />
      </FiltersBlock>
    </FiltersResult>
  );
}
