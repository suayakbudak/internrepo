import React, { forwardRef } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import { RouterLink } from "src/routes/router-link";
import { Iconify } from "src/components/iconify";
import { CustomPopover } from "src/components/custom-popover";
import { fCurrency } from "src/utils/format-number";
import { usePopover } from "minimal-shared/hooks";
import { _speed } from "src/_mock";


const JobItem = forwardRef(
  ({ job, editHref, detailsHref, onDelete, isSelected, onCardClick, index: jobIndex }, ref) => {
    const menuActions = usePopover();

    const renderMenuActions = () => (
      <CustomPopover
        open={menuActions.open}
        anchorEl={menuActions.anchorEl}
        onClose={menuActions.onClose}
        slotProps={{ arrow: { placement: "right-bottom" } }}
      >
        <MenuList>
          <MenuItem component={RouterLink} href={editHref} onClick={() => menuActions.onClose()}>
            <Iconify icon="solar:pen-bold" />
            İlanı düzenle
          </MenuItem>
          <MenuItem
            onClick={() => {
              menuActions.onClose();
              onDelete();
            }}
            sx={{ color: "error.main" }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            İlanı kaldır
          </MenuItem>
        </MenuList>
      </CustomPopover>
    );




    const renderImages = () => {
      const primaryImage = job.images?.find(img => img.isPrimary);
      const firstImage = job.images?.[0]?.imageUrl;
      
      return (
        <Box sx={{ p: 0.6, pb: 0 }}>
          <Avatar
            alt={job.title}
            src={primaryImage?.imageUrl || firstImage || '/placeholder-image.jpg'}
            variant="rounded"
            sx={{ 
              width: '100%', 
              height: 164,
              flexShrink: 0 
            }}
          />
        </Box>
      );
    };

    return (
      <Card
        ref={ref}
        onClick={() => onCardClick(job.id)}
        sx={[
          (theme) => ({
            "--primary-main": theme.palette.primary.main,
            position: "relative",
            borderRadius: 2,
            overflow: "hidden",
            border: isSelected ? "2px solid var(--primary-main)" : "2px solid transparent",
            transition: "all 0.3s ease-in-out",
            cursor: "pointer",
          })
        ]}
      >
        {/* Fiyat bilgisi */}
        <Box
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            backgroundColor: "primary.main",
            color: "common.white",
            borderRadius: 1,
            px: 1.5,
            py: 0.5,
            typography: "subtitle2",
            zIndex: 1,
          }}
        >
          {fCurrency(job.salary.price)}
        </Box>

        {renderImages()}

        {/* İş ilanı başlığı */}
        <Box sx={{ p: 3, pb: 2 }}>
          <ListItemText
            sx={{
              mt: 0,
              fontFamily: "Public Sans",
              fontSize: "var(--subtitle1size)",
              fontWeight: 600,
              lineHeight: "var(--subtitle1line-height)",
              letterSpacing: "var(--subtitle1letter-spacing)",
              textAlign: "left",
              color: "var(--text-primary, #1C252E)",
            }}
            primary={
              <Link
                component={RouterLink}
                href={detailsHref}
                color="inherit"
                sx={{
                  display: "block",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {job.title}
              </Link>
            }
            primaryTypographyProps={{
              typography: "subtitle1",
            }}
          />
        </Box>
        {renderMenuActions()}
      </Card>
    );
  }
);

export default JobItem;
