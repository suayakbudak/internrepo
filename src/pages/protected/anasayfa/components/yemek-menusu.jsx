import * as React from "react";
import { varAlpha } from "minimal-shared/utils";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";

import { CONFIG } from "src/global-config";

// ----------------------------------------------------------------------

export function YemekMenusu({ title, description, action, img, sx, ...other }) {
  return (
    <Card
      sx={[
        (theme) => ({
          ...theme.mixins.bgGradient({
            images: [
              `linear-gradient(to right, ${varAlpha(theme.vars.palette.grey["900Channel"], 0.55)} 0%, ${theme.vars.palette.grey[900]} 100%)`,
              `url(${CONFIG.assetsDir}/assets/images/about/yemekhane.png)`,
            ],
          }),
          pt: 2,
          pb: 2,
          pr: 2,
          gap: 1,
          borderRadius: 2,
          display: "flex",
          height: "238px",
          position: "relative",
          color: "common.white",
          pl: { xs: 3, md: 5 },
          alignItems: "center",
          textAlign: { xs: "center", md: "left" },
          flexDirection: { xs: "column", md: "row" },
        }),
      ]}
    >
      <Box
        sx={{
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          alignItems: { xs: "center", md: "flex-start" },
        }}
      >
        <Typography variant="h6" sx={{ opacity: 0.64, maxWidth: 360, ...(action && { mb: 3 }) }}>
          {description}
        </Typography>
        <Typography variant="h4" sx={{ whiteSpace: "pre-line", mb: 1 }}>
          {title}
        </Typography>
      </Box>
      <Card sx={{ p: 2, backgroundColor: "transparent", boxShadow: 3, color: "common.white" }}>
        <List>
          <ListItem>
            <ListItemText>Mercimek Çorba</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>Ankara Tava</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>Akdeniz Salata</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>Fıstıklı Baklava</ListItemText>
          </ListItem>
        </List>
      </Card>
    </Card>
  );
}
