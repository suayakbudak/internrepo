import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Iconify } from "src/components/iconify";
import { alpha } from "@mui/material/styles";
import { fCurrency } from "src/utils/format-number";
import calendaIcon from "src/pages/protected/kurumsal/ilanlar/liste/icons/ic-calendar.svg";
import calendaIcon1 from "src/pages/protected/kurumsal/ilanlar/liste/icons/pallete.svg";
import calendaIcon2 from "src/pages/protected/kurumsal/ilanlar/liste/icons/swatchbook.svg";
import calendaIcon3 from "src/pages/protected/kurumsal/ilanlar/liste/icons/ic-dashboard.svg";

const ILANLAR = [
  {
    id: 1,
    title: "TOGG T10X HATASIZ BOYASIZ",
    price: 1450000,
    year: "2023",
    brand: "TOGG",
    color: "Kahverengi",
    image: "/assets/images/about/togg.png",
    type: "vehicle",
    km: "45.000",
  },
  {
    id: 2,
    title: "VOLKSWAGEN PASSAT MAKAM PAKET",
    price: 1150000,
    year: "2019",
    brand: "VOLKSWAGEN",
    color: "Siyah",
    image: "/assets/images/about/passat.png",
    type: "vehicle",
    km: "153.000",
  },
  {
    id: 3,
    title: "RENAULT MEGANE DİZEL OTOMATİK",
    price: 860500,
    year: "2023",
    brand: "RENAULT",
    color: "Kahverengi",
    image: "/assets/images/about/megane.png",
    type: "vehicle",
    km: "45.000",
  },
  {
    id: 4,
    title: "MACBOOK PRO M2 MAX",
    price: 92500,
    year: "2024",
    brand: "APPLE",
    color: "Uzay Grisi",
    image: "/assets/images/about/togg.png",
    type: "technology",
  },
  {
    id: 5,
    title: "IPHONE 15 PRO MAX 1TB",
    price: 84999,
    year: "2023",
    brand: "APPLE",
    color: "Natural Titanium",
    image: "/assets/images/about/passat.png",
    type: "technology",
  },
  {
    id: 6,
    title: "SAMSUNG S24 ULTRA 1TB",
    price: 72999,
    year: "2024",
    brand: "SAMSUNG",
    color: "Titanium Gray",
    image: "/assets/images/about/megane.png",
    type: "technology",
  },
  {
    id: 7,
    title: "TOGG T10X HATASIZ BOYASIZ",
    price: 1450000,
    year: "2023",
    brand: "TOGG",
    color: "Kahverengi",
    image: "/assets/images/about/togg.png",
    type: "vehicle",
    km: "45.000",
  },
  {
    id: 8,
    title: "VOLKSWAGEN PASSAT MAKAM PAKET",
    price: 1150000,
    year: "2019",
    brand: "VOLKSWAGEN",
    color: "Siyah",
    image: "/assets/images/about/passat.png",
    type: "vehicle",
    km: "153.000",
  },
  {
    id: 9,
    title: "RENAULT MEGANE DİZEL OTOMATİK",
    price: 860500,
    year: "2023",
    brand: "RENAULT",
    color: "Kahverengi",
    image: "/assets/images/about/megane.png",
    type: "vehicle",
    km: "45.000",
  },
];

