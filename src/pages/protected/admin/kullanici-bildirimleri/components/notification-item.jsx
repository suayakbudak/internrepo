import {
  Box,
  Avatar,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
  alpha,
  Button,
  Checkbox,
} from "@mui/material";
import { fToNow } from "src/utils/format-time";

const HTMLContent = ({ content }) => (
  <Box
    dangerouslySetInnerHTML={{ __html: content }}
    sx={{
      mb: 0.5,
      "& p": { typography: "body2", m: 0 },
      "& a": { color: "inherit", textDecoration: "none" },
      "& strong": { typography: "subtitle2" },
    }}
  />
);

export function NotificationItem({
  notification,
  changeReadStatus,
  drawerVariant,
  selectedNotifications,
  addToSelectedNotifications,
}) {
  const Selector = () =>
    !drawerVariant && (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 52,
          width: 52,
          aspectRatio: 1,
          flexShrink: 0,
        }}
      >
        <Checkbox
          onClick={(e) => {
            e.stopPropagation();
            addToSelectedNotifications(notification.id);
          }}
          checked={selectedNotifications.includes(notification.id)}
        />
      </Box>
    );

  const ReadStatus = () =>
    notification.isUnRead && (
      <Box
        sx={(theme) => ({
          [theme.breakpoints.up("md")]: {},
          [theme.breakpoints.down("md")]: {},
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
        })}
      >
        {!drawerVariant && (
          <Button
            variant="contained"
            sx={(theme) => ({
              paddingInline: 1,
              paddingBlock: 0.25,
              bgcolor: alpha(theme.palette.primary.main, 0.3),
              color: theme.palette.text.primary,
              fontSize: theme.typography.caption.fontSize,
              fontWeight: theme.typography.fontWeightBold,
              ":hover": { bgcolor: alpha(theme.palette.primary.main, 0.4) },
              textWrap: "nowrap",
            })}
            onClick={() => changeReadStatus(notification.id, false)}
          >
            Okundu işaretle
          </Button>
        )}

        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            bgcolor: "info.main",
            flexShrink: 0,
          }}
        />
      </Box>
    );

  const When = () => (
    <Box
      sx={{
        typography: "caption",
        color: "text.disabled",
        flexShrink: 0,
        textWrap: "nowrap",
        px: 1,
      }}
    >
      {fToNow(notification.createdAt)}
    </Box>
  );

  const UserAvatar = () => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 52,
        width: 52,
        aspectRatio: 1,
        flexShrink: 0,
      }}
    >
      <ListItemAvatar>
        <Avatar
          src={notification.avatarUrl}
          alt={notification.avatarUrl}
          sx={{ bgcolor: "background.neutral" }}
        />
      </ListItemAvatar>
    </Box>
  );

  const Content = () => (
    <Box sx={{ flex: "1 1 auto" }}>
      <ListItemText
        sx={{ width: "100%", py: 1.5 }}
        disableTypography
        primary={<HTMLContent content={notification.title} />}
        secondary={
          <Box sx={{ typography: "caption", color: "text.secondary" }}>{notification.category}</Box>
        }
      />
    </Box>
  );

  return (
    <ListItemButton
      disableRipple
      sx={(theme) => ({
        paddingInlineStart: 0,
        alignItems: "flex-center",
        backgroundColor: notification.isUnRead && alpha(theme.palette.primary.main, 0.15),
        ":hover": {
          backgroundColor: notification.isUnRead
            ? alpha(theme.palette.primary.main, 0.08)
            : alpha(theme.palette.primary.main, 0.03),
        },
        px: drawerVariant ? 2 : 0,
      })}
    >
      <Box
        sx={(theme) => ({
          display: "flex",
          width: "100%",
          height: "100%",
          [theme.breakpoints.up("md")]: { flexDirection: "row", alignItems: "center" },
          [theme.breakpoints.down("md")]: { flexDirection: "column", alignItems: "flex-start" },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Selector />
          <UserAvatar />
          <Content />
        </Box>

        <Box
          sx={(theme) => ({
            display: "flex",
            [theme.breakpoints.up("md")]: {
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "space-between",
              height: "100%",
            },
            [theme.breakpoints.down("md")]: {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              px: 1,
              width: "100%",
            },
          })}
        >
          <ReadStatus />
          <When />
        </Box>
      </Box>
    </ListItemButton>
  );
}
