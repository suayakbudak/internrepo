import { MenuList } from "@mui/material";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { usePopover } from "minimal-shared/hooks";
import { CustomPopover } from "src/components/custom-popover";
import { Iconify } from "src/components/iconify";
import { useState } from "react";

export function FilterMenu({ onSort }) {
  const menuActions = usePopover();
  const [selectedOption, setSelectedOption] = useState("En yeniden eskiye");

  const options = ["En yeniden eskiye", "En eskiden yeniye"];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSort(option === "En yeniden eskiye" ? "desc" : "asc");
    menuActions.onClose();
  };

  return (
    <div>
      <CustomPopover
        open={menuActions.open}
        anchorEl={menuActions.anchorEl}
        onClose={menuActions.onClose}
      >
        <MenuList>
          {options.map((option) => (
            <MenuItem
              key={option}
              selected={option === selectedOption}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </MenuItem>
          ))}
        </MenuList>
      </CustomPopover>

      <Button endIcon={<Iconify icon="eva:chevron-down-fill" />} onClick={menuActions.onOpen}>
        {selectedOption}
      </Button>
    </div>
  );
}
