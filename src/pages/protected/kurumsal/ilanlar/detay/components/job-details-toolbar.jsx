import { usePopover } from "minimal-shared/hooks";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { RouterLink } from "src/routes/router-link";
import { Iconify } from "src/components/iconify";
import { primary } from "src/assets/theme";

// ----------------------------------------------------------------------

export function JobDetailsToolbar({
  sx,
  publish,
  backHref,
  editHref,
  liveHref,
  publishOptions,
  onChangePublish,
  ...other
}) {
  const menuActions = usePopover();

  return (
    <Box
      sx={[{ 
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        mb: 0,
        mt: 0,
        position: 'relative',
        top: -5
      }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    >
      <Box sx={{ flexGrow: 1 }} />

      <Tooltip>
        <Button
          component={RouterLink}
          href={editHref}
          variant="contained"
          color="error"
          startIcon={<Iconify icon="solar:pen-bold" />}
          sx={{
            backgroundColor: primary.main,
            '&:hover': {
              backgroundColor: primary.dark,
            }
          }}
        >
          İlanı Düzenle
        </Button>
      </Tooltip>
    </Box>
  );
}