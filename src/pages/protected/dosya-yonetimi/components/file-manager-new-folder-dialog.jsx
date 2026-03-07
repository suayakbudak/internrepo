import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import { toast } from "src/components/snackbar";
import { Upload } from "src/components/upload";
import { Iconify } from "src/components/iconify";
import { fileFormat, fileThumb } from "src/components/file-thumbnail/utils";

// ----------------------------------------------------------------------

export function FileManagerNewFolderDialog({
  open,
  onClose,
  onCreate,
  title = "Dosya Yükle",
  folderName,
  onChangeFolderName,
  showOnlyCreate = false,
  setTableData,
  ...other
}) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (!open) {
      setFiles([]);
    }
  }, [open]);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const newFiles = acceptedFiles
        .map((file) => {
          if (!file.name || file.name === "Unnamed File") {
            console.error("Invalid file name:", file);
            return null;
          }

          // Single file upload
          const fileType = fileFormat(file.name);
          return {
            id: uuidv4(),
            name: file.name,
            size: file.size,
            type: fileType,
            files: [file],
            modifiedAt: new Date(),
            createdAt: new Date(),
            preview: URL.createObjectURL(file),
            url: URL.createObjectURL(file),
            shared: [],
            isFavorited: false,
            favorite: false,
            tags: [],
            totalFiles: 1,
            description: "",
            type2: fileType,
            thumbnail: fileThumb(file.name),
          };
        })
        .filter(Boolean);

      if (newFiles.length > 0) {
        setFiles([...files, ...newFiles]);
      } else {
        toast.error("Lütfen dosya seçiniz");
      }
    },
    [files]
  );

  const handleRemoveFile = (inputFile) => {
    const filtered = files.filter((file) => file !== inputFile);
    setFiles(filtered);
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  const handleCreate = () => {
    if (onCreate) {
      onCreate(files);
    }
  };

  const handleUpload = () => {
    if (files.length === 0) {
      toast.error("Lütfen dosya seçiniz");
      return;
    }

    setTableData((prevData) => [...prevData, ...files]);
    toast.success("Dosyalar başarıyla yüklendi!");
    onClose();
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}>{title}</DialogTitle>

      <DialogContent dividers sx={{ pt: 1, pb: 0, border: "none" }}>
        {showOnlyCreate && (
          <TextField
            fullWidth
            label="Klasör adı"
            value={folderName}
            onChange={onChangeFolderName}
            sx={{ mb: 3 }}
          />
        )}

        <Upload
          multiple
          files={files}
          onDrop={handleDrop}
          onRemove={handleRemoveFile}
          onRemoveAll={handleRemoveAllFiles}
        />
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          İptal
        </Button>

        {showOnlyCreate ? (
          <Button
            variant="contained"
            onClick={handleCreate}
            disabled={!folderName?.trim() || !files.length}
          >
            Oluştur
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              onClick={handleUpload}
              disabled={!files.length}
              startIcon={<Iconify icon="eva:cloud-upload-fill" />}
            >
              Yükle
            </Button>

            {!!files.length && (
              <Button variant="outlined" color="inherit" onClick={handleRemoveAllFiles}>
                Tümünü Sil
              </Button>
            )}
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
