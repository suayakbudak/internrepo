import { LoadingButton } from "@mui/lab";
import { Button, Stack } from "@mui/material";
import { Field } from "src/components/hook-form";

export function TaskOverviewEdit({ closeDialog, isSubmitting }) {
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
          Görev Adı
        </Typography>
        <Typography component="span" variant="body1">
          {task.title}
        </Typography>
      </Box> */}

      <Field.Text name="title" label="Görev Adı" />
      <Field.Editor name="description" label="Açıklama" />

      {/* 
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
      </Box> */}
      <Stack direction="row" spacing={1}>
        <Button type="reset" variant="outlined" onClick={closeDialog} sx={{ width: "50%" }}>
          İptal
        </Button>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          loadingIndicator="Kaydet..."
        >
          Kaydet
        </LoadingButton>
      </Stack>
    </Stack>
  );
}
