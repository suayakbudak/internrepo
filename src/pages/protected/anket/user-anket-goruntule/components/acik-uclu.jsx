import { Typography, TextField, useTheme, Card } from "@mui/material";

export function AcikUclu({ data }) {
  const theme = useTheme();
  const { question, isRequired, placeholder } = data;

  return (
    <Card
      sx={{
        width: "704px",
        p: 3,
        gap: 3,
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
          lineHeight: 1.5,
          color: "text.primary",
          mb: 4,
        }}
      >
        {question} {isRequired && <span style={{ color: "#FF5630" }}>(*Zorunlu)</span>}
      </Typography>

      <TextField
        fullWidth
        multiline
        rows={5}
        placeholder={placeholder}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            backgroundColor: "#F9F9F9",
            "& fieldset": {
              borderColor: "#919EAB33",
              borderWidth: "1px",
            },
            "&:hover fieldset": {
              borderColor: "#919EAB33",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#919EAB",
            },
          },
          "& .MuiInputBase-input": {
            color: "#637381",
            fontSize: theme.typography.pxToRem(14),
            fontFamily: theme.typography.fontFamily,
            fontWeight: theme.typography.fontWeightRegular,
            lineHeight: 1.5,
            "&::placeholder": {
              color: "#919EAB",
              opacity: 1,
            },
          },
        }}
      />
    </Card>
  );
}
