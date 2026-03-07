import { Check, ChevronLeft, Remove } from "@mui/icons-material";
import { Box, IconButton, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { Iconify } from "src/components/iconify";

export function FilterMenu({
  notifications,
  selectedNotifications,
  setSelectedNotifications,
  handleDelete,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack direction="row" alignItems="center" gap={0.5}>
      <div>
        <Button
          aria-controls={open ? "filter-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          size="small"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.1,
            px: 0.1,
          }}
        >
          <Box
            sx={{
              backgroundColor: selectedNotifications.length > 0 ? "primary.main" : "transparent",
              color: "white",
              border: 1,
              borderColor: selectedNotifications.length > 0 ? "primary.main" : "text.disabled",
              borderRadius: 0.5,
              aspectRatio: 1,
              width: 18,
              height: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            {selectedNotifications.length > 0 &&
              selectedNotifications.length !== notifications.length && (
                <Remove sx={{ fontSize: 18 }} />
              )}
            {selectedNotifications.length === notifications.length && (
              <Check sx={{ fontSize: 18 }} />
            )}
          </Box>
          <ChevronLeft sx={{ transform: "rotate(-90deg)", color: "text.secondary" }} />
        </Button>
        <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem
            onClick={() => {
              setSelectedNotifications(notifications.map((notification) => notification.id));
              handleClose();
            }}
          >
            Tümü
          </MenuItem>
          <MenuItem
            onClick={() => {
              setSelectedNotifications([]);
              handleClose();
            }}
          >
            Hiçbiri
          </MenuItem>
          <MenuItem
            onClick={() => {
              setSelectedNotifications(
                notifications
                  .filter((notification) => !notification.isUnRead)
                  .map((notification) => notification.id)
              );
              handleClose();
            }}
          >
            Okunanlar
          </MenuItem>
          <MenuItem
            onClick={() => {
              setSelectedNotifications(
                notifications
                  .filter((notification) => notification.isUnRead)
                  .map((notification) => notification.id)
              );
              handleClose();
            }}
          >
            Okunmayanlar
          </MenuItem>
        </Menu>
      </div>

      <IconButton size="small" onClick={handleDelete}>
        <Iconify icon="solar:trash-bin-trash-bold-duotone" />
      </IconButton>
    </Stack>
  );
}
