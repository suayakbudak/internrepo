import { Box, Stack, Typography } from "@mui/material";

export function TaskOverview({ task }) {
  return (
    <Stack direction="column" spacing={2}>
      {/* <Box
        sx={{
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          py: 1,
          px: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ pr: 1 }}>
          Görev Kodu
        </Typography>
        <Typography component="span" variant="body1">
          {task.taskCode}
        </Typography>
      </Box> */}

      <Box
        sx={{
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          py: 1,
          px: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ pr: 1 }}>
          Görev Adı
        </Typography>
        <Typography component="span" variant="body1">
          {task.title}
        </Typography>
      </Box>

      <Box
        sx={{
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          py: 1,
          px: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ pb: 1 }}>
          Açıklama
        </Typography>
        <Box
          dangerouslySetInnerHTML={{ __html: task.description }}
          sx={{
            mb: 0.5,
            "& p": { typography: "body2", m: 0 },
            "& a": { color: "inherit", textDecoration: "none" },
            "& strong": { typography: "subtitle2" },
          }}
        />
      </Box>
    </Stack>
  );
}
