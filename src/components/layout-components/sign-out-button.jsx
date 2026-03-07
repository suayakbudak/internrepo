import { useCallback } from "react";

import { useRouter } from "src/routes/hooks";

import { toast } from "src/components/snackbar";

import { signOut } from "src/lib/actions/auth";
import { useAuthContext } from "src/context/auth-context";
import { IconButton } from "@mui/material";
import { Iconify } from "../iconify";

// ----------------------------------------------------------------------

export function SignOutButton({ onClose, sx, ...other }) {
  const router = useRouter();

  const { checkUserSession } = useAuthContext();

  const handleLogout = useCallback(async () => {
    try {
      await signOut();
      await checkUserSession?.();

      onClose?.();
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Unable to logout!");
    }
  }, [checkUserSession, onClose, router]);

  return (
    <IconButton color="error" onClick={handleLogout} size="large" {...other}>
      <Iconify
        icon="majesticons:logout"
        sx={{
          height: 24,
          width: 24,
          opacity: 0.7,
          color: (t) => t.palette.error.main,
          ...sx,
        }}
      />
    </IconButton>
  );
}
