import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

// ----------------------------------------------------------------------

export function SignUpTerms({ sx, ...other }) {
  return (
    <Box
      component="span"
      sx={[
        () => ({
          mt: 3,
          display: "block",
          textAlign: "center",
          typography: "caption",
          color: "text.secondary",
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      Kayıt olarak{" "}
      <Link underline="always" color="text.primary">
        Hizmet Koşulları
      </Link>{" "}
      ve{" "}
      <Link underline="always" color="text.primary">
        Gizlilik Politikası
      </Link>
      &apos;nı kabul ediyorum.
    </Box>
  );
}
