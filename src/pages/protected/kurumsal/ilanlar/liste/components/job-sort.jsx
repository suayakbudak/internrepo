import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import { usePopover } from "minimal-shared/hooks";
import { Iconify } from "src/components/iconify";
import { CustomPopover } from "src/components/custom-popover";

const SORT_OPTIONS = [
  { value: 'En yeniden eskiye', label: 'En yeniden eskiye' },
  { value: 'En eskiden yeniye', label: 'En eskiden yeniye' },
  { value: 'Fiyata Göre Artan', label: 'Fiyata Göre Artan' },
  { value: 'Fiyata Göre Azalan', label: 'Fiyata Göre Azalan' },
];

export function JobSort({ sort, onSort }) {
  const menuActions = usePopover();

  const getSortLabel = (sortValue) => {
    const option = SORT_OPTIONS.find(opt => opt.value === sortValue);
    return option ? option.label : 'Sıralama';
  };

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
    >
      <MenuList>
        {SORT_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === sort}
            onClick={() => {
              onSort(option.value);
              menuActions.onClose();
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </MenuList>
    </CustomPopover>
  );

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        onClick={menuActions.onOpen}
        endIcon={
          <Iconify
            icon={menuActions.open ? "eva:arrow-ios-upward-fill" : "eva:arrow-ios-downward-fill"}
          />
        }
        sx={{ fontWeight: "fontWeightSemiBold" }}
      >
        <Box component="span" sx={{ ml: 0.5, fontWeight: "fontWeightBold" }}>
          {getSortLabel(sort)}
        </Box>
      </Button>

      {renderMenuActions()}
    </>
  );
}
