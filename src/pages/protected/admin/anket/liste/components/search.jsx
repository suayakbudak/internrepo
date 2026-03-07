import { TextField, InputAdornment } from "@mui/material";
import { Iconify } from "src/components/iconify";

export function Search({ value, onChange, sx }) {
  return (
    <TextField
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Ara..."
      sx={sx}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Iconify icon="eva:search-fill" sx={{ color: "text.disabled" }} />
          </InputAdornment>
        ),
      }}
    />
  );
}
