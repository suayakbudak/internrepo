import { useRef } from "react";
import { varAlpha } from "minimal-shared/utils";

import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";

import { Iconify } from "src/components/iconify";
import { ProfilePostItem } from "src/pages/protected/sosyal-medya/components/profile-post-item";

// ----------------------------------------------------------------------

export function SosyalMecra({ posts }) {
  const fileRef = useRef(null);

  const handleAttach = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const renderPostInput = () => (
    <Card sx={{ p: 3 }}>
      <InputBase
        multiline
        fullWidth
        rows={4}
        placeholder="Share what you are thinking here..."
        inputProps={{ id: "post-input" }}
        sx={[
          (theme) => ({
            p: 2,
            mb: 3,
            borderRadius: 1,
            border: `solid 1px ${varAlpha(theme.vars.palette.grey["500Channel"], 0.2)}`,
          }),
        ]}
      />

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box
          sx={{
            gap: 1,
            display: "flex",
            alignItems: "center",
            color: "text.secondary",
          }}
        >
          <Fab size="small" color="inherit" variant="softExtended" onClick={handleAttach}>
            <Iconify icon="solar:gallery-wide-bold" width={24} sx={{ color: "success.main" }} />
            Image/Video
          </Fab>

          <Fab size="small" color="inherit" variant="softExtended">
            <Iconify icon="solar:videocamera-record-bold" width={24} sx={{ color: "error.main" }} />
            Streaming
          </Fab>
        </Box>

        <Button variant="contained">Post</Button>
      </Box>

      <input ref={fileRef} type="file" style={{ display: "none" }} />
    </Card>
  );

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 12 }}>
        <Card
          sx={{
            width: "100%",
            height: 654.5,
            overflowY: "auto",
            position: "relative",
          }}
        >
          <Typography
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 1100,
              backgroundColor: "background.paper",
              padding: "16px 24px",
              borderBottom: 1,
              fontSize: "1.125rem",
              borderColor: "divider",
              borderRadius: "16px",
            }}
          >
            Sosyal Medya
          </Typography>
          <Stack spacing={3}>
            {renderPostInput()}

            {posts.map((post) => (
              <ProfilePostItem key={post.id} post={post} />
            ))}
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}
