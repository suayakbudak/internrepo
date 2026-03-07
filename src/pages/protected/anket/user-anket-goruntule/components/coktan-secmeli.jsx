import {
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  useTheme,
  Card,
  Box,
} from "@mui/material";
import { Iconify } from "src/components/iconify";

export function CoktanSecmeli({ data }) {
  const theme = useTheme();
  const { question, options, isRequired, helperText } = data;

  return (
    <Card
      sx={{
        width: "704px",
        p: 3,

        boxShadow: (themeConfig) =>
          `0px 0px 2px rgba(145, 158, 171, 0.2), 0px ${themeConfig.spacing(12)} ${themeConfig.spacing(24)} ${themeConfig.spacing(-4)} rgba(145, 158, 171, 0.12)`,
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          gap: "10px",
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.pxToRem(16),
          fontWeight: theme.typography.fontWeightBold,
          lineHeight: theme.typography.pxToRem(24),
          color: "text.primary",
          mb: 3,
        }}
      >
        {question} {isRequired && <span style={{ color: "#E30917" }}>(*Zorunlu)</span>}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <RadioGroup sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {options.map((option) => (
            <FormControlLabel
              key={option}
              value={option}
              control={
                <Radio
                  sx={{
                    color: "text.secondary",
                    "&.Mui-checked": {
                      color: "primary.main",
                    },
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    fontFamily: theme.typography.fontFamily,
                    fontSize: theme.typography.pxToRem(14),
                    fontWeight: theme.typography.fontWeightRegular,
                    lineHeight: theme.typography.pxToRem(22),
                    color: "text.primary",
                  }}
                >
                  {option}
                </Typography>
              }
            />
          ))}
        </RadioGroup>
        <Box sx={{ display: "flex", alignItems: "center", gap: "4px", pt: 1 }}>
          <Iconify
            icon="solar:danger-triangle-bold"
            sx={{
              color: "#FF5630",
              width: 16,
              height: 16,
              stroke: "#FFFFFF",
            }}
          />
          <Typography
            sx={{
              color: "#FF5630",
              fontSize: theme.typography.pxToRem(12),
              fontWeight: theme.typography.fontWeightRegular,
              lineHeight: theme.typography.pxToRem(18),
              fontFamily: theme.typography.fontFamily,
            }}
          >
            {helperText}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
