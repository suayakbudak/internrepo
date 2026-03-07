import { useBoolean } from "minimal-shared/hooks";
import { useRef, useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "src/components/snackbar";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";

import { Iconify } from "src/components/iconify";
import { FileManagerPanel } from "./file-manager-panel";
import { FileManagerFileItem } from "./file-manager-file-item";
import { FileManagerFolderItem } from "./file-manager-folder-item";
import { FileManagerShareDialog } from "./file-manager-share-dialog";
import { FileManagerActionSelected } from "./file-manager-action-selected";
import { FileManagerNewFolderDialog } from "./file-manager-new-folder-dialog";

// ----------------------------------------------------------------------

export function FileManagerGridView({
  table,
  dataFiltered,
  onDeleteItem,
  onOpenConfirm,
  setTableData,
}) {
  const { selected, onSelectRow: onSelectItem, onSelectAllRows: onSelectAllItems } = table;

  const containerRef = useRef(null);

  const shareDialog = useBoolean();
  const filesCollapse = useBoolean();
  const foldersCollapse = useBoolean();

  const newFilesDialog = useBoolean();
  const newFolderDialog = useBoolean();

  const [folderName, setFolderName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");

  const handleChangeInvite = useCallback((event) => {
    setInviteEmail(event.target.value);
  }, []);

  const handleChangeFolderName = useCallback((event) => {
    setFolderName(event.target.value);
  }, []);

  const renderShareDialog = () => (
    <FileManagerShareDialog
      open={shareDialog.value}
      inviteEmail={inviteEmail}
      onChangeInvite={handleChangeInvite}
      onClose={() => {
        shareDialog.onFalse();
        setInviteEmail("");
      }}
    />
  );

  const renderNewFilesDialog = () => (
    <FileManagerNewFolderDialog
      open={newFilesDialog.value}
      onClose={newFilesDialog.onFalse}
      setTableData={setTableData}
    />
  );

  const renderNewFolderDialog = () => (
    <FileManagerNewFolderDialog
      open={newFolderDialog.value}
      onClose={newFolderDialog.onFalse}
      title="Yeni Klasör"
      onCreate={(files) => {
        if (!folderName.trim()) {
          toast.error("Lütfen klasör adı giriniz");
          return;
        }

        const newFolder = {
          id: uuidv4(),
          name: folderName.trim(),
          type: "folder",
          size: files.reduce((acc, file) => acc + file.size, 0),
          totalFiles: files.length,
          modifiedAt: new Date(),
          shared: [],
          files,
          url: "",
          isFavorited: false,
          tags: [],
          description: "",
          type2: "folder",
          createdAt: new Date(),
          favorite: false,
        };

        setTableData((prevData) => [...prevData, newFolder]);
        toast.success("Klasör başarıyla oluşturuldu!");
        newFolderDialog.onFalse();
        setFolderName("");
      }}
      folderName={folderName}
      onChangeFolderName={handleChangeFolderName}
      showOnlyCreate
    />
  );

  const renderFolders = () => (
    <>
      <FileManagerPanel
        title="Klasörler"
        subtitle={`${dataFiltered.filter((item) => item.type === "folder").length} klasör`}
        onOpen={newFolderDialog.onTrue}
        collapse={foldersCollapse.value}
        onCollapse={foldersCollapse.onToggle}
      />

      <Collapse in={!foldersCollapse.value} unmountOnExit>
        <Box
          sx={{
            gap: 3,
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
          }}
        >
          {dataFiltered
            .filter((i) => i.type === "folder")
            .map((folder) => (
              <FileManagerFolderItem
                key={folder.id}
                folder={folder}
                selected={selected.includes(folder.id)}
                onSelect={() => onSelectItem(folder.id)}
                onDelete={() => onDeleteItem(folder.id)}
              />
            ))}
        </Box>
      </Collapse>
    </>
  );

  const renderFiles = () => (
    <>
      <FileManagerPanel
        title="Dosyalar"
        subtitle={`${dataFiltered.filter((item) => item.type !== "folder").length} dosya`}
        onOpen={newFilesDialog.onTrue}
        collapse={filesCollapse.value}
        onCollapse={filesCollapse.onToggle}
      />

      <Collapse in={!filesCollapse.value} unmountOnExit>
        <Box
          sx={{
            gap: 3,
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
          }}
        >
          {dataFiltered
            .filter((i) => i.type !== "folder")
            .map((file) => (
              <FileManagerFileItem
                key={file.id}
                file={file}
                selected={selected.includes(file.id)}
                onSelect={() => onSelectItem(file.id)}
                onDelete={() => onDeleteItem(file.id)}
              />
            ))}
        </Box>
      </Collapse>
    </>
  );

  const renderSelectedActions = () =>
    !!selected?.length && (
      <FileManagerActionSelected
        numSelected={selected.length}
        rowCount={dataFiltered.length}
        selected={selected}
        onSelectAllItems={(checked) =>
          onSelectAllItems(
            checked,
            dataFiltered.map((row) => row.id)
          )
        }
        action={
          <>
            <Button
              size="small"
              color="error"
              variant="contained"
              startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
              onClick={onOpenConfirm}
              sx={{ mr: 1 }}
            >
              Sil
            </Button>

            <Button
              color="primary"
              size="small"
              variant="contained"
              startIcon={<Iconify icon="solar:share-bold" />}
              onClick={shareDialog.onTrue}
            >
              Paylaş
            </Button>
          </>
        }
      />
    );

  return (
    <>
      <Box ref={containerRef}>
        {renderFolders()}
        <Divider sx={{ my: 5, borderStyle: "dashed" }} />
        {renderFiles()}
        {renderSelectedActions()}
      </Box>

      {renderShareDialog()}
      {renderNewFilesDialog()}
      {renderNewFolderDialog()}
    </>
  );
}
