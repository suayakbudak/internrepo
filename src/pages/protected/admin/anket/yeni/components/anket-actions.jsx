import { Box, IconButton, Switch, Typography } from "@mui/material";
import { Iconify } from "src/components/iconify";

export function AnketActions({ onDelete }) {
  return (
    <Box
      sx={{
        gap: 3,
        mb: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          justifyContent: "flex-end",
          mb: 1,
        }}
      >
        <IconButton sx={{ color: "primary.main" }}>
          <Iconify icon="solar:copy-bold" width={24} />
        </IconButton>
        <IconButton sx={{ color: "primary.main" }}>
          <Iconify icon="solar:trash-bin-trash-bold" width={24} onClick={onDelete} />
        </IconButton>

        <Box sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
          <Typography sx={{ fontSize: 12, color: "text.primary", gap: "0px", fontWeight: 700 }}>
            Zorunlu
          </Typography>
          <Switch sx={{ marginRight: "-12px" }} />
        </Box>
      </Box>
      {/* <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: "10px",
            }}>
                <Button
                    variant="contained"
                    size="medium"
                    sx={{
                        bgcolor: 'primary.main',
                        color: 'common.white',
                        '&:hover': {
                            bgcolor: 'primary.dark',
                        }
                    }}
                >
                    Kaydet
                </Button>
            </Box> */}
    </Box>
  );
}
