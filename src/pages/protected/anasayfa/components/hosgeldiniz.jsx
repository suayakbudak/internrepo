import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { CONFIG } from "src/global-config";

// ----------------------------------------------------------------------

export function Hosgeldiniz({ title, description, action, img, sx, ...other }) {
  return (
    <Box
      sx={[
        (theme) => ({
          ...theme.mixins.bgGradient({
            images: [`url(${CONFIG.assetsDir}/assets/images/about/hava-durumu.png)`],
          }),
          pt: 5,
          pb: 5,
          pr: 3,
          gap: 5,
          borderRadius: 2,
          display: "flex",
          height: "238px",
          position: "relative",
          pl: { xs: 3, md: 5 },
          alignItems: "center",
          color: "common.white",
          textAlign: { xs: "center", md: "left" },
          flexDirection: { xs: "column", md: "row" },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box
        sx={{
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          alignItems: { xs: "center", md: "flex-start" },
        }}
      >
        <Typography variant="h4" sx={{ whiteSpace: "pre-line", mb: 1 }}>
          {title}
        </Typography>

        <Typography variant="body2" sx={{ opacity: 0.64, maxWidth: 360, ...(action && { mb: 3 }) }}>
          {description}
        </Typography>

        {action && action}
      </Box>
      {img && <Box sx={{ width: 300 }}>{img}</Box>}
    </Box>
  );
}
