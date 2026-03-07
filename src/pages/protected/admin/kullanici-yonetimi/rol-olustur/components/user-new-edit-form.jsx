import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import LoadingButton from "@mui/lab/LoadingButton";
import { TextField } from "@mui/material";

// ----------------------------------------------------------------------

export function UserNewEditForm() {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <Card sx={{ p: 3 }}>
          <Box
            sx={{
              rowGap: 3,
              columnGap: 2,
              display: "grid",
              gridTemplateColumns: { xs: "repeat(1, 1fr)", sm: "repeat(2, 1fr)" },
            }}
          >
            <TextField name="company" label="Başkanlık" />
            <TextField name="role" label="Rol" />
          </Box>

          <Stack sx={{ mt: 3, alignItems: "flex-end" }}>
            <LoadingButton type="submit" variant="contained">
              Rol Oluştur
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}
