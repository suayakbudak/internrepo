import { Dialog, DialogContent, DialogTitle, IconButton, Box, Typography } from "@mui/material";
import { Iconify } from "src/components/iconify";
import { fileFormat } from "src/components/file-thumbnail/utils";

export function FilePreviewModal({ open, onClose, file }) {
  const renderContent = () => {
    if (!file) return null;

    const format = fileFormat(file.name);

    if (format === "image") {
      return (
        <Box
          component="img"
          src={file.url}
          alt={file.name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            maxHeight: "80vh",
          }}
        />
      );
    }
    //Geçici örnekler
    // PDF dosyaları için örnek
    if (format === "pdf") {
      return (
        <Box
          component="iframe"
          src={file.url}
          title={file.name}
          sx={{
            width: "100%",
            height: "80vh",
            border: "none",
          }}
        />
      );
    }

    // Metin dosyaları için örnek
    if (format === "txt") {
      return (
        <Box
          component="iframe"
          src={file.url}
          title={file.name}
          sx={{
            width: "100%",
            height: "80vh",
            border: "none",
            backgroundColor: "background.paper",
          }}
        />
      );
    }

    // Video dosyaları için örnek
    if (format === "video") {
      return (
        <Box
          component="video"
          src={file.url}
          controls
          sx={{
            width: "100%",
            maxHeight: "80vh",
          }}
        />
      );
    }

    // Ses dosyaları için örnek
    if (format === "audio") {
      return (
        <Box
          component="audio"
          src={file.url}
          controls
          sx={{
            width: "100%",
            mt: 5,
          }}
        />
      );
    }

    // Desteklenmeyen dosya türleri için örnek
    return (
      <Box
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "80vh",
        }}
      >
        <Iconify
          icon="ic:round-file-present"
          sx={{
            width: 48,
            height: 48,
            color: "text.secondary",
            mb: 2,
          }}
        />
        <Typography variant="h6" color="text.secondary">
          Bu dosya türü için önizleme kullanılamıyor
        </Typography>
        <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
          {file.name}
        </Typography>
      </Box>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          margin: 2,
          maxHeight: "calc(100% - 32px)",
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "background.neutral",
        }}
      >
        {file?.name}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "text.secondary",
          }}
        >
          <Iconify icon="eva:close-fill" />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 0, overflow: "hidden" }}>{renderContent()}</DialogContent>
    </Dialog>
  );
}
