import { useState, useCallback, useMemo } from "react";
import { Tab, Box, Button, Typography } from "@mui/material";
import { paths } from "src/routes/paths";
import { Label } from "src/components/label";
import { Scrollbar } from "src/components/scrollbar";
import { CustomTabs } from "src/components/custom-tabs";
import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";
import { NotificationItem } from "./components/notification-item";
import { DashboardContent } from "../../layout";
import { _notifications } from "src/_mock";
import { Iconify } from "src/components/iconify";
import { fIsToday, fIsYesterday, fDateTime, fToNow } from "src/utils/format-time";
import { FilterMenu } from "./components/filter-menu";

export function NotificationsView() {
  const [currentTab, setCurrentTab] = useState("all");
  const [notifications, setNotifications] = useState(_notifications);
  const [selectedNotifications, setSelectedNotifications] = useState([]);

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
      { value: "all", label: "Tüm bildirimler", count: notifications.length },
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

  function addToSelectedNotifications(notificationId) {
    setSelectedNotifications((prevSelected) => {
      if (prevSelected.includes(notificationId)) {
        return prevSelected.filter((id) => id !== notificationId);
      }
      return [...prevSelected, notificationId];
    });
  }

  function handleDelete() {
    selectedNotifications.forEach((notificationId) => {
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.id !== notificationId)
      );
    });
  }

  return (
    <DashboardContent>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box>
          <CustomBreadcrumbs
            heading="Kullanıcı Bildirimleri"
            links={[
              { name: "Anasayfa", href: paths.anasayfa.root },
              { name: "Admin Paneli", href: paths.anasayfa.admin.root },
              { name: "Kullanıcı Bildirimleri" },
            ]}
            sx={{ mb: { xs: 2, md: 3 } }}
          />
        </Box>

        {!!totalUnRead && (
          <Button
            variant="outlined"
            startIcon={<Iconify icon="eva:done-all-fill" />}
            onClick={() => changeReadStatus("&all&", false)}
          >
            Hepsini okundu işaretle
          </Button>
        )}
      </Box>

      <CustomTabs
        variant="fullWidth"
        value={currentTab}
        onChange={(_, newTab) => setCurrentTab(newTab)}
        sx={{
          borderRadius: "8px",
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

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <FilterMenu
          notifications={notifications}
          selectedNotifications={selectedNotifications}
          setSelectedNotifications={setSelectedNotifications}
          handleDelete={handleDelete}
        />
      </Box>

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
                      selectedNotifications={selectedNotifications}
                      addToSelectedNotifications={addToSelectedNotifications}
                    />
                  </Box>
                ))}
              </Box>
            ));
          })()}
        </Box>
      </Scrollbar>
    </DashboardContent>
  );
}
