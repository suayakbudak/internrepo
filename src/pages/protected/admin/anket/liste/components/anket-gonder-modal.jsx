import { Box, Button, TextField, Modal, Typography, IconButton } from "@mui/material";
import { useState } from "react";
import { Iconify } from "src/components/iconify";

export function AnketGonderModal({ open, onClose }) {
  const [recipient, setRecipient] = useState("");
  const [department, setDepartment] = useState("");
  const [everyone, setEveryone] = useState(false);

  const handleSend = () => {
    // Handle sending the survey logic here
    onClose(); // Close the modal after sending
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          position: "relative",
        }}
      >
        <IconButton onClick={onClose} sx={{ position: "absolute", right: 16, top: 16 }}>
          <Iconify icon="mingcute:close-line" sx={{ width: "16px", height: "16px" }} />
        </IconButton>
        <Typography variant="h6" component="h2" gutterBottom>
          Anketi Gönder
        </Typography>
        <TextField
          label="Kişiye Gönder"
          fullWidth
          margin="normal"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <TextField
          label="Birime Gönder"
          fullWidth
          margin="normal"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <TextField
          label="Herkese Gönder"
          fullWidth
          margin="normal"
          value={department}
          onChange={(e) => setEveryone(e.target.value)}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button variant="outlined" onClick={onClose} sx={{ mr: 1 }}>
            İptal
          </Button>
          <Button variant="contained" onClick={handleSend} sx={{ backgroundColor: "primary.main" }}>
            Gönder
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
