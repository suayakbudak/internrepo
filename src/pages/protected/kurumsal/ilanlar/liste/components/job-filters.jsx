import { useCallback } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import { Iconify } from "src/components/iconify";
import { Scrollbar } from "src/components/scrollbar";

// ----------------------------------------------------------------------

export function JobFilters({ open, canReset, onOpen, onClose, filters, categories }) {
  const { state: currentFilters, setState: updateFilters, resetState: resetFilters } = filters;

  const handleFilterEmploymentTypes = useCallback(
    (newValue) => {
      const checked = currentFilters.employmentTypes.includes(newValue)
        ? currentFilters.employmentTypes.filter((value) => value !== newValue)
        : [...currentFilters.employmentTypes, newValue];

      updateFilters({ employmentTypes: checked });
    },
    [updateFilters, currentFilters.employmentTypes]
  );

  const handleFilterExperience = useCallback(
    (newValue) => {
      updateFilters({ experience: newValue });
    },
    [updateFilters]
  );

  const handleFilterRoles = useCallback(
    (newValue) => {
      updateFilters({ roles: newValue });
    },
    [updateFilters]
  );

  const handleFilterCategories = useCallback(
    (newValue) => {
      updateFilters({ categories: newValue ? [newValue] : [] });
    },
    [updateFilters]
  );

  const handleFilterLocations = useCallback(
    (newValue) => {
      updateFilters({ locations: newValue });
    },
    [updateFilters]
  );

  const handleFilterBenefits = useCallback(
    (newValue) => {
      const checked = currentFilters.benefits.includes(newValue)
        ? currentFilters.benefits.filter((value) => value !== newValue)
        : [...currentFilters.benefits, newValue];

      updateFilters({ benefits: checked });
    },
    [updateFilters, currentFilters.benefits]
  );

  const renderHead = () => (
    <>
      <Box
        sx={{
          py: 2,
          pr: 1,
          pl: 2.5,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Filtrele
        </Typography>

        <Tooltip title="Reset">
          <IconButton onClick={() => resetFilters()}>
            <Badge color="error" variant="dot" invisible={!canReset}>
              <Iconify icon="solar:restart-bold" />
            </Badge>
          </IconButton>
        </Tooltip>

        <IconButton onClick={onClose}>
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      </Box>

      <Divider sx={{ borderStyle: "dashed" }} />
    </>
  );
  const renderCategories = () => (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
        Kategoriler
      </Typography>
      <Autocomplete
        disableCloseOnSelect
        options={Array.isArray(categories) ? categories.map((category) => category.name) : []}
        getOptionLabel={(option) => option}
        value={currentFilters?.categories[0] || null}
        onChange={(event, newValue) => handleFilterCategories(newValue)}
        renderInput={(params) => (
          <TextField 
            placeholder={currentFilters?.categories[0] ? "Kategori seçildi" : "Kategori seç"} 
            {...params} 
          />
        )}
        renderOption={(props, option) => (
          <li 
            {...props} 
            key={option}
            style={{
              opacity: currentFilters?.categories[0] && currentFilters?.categories[0] !== option ? 0.5 : 1,
              pointerEvents: currentFilters?.categories[0] && currentFilters?.categories[0] !== option ? 'none' : 'auto',
              cursor: currentFilters?.categories[0] && currentFilters?.categories[0] !== option ? 'not-allowed' : 'pointer',
            }}
          >
            {option}
          </li>
        )}
        disabled={false}
        clearOnBlur={false}
        clearOnEscape
        handleHomeEndKeys
      />
    </Box>
  );

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={
          <Badge color="error" variant="dot" invisible={!canReset}>
            <Iconify icon="ic:round-filter-list" />
          </Badge>
        }
        onClick={onOpen}
      >
        Filtrele
      </Button>

      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        slotProps={{ backdrop: { invisible: true } }}
        PaperProps={{ sx: { width: 320 } }}
      >
        {renderHead()}

        <Scrollbar sx={{ px: 2.5, py: 3 }}>
          <Stack spacing={3}>
            {renderCategories()}
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}

