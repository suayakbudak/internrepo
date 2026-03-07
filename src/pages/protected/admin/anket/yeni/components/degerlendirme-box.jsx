import { Box, TextField } from "@mui/material";
import { themeConfig } from "src/assets/theme";

export function DegerlendirmeBox() {
  return (
    <Box
      sx={{
        width: "664px",
        height: "144px",
        bgcolor: "#919EAB14",
        borderRadius: 1,
        border: "1px solid",
        borderColor: "#919EAB33",
        mb: 2,
      }}
    >
      <TextField
        fullWidth
        multiline
        rows={5}
        placeholder="Değerlendirmenizi yazınız..."
        variant="standard"
        sx={{
          "& .MuiInputBase-root": {
            padding: 2,
          },
          "& .MuiInput-root:before": {
            borderBottom: "none",
          },
          "& .MuiInput-root:hover:not(.Mui-disabled):before": {
            borderBottom: "none",
          },
          "& .MuiInput-root:after": {
            borderBottom: "none",
          },
          "& .MuiInputBase-input": {
            color: themeConfig.palette.grey[500],
            fontSize: 14,
            lineHeight: "22px",
          },
          "& .MuiInputBase-input::placeholder": {
            color: themeConfig.palette.grey[500],
            opacity: 1,
          },
        }}
      />
    </Box>
  );
}
