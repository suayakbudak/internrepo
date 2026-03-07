import { Typography } from "@mui/material";
import { useState, useCallback } from "react";

import { UploadBox, MultiFilePreview } from "src/components/upload";

// ----------------------------------------------------------------------

export function KanbanDetailsAttachments({ attachments, showUpload }) {
  const [files, setFiles] = useState(attachments);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
    },
    [files]
  );

  const handleRemoveFile = useCallback(
    (inputFile) => {
      const filtered = files.filter((file) => file !== inputFile);
      setFiles(filtered);
    },
    [files]
  );

  if (!files.length && showUpload === 0) {
    return (
      <Typography variant="caption" color="text.disabled">
        Yüklenmiş dosya yok.
      </Typography>
    );
  }

  return (
    <MultiFilePreview
      thumbnail
      files={files}
      onRemove={(file) => handleRemoveFile(file)}
      slotProps={{ thumbnail: { sx: { width: 64, height: 64 } } }}
      lastNode={showUpload === 1 && <UploadBox onDrop={handleDrop} />}
    />
  );
}
