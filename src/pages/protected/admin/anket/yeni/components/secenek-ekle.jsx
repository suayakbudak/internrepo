import { Box, Radio, TextField } from "@mui/material";

export function Secenek({ index, value, onChange }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        width: "664px",
        height: "40px",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        px: 1,
      }}
    >
      <Radio
        disabled
        size="medium"
        sx={{
          color: "text.primary",
          "&.Mui-disabled": {
            color: "text.primary",
          },
        }}
      />
      <TextField
        fullWidth
        value={value || ""}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={`${index + 1}. Seçenek`}
        size="small"
        variant="standard"
        sx={{
          mt: 0.5,
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
            color: "text.primary",
            fontSize: 14,
            lineHeight: "22px",
          },
          "& .MuiInputBase-input::placeholder": {
            color: "text.primary",
            opacity: 1,
          },
        }}
      />
    </Box>
  );
}
