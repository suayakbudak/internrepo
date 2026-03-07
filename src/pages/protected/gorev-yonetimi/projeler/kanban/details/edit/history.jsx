import { Avatar, Box, Paper, Stack, styled, Typography } from "@mui/material";
import { varAlpha } from "minimal-shared/utils";
import { useAuthContext } from "src/context/auth-context";
import { useFetch } from "src/hooks/getters/use-fetch";
import { endpoints } from "src/lib/endpoints";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { fDateTime } from "src/utils/format-time";

export function Gecmis({ taskId }) {
  const queryString = new URLSearchParams({ task: taskId }).toString();
  const historyEndpoint = `${endpoints.get.activities.root}?${queryString}`;
  const { data: activities } = useFetch(historyEndpoint);

  if (!activities) return null;
  return (
    <Stack>
      {activities.map((activity) => (
        <Activity key={activity.id + activity.userId} {...activity} />
      ))}
    </Stack>
  );
}

function Activity({ action, activityLog, created_at, id, task, userId }) {
  const { user } = useAuthContext();

  const NotificationContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
  }));

  const UpdateContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    marginBottom: theme.spacing(1),
  }));

  if (!user) return null;

  return (
    <NotificationContainer elevation={0}>
      <UpdateContainer>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar alt={user.firstName} src={user.profilePhoto} />
            <Typography variant="subtitle1" component="span">
              {user.firstName + " " + user.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="span">
              {action}
            </Typography>
          </Box>
          <Stack
            direction="row"
            sx={{
              mt: 2,
              p: 2,
              bgcolor: (theme) => varAlpha(theme.palette.text.secondaryChannel, 0.12),
              borderRadius: 1,
              width: 1,
            }}
          >
            {/* <Typography variant="body2" color="text.secondary" gutterBottom minWidth="45%">
              {task.uploadInfo
                ? Object.entries(task.uploadInfo).map(([key, value]) => (
                    <Fragment key={key}>
                      <Typography variant="body2" color="text.secondary" display="inline">
                        {key}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" display="inline">
                        {value}
                      </Typography>
                      <br />
                    </Fragment>
                  ))
                : null}
            </Typography> */}
            <ArrowRightAltIcon sx={{ color: "#999", my: 1, mx: 2 }} />
            <Typography variant="body2" minWidth="45%">
              {task.title}
            </Typography>
          </Stack>
        </Box>
        <Stack direction="row" justifyContent="end" sx={{ width: 1 }}>
          <Typography variant="caption" color="text.secondary">
            {fDateTime(created_at)}
          </Typography>
        </Stack>
      </UpdateContainer>
    </NotificationContainer>
  );
}
