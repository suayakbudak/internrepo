import { varAlpha } from "minimal-shared/utils";

import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";

import { Iconify } from "src/components/iconify";

// ----------------------------------------------------------------------

export function KanbanDetailsPriority({ priority, onChangePriority, sx, ...other }) {
  return (
    <Box
      sx={[
        () => ({ gap: 1, display: "flex", flexWrap: "wrap" }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {[
        { value: "low", label: "Düşük" },
        { value: "medium", label: "Orta" },
        { value: "high", label: "Yüksek" },
      ].map((option) => (
        <ButtonBase
          key={option.value}
          onClick={() => onChangePriority(option.value)}
          sx={(theme) => ({
            py: 0.5,
            pl: 0.75,
            pr: 1.25,
            fontSize: 12,
            borderRadius: 1,
            lineHeight: "20px",
            textTransform: "capitalize",
            fontWeight: "fontWeightBold",
            boxShadow: `inset 0 0 0 1px ${varAlpha(theme.vars.palette.grey["500Channel"], 0.24)}`,
            ...(option.value === priority && {
              boxShadow: `inset 0 0 0 2px ${theme.vars.palette.text.primary}`,
            }),
          })}
        >
          <Iconify
            icon={
              (option.value === "low" && "solar:double-alt-arrow-down-bold-duotone") ||
              (option.value === "medium" && "solar:double-alt-arrow-right-bold-duotone") ||
              "solar:double-alt-arrow-up-bold-duotone"
            }
            sx={{
              mr: 0.5,
              ...(option.value === "low" && { color: "info.main" }),
              ...(option.value === "medium" && { color: "warning.main" }),
              ...(option.value === "high" && { color: "error.main" }),
            }}
          />
          {option.label}{" "}
        </ButtonBase>
      ))}
    </Box>
  );
}

export function KanbanPriorityChip({ option }) {
  return (
    <ButtonBase
      key={option.value}
      disabled
      sx={(theme) => ({
        py: 0.5,
        pl: 0.75,
        pr: 1.25,
        fontSize: 12,
        borderRadius: 1,
        lineHeight: "20px",
        textTransform: "capitalize",
        fontWeight: "fontWeightBold",
        boxShadow: `inset 0 0 0 1px ${varAlpha(theme.vars.palette.grey["500Channel"], 0.24)}`,
      })}
    >
      <Iconify
        icon={
          (option.value === "low" && "solar:double-alt-arrow-down-bold-duotone") ||
          (option.value === "medium" && "solar:double-alt-arrow-right-bold-duotone") ||
          "solar:double-alt-arrow-up-bold-duotone"
        }
        sx={{
          mr: 0.5,
          ...(option.value === "low" && { color: "info.main" }),
          ...(option.value === "medium" && { color: "warning.main" }),
          ...(option.value === "high" && { color: "error.main" }),
        }}
      />

      {option.label}
    </ButtonBase>
  );
}
