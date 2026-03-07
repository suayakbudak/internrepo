import { Box, Typography } from "@mui/material";
import { themeConfig } from "src/assets/theme";

export function SoruHeader({ soruNumarasi = 1 }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "36px",
        display: "flex",
        justifyContent: "flex-start",
        gap: "10px",
        borderBottom: `1px solid ${themeConfig.palette.common.black}`,
        bgcolor: "#F7F8F9",
        alignItems: "center",
        mb: 1,
        px: 2,
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          color: themeConfig.palette.warning.contrastText,
          fontSize: 16,
          lineHeight: "36px",
        }}
      >
        {`${soruNumarasi}. Soru`}
      </Typography>
    </Box>
  );
}
