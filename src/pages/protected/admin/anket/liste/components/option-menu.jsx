import { MenuItem, MenuList, IconButton } from "@mui/material";
import { usePopover } from "minimal-shared/hooks";
import { CustomPopover } from "src/components/custom-popover";
import { Iconify } from "src/components/iconify";
import { useState } from "react";
import { AnketGonderModal } from "./anket-gonder-modal";
import { useRouter } from "src/routes/hooks";
import { paths } from "src/routes/paths";
import { idParam } from "src/routes/param";

export function OptionMenu({ anketId }) {
  const menuActions = usePopover();
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const handleSendSurvey = () => {
    setModalOpen(true);
    menuActions.onClose();
  };

  const handleEditSurvey = () => {
    router.push(paths.anasayfa.admin.anket.olustur);
    menuActions.onClose();
  };

  return (
    <>
      <IconButton color={menuActions.open ? "inherit" : "default"} onClick={menuActions.onOpen}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>

      <CustomPopover
        open={menuActions.open}
        anchorEl={menuActions.anchorEl}
        onClose={menuActions.onClose}
        slotProps={{ arrow: { placement: "right-top" } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              router.push(idParam(paths.anasayfa.admin.anket.details, anketId));
              menuActions.onClose();
            }}
          >
            Anketi Görüntüle
          </MenuItem>

          <MenuItem onClick={handleSendSurvey}>Anketi Gönder</MenuItem>

          <MenuItem
            onClick={() => {
              router.push(idParam(paths.anasayfa.admin.anket.sonuc, anketId));
              menuActions.onClose();
            }}
          >
            Sonuçları Görüntüle
          </MenuItem>

          <MenuItem onClick={menuActions.onClose}>Anketi Tekrarla</MenuItem>

          <MenuItem onClick={handleEditSurvey}>Anketi Düzenle</MenuItem>

          <MenuItem onClick={menuActions.onClose} sx={{ color: "error.main" }}>
            Anketi Sil
          </MenuItem>
        </MenuList>
      </CustomPopover>

      <AnketGonderModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
