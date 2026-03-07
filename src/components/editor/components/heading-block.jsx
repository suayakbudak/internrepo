import { useState } from "react";
import { varAlpha } from "minimal-shared/utils";

import Menu from "@mui/material/Menu";
import { listClasses } from "@mui/material/List";
import ButtonBase, { buttonBaseClasses } from "@mui/material/ButtonBase";

import { Iconify } from "../../iconify";
import { ToolbarItem } from "./toolbar-item";

const HEADING_OPTIONS = ["Başlık 1", "Başlık 2", "Başlık 3", "Başlık 4", "Başlık 5", "Başlık 6"];

// ----------------------------------------------------------------------

export function HeadingBlock({ editor }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!editor) {
    return null;
  }

  return (
    <>
      <ButtonBase
        id="heading-menu-button"
        aria-label="Heading menu button"
        aria-controls={anchorEl ? "heading-menu-button" : undefined}
        aria-haspopup="true"
        aria-expanded={anchorEl ? "true" : undefined}
        onClick={handleClick}
        sx={(theme) => ({
          px: 1,
          width: 120,
          height: 32,
          borderRadius: 0.75,
          typography: "body2",
          justifyContent: "space-between",
          border: `solid 1px ${varAlpha(theme.vars.palette.grey["500Channel"], 0.2)}`,
        })}
      >
        {(editor.isActive("başlık", { level: 1 }) && "Başlık 1") ||
          (editor.isActive("başlık", { level: 2 }) && "Başlık 2") ||
          (editor.isActive("başlık", { level: 3 }) && "Başlık 3") ||
          (editor.isActive("başlık", { level: 4 }) && "Başlık 4") ||
          (editor.isActive("başlık", { level: 5 }) && "Başlık 5") ||
          (editor.isActive("başlık", { level: 6 }) && "Başlık 6") ||
          "Paragraf"}

        <Iconify
          width={16}
          icon={anchorEl ? "eva:arrow-ios-upward-fill" : "eva:arrow-ios-downward-fill"}
        />
      </ButtonBase>

      <Menu
        id="heading-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "heading-button" }}
        slotProps={{
          paper: {
            sx: {
              width: 120,
              [`& .${listClasses.root}`]: { gap: 0.5, display: "flex", flexDirection: "column" },
              [`& .${buttonBaseClasses.root}`]: {
                px: 1,
                width: 1,
                height: 34,
                borderRadius: 0.75,
                justifyContent: "flex-start",
                "&:hover": { backgroundColor: "action.hover" },
              },
            },
          },
        }}
      >
        <ToolbarItem
          component="li"
          label="Paragraf"
          active={editor.isActive("paragraf")}
          onClick={() => {
            handleClose();
            editor.chain().focus().setParagraph().run();
          }}
        />

        {HEADING_OPTIONS.map((heading, index) => {
          const level = index + 1;

          return (
            <ToolbarItem
              aria-label={heading}
              component="li"
              key={heading}
              label={heading}
              active={editor.isActive("başlık", { level })}
              onClick={() => {
                handleClose();
                editor.chain().focus().toggleHeading({ level }).run();
              }}
              sx={{
                ...(heading !== "Paragraf" && {
                  fontSize: 18 - index,
                  fontWeight: "fontWeightBold",
                }),
              }}
            />
          );
        })}
      </Menu>
    </>
  );
}
