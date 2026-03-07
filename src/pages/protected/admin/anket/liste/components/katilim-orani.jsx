import { Box, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

export function KatilimOrani({ participation, status }) {
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <Box sx={{}}>
        <Box
          sx={{
            width: 71,
            height: 4,
            borderRadius: 1,
            bgcolor: (theme) =>
              alpha(
                status === "published" ? theme.palette.success.main : theme.palette.error.main,
                0.16
              ),
          }}
        >
          <Box
            sx={{
              width: `${participation}%`,
              height: "100%",
              borderRadius: 1,
              bgcolor: (theme) =>
                status === "published" ? theme.palette.success.main : theme.palette.error.main,
            }}
          />
        </Box>
      </Box>

      <Typography
        variant="subtitle2"
        sx={{
          color: (theme) => theme.palette.text.secondary,
          fontSize: 12,
          fontWeight: 400,
        }}
      >
        {participation}%
      </Typography>
    </Stack>
  );
}
