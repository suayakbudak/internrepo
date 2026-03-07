import { varAlpha } from "minimal-shared/utils";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { CONFIG } from "src/global-config";

// ----------------------------------------------------------------------

export function DogumGunleri({ title, description, description2, action, img, sx, ...other }) {
  return (
    <Box
      sx={[
        (theme) => ({
          ...theme.mixins.bgGradient({
            images: [
              `linear-gradient(to right, ${varAlpha(theme.vars.palette.grey["900Channel"], 0.4)} 0%, ${theme.vars.palette.grey[900]} 75%)`,
              `url(${CONFIG.assetsDir}/assets/images/about/dogumgunu-2.png)`,
            ],
          }),
          pr: 1,
          gap: 1,
          borderRadius: 2,
          display: "flex",
          height: "238px",
          position: "relative",
          pl: 3,
          alignItems: "center",
          color: "common.white",
          textAlign: { xs: "center", md: "left" },
          flexDirection: { xs: "column", md: "row" },
          border: `solid 1px ${theme.vars.palette.grey[800]}`,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box>
        <Typography variant="h5" sx={{ whiteSpace: "pre-line", mb: 3 }}>
          {title}
        </Typography>

        <Typography variant="h6" sx={{ opacity: 0.89, maxWidth: 360, ...(action && { mb: 3 }) }}>
          {description}
        </Typography>

        <Typography variant="body2" sx={{ opacity: 0.64, maxWidth: 360, ...(action && { mb: 3 }) }}>
          {description2}
        </Typography>

        {action && action}
      </Box>
      {img && <Box sx={{ width: 300 }}>{img}</Box>}
    </Box>
  );
}
