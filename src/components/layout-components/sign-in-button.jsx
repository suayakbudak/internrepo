import Button from "@mui/material/Button";

import { RouterLink } from "src/routes/router-link";

import { useAuthContext } from "src/context/auth-context";
import { CONFIG } from "src/global-config";

// ----------------------------------------------------------------------

export function SignInButton({ sx, ...other }) {
  const { authenticated } = useAuthContext();
  return (
    <Button
      component={RouterLink}
      href={CONFIG.auth.redirectPath}
      variant="outlined"
      sx={sx}
      {...other}
    >
      {authenticated ? "Ana Sayfa" : "Giriş Yap"}
    </Button>
  );
}
