import { Box, Typography } from "@mui/material";
import { themeConfig } from "src/assets/theme";
import { Iconify } from "src/components/iconify";

export function SoruEkle({ onClick, selectedType }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        height: "53px",
        bgcolor: "#919EAB14",
        borderRadius: 1,
        pl: 2,
        px: 2,
        pointerEvents: selectedType ? "auto" : "none",
        cursor: "pointer",
        "&:hover": {
          bgcolor: "primary.lighter",
        },
        mb: 4,
      }}
    >
      <Iconify
        icon="mingcute:add-line"
        sx={{
          color: themeConfig.palette.grey[500],
          opacity: 0.48,
        }}
      />
      <Typography
        sx={{
          fontSize: 15,
          fontWeight: 400,
          color: themeConfig.palette.grey[500],
        }}
      >
        Soru Ekleyiniz.
      </Typography>
    </Box>
  );
}
