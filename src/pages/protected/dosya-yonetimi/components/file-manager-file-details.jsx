import { useState, useCallback } from "react";
import { useBoolean } from "minimal-shared/hooks";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";

import { fData } from "src/utils/format-number";
import { fDateTime } from "src/utils/format-time";

import { Iconify } from "src/components/iconify";
import { Scrollbar } from "src/components/scrollbar";
import { fileFormat, FileThumbnail } from "src/components/file-thumbnail";

import { FileManagerShareDialog } from "./file-manager-share-dialog";
import { FileManagerInvitedItem } from "./file-manager-invited-item";

// ----------------------------------------------------------------------

export function FileManagerFileDetails({
  file,
  open,
  onClose,
  onDelete,
  favorited,
  onFavorite,
  onCopyLink,
  ...other
}) {
  const shareDialog = useBoolean();
  const showTags = useBoolean(true);
  const showProperties = useBoolean(true);

  const [inviteEmail, setInviteEmail] = useState("");
  const hasShared = file?.shared && file.shared.length > 0;
  const tags = file?.tags || [];

  const handleChangeInvite = useCallback((event) => {
    setInviteEmail(event.target.value);
  }, []);

  const handleChangeTags = useCallback((newValue) => {}, []);

  const renderHead = () => (
    <Box
      sx={{
        p: 2.5,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Info
      </Typography>

      <Checkbox
        color="warning"
        icon={<Iconify icon="eva:star-outline" />}
        checkedIcon={<Iconify icon="eva:star-fill" />}
        checked={favorited}
        onChange={onFavorite}
        inputProps={{
          id: `favorite-${file.id}-checkbox`,
          "aria-label": `Favorite ${file.id} checkbox`,
        }}
      />
    </Box>
  );

  const renderProperties = () => (
    <Stack spacing={1.5}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          typography: "subtitle2",
          justifyContent: "space-between",
        }}
      >
        Özellikler
        <IconButton size="small" onClick={showProperties.onToggle}>
          <Iconify
            icon={
              showProperties.value ? "eva:arrow-ios-upward-fill" : "eva:arrow-ios-downward-fill"
            }
          />
        </IconButton>
      </Box>

      {showProperties.value && (
        <>
          <Box sx={{ display: "flex", typography: "caption", textTransform: "capitalize" }}>
            <Box component="span" sx={{ width: 80, color: "text.secondary", mr: 2 }}>
              Boyut
            </Box>

            {fData(file?.size)}
          </Box>

          <Box sx={{ display: "flex", typography: "caption", textTransform: "capitalize" }}>
            <Box component="span" sx={{ width: 80, color: "text.secondary", mr: 2 }}>
              Değiştirildi
            </Box>

            {fDateTime(file?.modifiedAt)}
          </Box>

          <Box sx={{ display: "flex", typography: "caption", textTransform: "capitalize" }}>
            <Box component="span" sx={{ width: 80, color: "text.secondary", mr: 2 }}>
              Tür
            </Box>

            {fileFormat(file?.type)}
          </Box>
        </>
      )}
    </Stack>
  );

  const renderTags = () => (
    <Stack spacing={1.5}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          typography: "subtitle2",
          justifyContent: "space-between",
        }}
      >
        Etiketler
        <IconButton size="small" onClick={showTags.onToggle}>
          <Iconify
            icon={showTags.value ? "eva:arrow-ios-upward-fill" : "eva:arrow-ios-downward-fill"}
          />
        </IconButton>
      </Box>

      {showTags.value && (
        <Autocomplete
          multiple
          freeSolo
          options={file?.tags.map((option) => option)}
          getOptionLabel={(option) => option}
          defaultValue={file?.tags.slice(0, 3)}
          value={tags}
          onChange={(event, newValue) => {
            handleChangeTags(newValue);
          }}
          renderOption={(props, option) => (
            <li {...props} key={option}>
              {option}
            </li>
          )}
          renderTags={(selected, getTagProps) =>
            selected.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                size="small"
                variant="soft"
                label={option}
                key={option}
              />
            ))
          }
          renderInput={(params) => <TextField {...params} placeholder="#Etiket ekle" />}
        />
      )}
    </Stack>
  );

  const renderFiles = () => {
    if (!file || file.type !== "folder") {
      return null;
    }

    return (
      <>
        <Box
          sx={{
            p: 2.5,
            display: "flex",
            alignItems: "center",
            typography: "subtitle2",
            justifyContent: "space-between",
          }}
        >
          Klasördeki Dosyalar
        </Box>

        {file?.files?.length > 0 && (
          <Box component="ul" sx={{ pl: 2, pr: 1 }}>
            {file.files.map((folderFile, index) => (
              <Stack key={index} direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <FileThumbnail
                  file={{
                    ...folderFile,
                    type: folderFile?.type?.toLowerCase() === "folder" ? "folder" : "file",
                  }}
                  imageView={false}
                  sx={{ width: 36, height: 36 }}
                />
                <Stack spacing={0.5} flexGrow={1}>
                  <Typography variant="subtitle2" noWrap>
                    {folderFile.name || folderFile.path}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.disabled" }}>
                    {folderFile.size ? fData(folderFile.size) : ""}
                  </Typography>
                </Stack>
              </Stack>
            ))}
          </Box>
        )}
      </>
    );
  };

  const renderShared = () => (
    <>
      <Box
        sx={{
          p: 2.5,
          display: "flex",
          alignItems: "center",
          typography: "subtitle2",
          justifyContent: "space-between",
        }}
      >
        Paylaşılan Kişiler
        <IconButton
          size="small"
          color="primary"
          onClick={shareDialog.onTrue}
          sx={{
            width: 24,
            height: 24,
            bgcolor: "primary.main",
            color: "primary.contrastText",
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          <Iconify width={16} icon="mingcute:add-line" />
        </IconButton>
      </Box>

      {hasShared && (
        <Box component="ul" sx={{ pl: 2, pr: 1 }}>
          {file?.shared?.map((person) => (
            <FileManagerInvitedItem key={person.id} person={person} />
          ))}
        </Box>
      )}
    </>
  );

  return (
    <>
      <Drawer
        open={open}
        onClose={onClose}
        anchor="right"
        slotProps={{ backdrop: { invisible: true } }}
        PaperProps={{ sx: { width: 320 } }}
        {...other}
      >
        <Scrollbar>
          {renderHead()}

          <Stack
            spacing={2.5}
            sx={{ p: 2.5, justifyContent: "center", bgcolor: "background.neutral" }}
          >
            <FileThumbnail
              file={{
                ...file,
                type: file?.type?.toLowerCase() === "folder" ? "folder" : "file",
              }}
              imageView={false}
              sx={{ width: "auto", height: "auto", alignSelf: "flex-start" }}
              slotProps={{
                img: { sx: { width: 320, height: "auto", aspectRatio: "4/3", objectFit: "cover" } },
                icon: { sx: { width: 64, height: 64 } },
              }}
            />

            <Typography variant="subtitle1" sx={{ wordBreak: "break-all" }}>
              {file?.name}
            </Typography>

            <Divider sx={{ borderStyle: "dashed" }} />

            {renderTags()}
            {renderProperties()}
          </Stack>

          {renderShared()}
          {renderFiles()}
        </Scrollbar>

        <Box sx={{ p: 2.5 }}>
          <Button
            fullWidth
            variant="soft"
            color="error"
            size="large"
            startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
            onClick={onDelete}
          >
            Sil
          </Button>
        </Box>
      </Drawer>

      <FileManagerShareDialog
        open={shareDialog.value}
        shared={file?.shared}
        inviteEmail={inviteEmail}
        onChangeInvite={handleChangeInvite}
        onCopyLink={onCopyLink}
        onClose={() => {
          shareDialog.onFalse();
          setInviteEmail("");
        }}
      />
    </>
  );
}
