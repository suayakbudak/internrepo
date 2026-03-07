import { Box, Typography, Card, useTheme } from "@mui/material";

import { Olcek } from "src/pages/protected/admin/anket/yeni/components/olcek";

export function PuanOlcegi({ data }) {
  const theme = useTheme();
  const { question, isRequired } = data;

  return (
    <Card
      sx={{
        width: "704px",
        p: 3,
        gap: 6,

        boxShadow: (themeConfig) =>
          `0px 0px 2px rgba(145, 158, 171, 0.2), 0px ${themeConfig.spacing(12)} ${themeConfig.spacing(24)} ${themeConfig.spacing(-4)} rgba(145, 158, 171, 0.12)`,
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.pxToRem(16),
          fontWeight: theme.typography.fontWeightBold,
          lineHeight: 1.5,
          color: "text.primary",
          mb: 4,
        }}
      >
        {question} {isRequired && <span style={{ color: "#FF5630" }}>(*Zorunlu)</span>}
      </Typography>

      <Box>
        <Olcek />
      </Box>
    </Card>
  );
}
