import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Iconify } from "src/components/iconify";
import { Box } from "@mui/material";

const MENU_WIDTH = 217;

// option-menu.jsx
export function OptionMenu({ onTypeChange, selectedType }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const QUESTION_TYPES = [
    {
      value: "Multiple Choice",
      label: "Çoktan Seçmeli",
      icon: "solar:list-check-bold",
    },
    {
      value: "Open Ended",
      label: "Açık Uçlu",
      icon: "solar:clipboard-list-bold",
    },
    {
      value: "Rating",
      label: "Değerlendirmeli",
      icon: "solar:star-bold",
    },
  ];

  const selectedItem = selectedType
    ? QUESTION_TYPES.find((item) => item.value === selectedType)
    : null;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value) => {
    if (value) {
      onTypeChange(value);
    }
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        order: { xs: -1, md: 2 },
        position: { md: "sticky" },
        top: { md: 24 },
        width: { xs: "100%", md: "auto" },
      }}
    >
      <Button
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          width: MENU_WIDTH,
          color: "text.primary",
          bgcolor: "background.paper",
          border: (theme) => `1px solid ${theme.palette.grey[300]}`,
          "&:hover": {
            bgcolor: "background.paper",
          },
          py: 1.5,
          px: 2,
          borderRadius: 1,
        }}
      >
        {selectedItem ? (
          <>
            <ListItemIcon sx={{ minWidth: 28 }}>
              <Iconify icon={selectedItem.icon} />
            </ListItemIcon>
            <ListItemText primary={selectedItem.label} />
          </>
        ) : (
          <ListItemText primary="Soru Seçiniz" />
        )}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        PaperProps={{
          sx: {
            width: MENU_WIDTH,
            mt: 1,
            "& .MuiMenuItem-root": {
              py: 1.5,
              borderRadius: 1,
              margin: "4px",
              width: "calc(100% - 8px)",
            },
          },
        }}
      >
        {QUESTION_TYPES.map((item) => (
          <MenuItem
            key={item.value}
            selected={item.value === selectedType}
            onClick={() => handleClose(item.value)}
          >
            <ListItemIcon sx={{ minWidth: 28 }}>
              <Iconify icon={item.icon} />
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
