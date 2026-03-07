import { MenuItem, MenuList, IconButton } from "@mui/material";
import { usePopover } from "minimal-shared/hooks";
import { CustomPopover } from "src/components/custom-popover";
import { Iconify } from "src/components/iconify";
import { useRouter } from "src/routes/hooks";
import { idParam } from "src/routes/param";
import { paths } from "src/routes/paths";

export function OptionMenu({ anketId }) {
  const menuActions = usePopover();

  const handleViewSurvey = () => {
    router.push(idParam(paths.anasayfa.anket.goruntule, anketId));
    menuActions.onClose();
  };

  const router = useRouter();

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
          <MenuItem onClick={handleViewSurvey}>Anketi Görüntüle</MenuItem>
        </MenuList>
      </CustomPopover>
    </>
  );
}
