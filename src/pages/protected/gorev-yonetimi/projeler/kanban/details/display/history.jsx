import { Avatar, Box, Paper, Stack, styled, Typography } from "@mui/material";
import { varAlpha } from "minimal-shared/utils";
import { useAuthContext } from "src/context/auth-context";
import { useFetch } from "src/hooks/getters/use-fetch";
import { endpoints } from "src/lib/endpoints";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { fDate, fDateTime } from "src/utils/format-time";
import { Fragment } from "react";

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

function Activity({ action, activityLog, uploadInfo, created_at, id, task, userId }) {
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
          <Stack direction="row" justifyContent="space-between" sx={{ width: 1 }}>
            <Stack spacing={1} alignItems="center" direction="row" width={1}>
              <Avatar alt={user.firstName} src={user.profilePhoto} />
              <Typography variant="subtitle1" component="span">
                {user.firstName + " " + user.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary" component="span">
                {
                  {
                    updated: "güncelledi",
                    created: "oluşturdu",
                    changed: "değiştirdi",
                  }[action]
                }
              </Typography>
            </Stack>
            <Box>
              <Typography variant="caption" color="text.secondary">
                {fDateTime(created_at)}
              </Typography>
            </Box>
          </Stack>

          {/* title, description, due_date, priority */}

          {uploadInfo
            ? Object.entries(uploadInfo).map(([key, { oldValue, newValue }]) => (
                <Fragment key={key + oldValue + newValue}>
                  <Typography sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
                    {
                      {
                        title: "Başlık",
                        description: "Açıklama",
                        due_date: "Tarih",
                        priority: "Oncelik",
                      }[key]
                    }
                  </Typography>
                  <Stack direction="row">
                    <Box
                      sx={{
                        bgcolor: (theme) => varAlpha(theme.palette.text.secondaryChannel, 0.12),
                        borderRadius: 1,
                        width: 1,
                        p: 1,
                      }}
                    >
                      {key === "description" ? (
                        <Box
                          dangerouslySetInnerHTML={{ __html: oldValue }}
                          sx={{
                            mb: 0.5,
                            "& p": { typography: "body2", m: 0 },
                            "& a": { color: "inherit", textDecoration: "none" },
                            "& strong": { typography: "subtitle2" },
                          }}
                        />
                      ) : (
                        <Typography variant="body2" minWidth="45%">
                          {key === "due_date" ? fDate(oldValue) : oldValue}
                        </Typography>
                      )}
                    </Box>
                    <ArrowRightAltIcon sx={{ color: "#999", my: 1, mx: 2 }} />
                    <Box
                      sx={{
                        bgcolor: (theme) => varAlpha(theme.palette.text.secondaryChannel, 0.12),
                        borderRadius: 1,
                        width: 1,
                        p: 1,
                      }}
                    >
                      {key === "description" ? (
                        <Box
                          dangerouslySetInnerHTML={{ __html: newValue }}
                          sx={{
                            mb: 0.5,
                            "& p": { typography: "body2", m: 0 },
                            "& a": { color: "inherit", textDecoration: "none" },
                            "& strong": { typography: "subtitle2" },
                          }}
                        />
                      ) : (
                        <Typography variant="body2" minWidth="45%">
                          {key === "due_date" ? fDate(newValue) : newValue}
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                </Fragment>
              ))
            : null}
        </Box>
      </UpdateContainer>
    </NotificationContainer>
  );
}
