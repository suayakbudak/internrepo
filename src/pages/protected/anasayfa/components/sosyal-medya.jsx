import { useRef, useState } from "react";
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
  const [isFocused, setIsFocused] = useState(false);

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
        placeholder="Düşüncelerinizi paylaşın..."
        inputProps={{
          id: "post-input",
          style: { height: "100%" },
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        sx={[
          (theme) => ({
            p: 2,
            mb: 3,
            height: "74px",
            borderRadius: 1,
            backgroundColor: isFocused ? "transparent" : "#919EAB14",
            transition: "background-color 0.2s ease",
            border: `solid 1px ${varAlpha(theme.vars.palette.grey["500Channel"], 0.2)}`,
            "& .MuiInputBase-input": {
              height: "100% !important",
              alignItems: "center",
              display: "flex",
            },
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
            Fotoğraf/Video
          </Fab>

          <Fab size="small" color="inherit" variant="softExtended">
            <Iconify icon="solar:videocamera-record-bold" width={24} sx={{ color: "error.main" }} />
            Canlı Yayın
          </Fab>
        </Box>

        <Button variant="contained">Paylaş</Button>
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
              fontSize: "1.125rem",
              borderRadius: "16px",
              fontWeight: 700,
            }}
          >
            Sosyal Medya
          </Typography>

          <Box
            sx={{
              height: "calc(100% - 60px)",
              overflowY: "auto",
              px: 3,
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "grey.100",
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "grey.400",
                borderRadius: "4px",
              },
            }}
          >
            <Stack spacing={3}>
              {renderPostInput()}

              {posts.map((post) => (
                <ProfilePostItem key={post.id} post={post} />
              ))}
            </Stack>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
