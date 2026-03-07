import * as React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

// ----------------------------------------------------------------------

export function Ilanlar({ title, description, action, img, sx, ...other }) {
  return (
    <Card
      sx={{ minHeight: 550, backgroundColor: "background.paper", borderRadius: "16px", padding: 2 }}
    >
      <Typography sx={{ fontSize: "1.125rem", mb: 2, ml: 1 }}>İlanlar</Typography>
      <Card sx={{ width: "100%", minHeight: 150, display: "flex" }}>
        <CardMedia
          component="img"
          sx={{ width: 153, height: 120, backgroundColor: "background.paper" }}
          image="/assets/images/about/togg.png"
          alt="Live from space album cover"
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ pt: 0, pl: 2, pb: 2 }}>
            <Typography component="div" variant="h6">
              TOGG T10X HATASIZ BOYASIZ
            </Typography>
            <Typography variant="subtitle1" component="div" sx={{ color: "text.secondary" }}>
              Fiyat: 1.450.000₺
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>Yıl: 2023</Typography>
            <Typography sx={{ color: "text.secondary" }}>Renk: Kahverengi</Typography>
            <Typography sx={{ color: "text.secondary" }}>KM: 45.000</Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <IconButton sx={{ fontSize: "16px" }}>İlanı Görüntüle</IconButton>
          </Box>
        </Box>
      </Card>
      <Card sx={{ width: "100%", minHeight: 150, display: "flex", my: 2 }}>
        <CardMedia
          component="img"
          sx={{ width: 153, height: 120, backgroundColor: "background.paper" }}
          image="/assets/images/about/passat.png"
          alt="Live from space album cover"
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ pt: 0, pl: 2, pb: 2 }}>
            <Typography component="div" variant="h6">
              VOLKSWAGEN PASSAT MAKAM PAKET
            </Typography>
            <Typography variant="subtitle1" component="div" sx={{ color: "text.secondary" }}>
              Fiyat: 1.150.000₺
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>Yıl: 2019</Typography>
            <Typography sx={{ color: "text.secondary" }}>Renk: Siyah</Typography>
            <Typography sx={{ color: "text.secondary" }}>KM: 153.000</Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <IconButton sx={{ fontSize: "16px" }}>İlanı Görüntüle</IconButton>
          </Box>
        </Box>
      </Card>
      <Card sx={{ width: "100%", minHeight: 150, display: "flex" }}>
        <CardMedia
          component="img"
          sx={{ width: 153, height: 120, backgroundColor: "background.paper" }}
          image="/assets/images/about/megane.png"
          alt="Live from space album cover"
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ pt: 0, pl: 2, pb: 2 }}>
            <Typography component="div" variant="h6">
              RENAULT MEGANE DİZEL OTOMATİK
            </Typography>
            <Typography variant="subtitle1" component="div" sx={{ color: "text.secondary" }}>
              Fiyat: 860.500₺
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>Yıl: 2023</Typography>
            <Typography sx={{ color: "text.secondary" }}>Renk: Kahverengi</Typography>
            <Typography sx={{ color: "text.secondary" }}>KM: 45.000</Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <IconButton sx={{ fontSize: "16px" }}>İlanı Görüntüle</IconButton>
          </Box>
        </Box>
      </Card>
    </Card>
  );
}
