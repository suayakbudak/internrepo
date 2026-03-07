import { m } from "framer-motion";
import { useState, useCallback, useMemo } from "react";
import { useBoolean } from "minimal-shared/hooks";

import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Drawer from "@mui/material/Drawer";
import SvgIcon from "@mui/material/SvgIcon";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import { Label } from "src/components/label";
import { Iconify } from "src/components/iconify";
import { Scrollbar } from "src/components/scrollbar";
import { CustomTabs } from "src/components/custom-tabs";
import { varTap, varHover, transitionTap } from "src/components/animate";

import { _notifications } from "src/_mock";
import { fDateTime, fIsToday, fIsYesterday, fToNow } from "src/utils/format-time";
import { Button, Link } from "@mui/material";
import { RouterLink } from "src/routes/router-link";
import { NotificationItem } from "src/pages/protected/admin/kullanici-bildirimleri/components/notification-item";
import { paths } from "src/routes/paths";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function NotificationsDrawer({ data = [], sx, ...other }) {
  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

  const [currentTab, setCurrentTab] = useState("unread");
  const [notifications, setNotifications] = useState(_notifications);

  const changeReadStatus = useCallback((notificationId, isUnRead) => {
    setNotifications((prevNotifications) =>
      notificationId === "&all&"
        ? prevNotifications.map((notification) => ({
            ...notification,
            isUnRead,
          }))
        : prevNotifications.map((notification) =>
            notification.id === notificationId ? { ...notification, isUnRead } : notification
          )
    );
  }, []);

  const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;

  const tabs = useMemo(
    () => [
      { value: "unread", label: "Okunmayanlar", count: totalUnRead },
      { value: "archived", label: "Okunanlar", count: notifications.length - totalUnRead },
    ],
    [notifications, totalUnRead]
  );

  // Helper function to get the date group label
  const getDateGroupLabel = (date) => {
    if (fIsToday(date)) return "Today";
    if (fIsYesterday(date)) return "Yesterday";
    return fToNow(date);
  };

  // Helper function to group notifications by date
  const groupNotificationsByDate = (notifs) => {
    const groups = notifs.reduce((acc, notification) => {
      const date = new Date(notification.createdAt);
      const dateStr = fDateTime(date, "DD-MM-YYYY");

      if (!acc[dateStr]) {
        acc[dateStr] = {
          label: getDateGroupLabel(date),
          notifications: [],
          date,
        };
      }

      acc[dateStr].notifications.push(notification);
      return acc;
    }, {});

    // Convert to array and sort by date (newest first)
    return Object.values(groups).sort((a, b) => b.date - a.date);
  };

  return (
    <>
      <IconButton
        component={m.button}
        whileTap={varTap(0.96)}
        whileHover={varHover(1.04)}
        transition={transitionTap()}
        aria-label="Notifications button"
        onClick={onOpen}
        sx={sx}
        {...other}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <SvgIcon>
            {/* https://icon-sets.iconify.design/solar/bell-bing-bold-duotone/ */}
            <path
              fill="currentColor"
              d="M18.75 9v.704c0 .845.24 1.671.692 2.374l1.108 1.723c1.011 1.574.239 3.713-1.52 4.21a25.794 25.794 0 0 1-14.06 0c-1.759-.497-2.531-2.636-1.52-4.21l1.108-1.723a4.393 4.393 0 0 0 .693-2.374V9c0-3.866 3.022-7 6.749-7s6.75 3.134 6.75 7"
              opacity="0.5"
            />
            <path
              fill="currentColor"
              d="M12.75 6a.75.75 0 0 0-1.5 0v4a.75.75 0 0 0 1.5 0zM7.243 18.545a5.002 5.002 0 0 0 9.513 0c-3.145.59-6.367.59-9.513 0"
            />
          </SvgIcon>
        </Badge>
      </IconButton>

      <Drawer
        open={open}
        onClose={onClose}
        anchor="right"
        slotProps={{ backdrop: { invisible: true } }}
        PaperProps={{ sx: { width: 1, maxWidth: 420 } }}
      >
        <Box
          sx={{
            pr: 1,
            pl: 2.5,
            minHeight: 68,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Notifications
          </Typography>

          {!!totalUnRead && (
            <Tooltip title="Mark all as read">
              <IconButton color="primary">
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}

          <IconButton onClick={onClose} sx={{ display: { xs: "inline-flex", sm: "none" } }}>
            <Iconify icon="mingcute:close-line" />
          </IconButton>

          <IconButton>
            <Iconify icon="solar:settings-bold-duotone" />
          </IconButton>
        </Box>

        <CustomTabs
          variant="fullWidth"
          value={currentTab}
          onChange={(_, newTab) => setCurrentTab(newTab)}
          sx={{
            mb: 3,
          }}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              label={tab.label}
              iconPosition="end"
              icon={
                <Label variant={tab.value === currentTab ? "filled" : "soft"} color="default">
                  {tab.count}
                </Label>
              }
            />
          ))}
        </CustomTabs>

        <Scrollbar>
          <Box component="ul" sx={{ p: 0, m: 0, listStyle: "none" }}>
            {(() => {
              const filteredNotifications =
                notifications?.filter((notification) => {
                  if (currentTab === "unread") return notification.isUnRead;
                  if (currentTab === "archived") return !notification.isUnRead;
                  return true;
                }) || [];

              const groups = groupNotificationsByDate(filteredNotifications);

              return groups.map((group, groupIndex) => (
                <Box
                  key={fDateTime(group.date, "DD-MM-YYYY")}
                  sx={{
                    mb: groupIndex === groups.length - 1 ? 0 : 3,
                  }}
                >
                  <Typography
                    variant="overline"
                    sx={{
                      display: "block",
                      color: (theme) => theme.palette.grey[500],
                      bgcolor: "transparent",
                      borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                      pb: 0.5,
                      px: 2,
                      fontSize: "0.7rem",
                    }}
                  >
                    {group.label}
                  </Typography>

                  {group.notifications.map((notification) => (
                    <Box component="li" key={notification.id} sx={{ display: "flex" }}>
                      <NotificationItem
                        notification={notification}
                        changeReadStatus={changeReadStatus}
                        drawerVariant
                      />
                    </Box>
                  ))}
                </Box>
              ));
            })()}
          </Box>
        </Scrollbar>

        <Box sx={{ p: 1 }}>
          <Link component={RouterLink} href={paths.anasayfa.admin.bildirimler}>
            <Button fullWidth size="large" onClick={onClose}>
              Bütün bildirimleri gör
            </Button>
          </Link>
        </Box>
      </Drawer>
    </>
  );
}