export function Ilanlar({ title, description, action, img, sx, ...other }) {
  const [currentPage, setCurrentPage] = React.useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(ILANLAR.length / itemsPerPage);

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;

  const handleNext = () => {
    if (!isLastPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirstPage) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const currentIlans = ILANLAR.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <Card
      sx={{
        height: 465,
        backgroundColor: "background.paper",
        borderRadius: "16px",
        padding: 3,
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography sx={{ fontSize: "1.125rem", fontWeight: 700 }}>İlanlar</Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            size="small"
            onClick={handlePrev}
            disabled={isFirstPage}
            sx={{
              color: isFirstPage ? "grey.400" : "grey.700",
              "&:hover": {
                backgroundColor: isFirstPage ? "transparent" : alpha("#919EAB", 0.08),
              },
            }}
          >
            <Iconify icon="eva:arrow-ios-back-fill" />
          </IconButton>
          <IconButton
            size="small"
            onClick={handleNext}
            disabled={isLastPage}
            sx={{
              color: isLastPage ? "grey.400" : "grey.700",
              "&:hover": {
                backgroundColor: isLastPage ? "transparent" : alpha("#919EAB", 0.08),
              },
            }}
          >
            <Iconify icon="eva:arrow-ios-forward-fill" />
          </IconButton>
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 5,
          flexGrow: 1,
          width: "100%",
        }}
      >
        {currentIlans.map((ilan) => (
          <Card
            key={ilan.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "relative",
                display: "flex",
                gap: 1,
                p: 1,
                pb: 0.5,
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: "100%",
                  height: 164,
                  backgroundColor: "background.paper",
                  objectFit: "cover",
                  borderRadius: 1,
                }}
                image={ilan.image}
                alt={ilan.title}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  width: "30%",
                  height: "100%",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: "100%",
                    height: 78,
                    backgroundColor: "background.paper",
                    objectFit: "cover",
                    borderRadius: 1,
                  }}
                  image={ilan.image}
                  alt={`${ilan.title}-2`}
                />
                <CardMedia
                  component="img"
                  sx={{
                    width: "100%",
                    height: 78,
                    backgroundColor: "background.paper",
                    objectFit: "cover",
                    borderRadius: 1,
                  }}
                  image={ilan.image}
                  alt={`${ilan.title}-3`}
                />
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  top: 12,
                  left: 12,
                  backgroundColor: "primary.main",
                  color: "common.white",
                  borderRadius: 1,
                  px: 1.5,
                  py: 0.5,
                  typography: "subtitle2",
                  zIndex: 1,
                }}
              >
                {fCurrency(ilan.price)}
              </Box>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                p: 2,
                pt: 1,
              }}
            >
              <Typography
                component="div"
                variant="h6"
                sx={{
                  fontSize: "0.95rem",
                  lineHeight: 1.2,
                  height: "2.4em",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  mb: 0,
                }}
              >
                {ilan.title}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  mt: 0,
                }}
              >
                <Box
                  sx={{
                    gap: 1,
                    minWidth: 0,
                    display: "flex",
                    alignItems: "center",
                    color: "text.disabled",
                  }}
                >
                  <img src={calendaIcon} alt="year" style={{ flexShrink: 0 }} />
                  <Typography variant="body2" sx={{ fontSize: "0.85rem" }} noWrap>
                    {ilan.year}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    gap: 1,
                    minWidth: 0,
                    display: "flex",
                    alignItems: "center",
                    color: "text.disabled",
                  }}
                >
                  <img src={calendaIcon2} alt="brand" style={{ flexShrink: 0 }} />
                  <Typography variant="body2" sx={{ fontSize: "0.85rem" }} noWrap>
                    {ilan.brand}
                  </Typography>
                </Box>
                {ilan.type === "vehicle" && (
                  <Box
                    sx={{
                      gap: 1,
                      minWidth: 0,
                      display: "flex",
                      alignItems: "center",
                      color: "text.disabled",
                    }}
                  >
                    <img src={calendaIcon3} alt="km" style={{ flexShrink: 0 }} />
                    <Typography variant="body2" sx={{ fontSize: "0.85rem" }} noWrap>
                      {ilan.km} KM
                    </Typography>
                  </Box>
                )}
                <Box
                  sx={{
                    gap: 1,
                    minWidth: 0,
                    display: "flex",
                    alignItems: "center",
                    color: "text.disabled",
                  }}
                >
                  <img src={calendaIcon1} alt="color" style={{ flexShrink: 0 }} />
                  <Typography variant="body2" sx={{ fontSize: "0.85rem" }} noWrap>
                    {ilan.color}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
    </Card>
  );
}
