import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { Iconify } from "src/components/iconify";
import { alpha } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import Fade from "@mui/material/Fade";
import LoadingButton from "@mui/lab/LoadingButton";

const DUYURULAR = [
  {
    id: 1,
    title: "Genel Bilgilendirme",
    description:
      "Dikkat! Bu hafta boyunca ofis alanında bakım yapılacaktır. Daha fazla bilgi için İdari İşler Birimi ile iletişime geçiniz.",
    image: "/assets/images/about/bilgilendirme.png",
  },
  {
    id: 2,
    title: "2 Şubat 2025 Yemek Menüsü",
    description: "Öğle yemeği servisi her gün 12:00 - 14:00 saatleri arasında yapılmaktadır.",
    image: "/assets/images/about/yemekmenusu.png",
  },
  {
    id: 3,
    title: "Doğum Günü Kutlaması",
    description: "Bilgi İşlem departmanı personeli Sn. Emre Yıldız'ın doğum gününü kutlarız.",
    image: "/assets/images/about/dogumgunu.png",
  },
  {
    id: 4,
    title: "Sürdürülebilirlik Raporu",
    description: "2023 yılı sürdürülebilirlik raporu yayınlandı.",
    image: "/assets/images/about/bilgilendirme.png",
  },
  {
    id: 5,
    title: "Yeni Ürün Lansmanı",
    description: "Yenilikçi ürünümüz pazara sunuldu.",
    image: "/assets/images/about/yemekmenusu.png",
  },
  {
    id: 6,
    title: "Kariyer Fırsatları",
    description: "Yeni pozisyonlar için başvurular başladı.",
    image: "/assets/images/about/dogumgunu.png",
  },
  {
    id: 7,
    title: "Sosyal Sorumluluk Projesi",
    description: "Eğitime destek projemiz başladı.",
    image: "/assets/images/about/bilgilendirme.png",
  },
  {
    id: 8,
    title: "Teknoloji Yatırımı",
    description: "Ar-Ge merkezimize yeni teknoloji yatırımı yapıldı.",
    image: "/assets/images/about/yemekmenusu.png",
  },
  {
    id: 9,
    title: "Müşteri Hizmetleri",
    description: "7/24 müşteri hizmetleri hattımız devrede.",
    image: "/assets/images/about/dogumgunu.png",
  },
];

export function Duyurular({ sx, ...other }) {
  const [duyurular, setDuyurular] = React.useState(DUYURULAR);
  const [showEmptyMessage, setShowEmptyMessage] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(duyurular.length / itemsPerPage);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

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

  const currentDuyurular = duyurular.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleDelete = (id) => {
    setDuyurular((prevDuyurular) => {
      const newDuyurular = prevDuyurular.filter((duyuru) => duyuru.id !== id);

      if (newDuyurular.length === 0) {
        setShowEmptyMessage(true);
        setIsSubmitting(true);
        setTimeout(() => {
          setVisible(false);
        }, 2000);
      }

      return newDuyurular;
    });
  };

  if (!visible) return null;

  return (
    <Fade in>
      <Card
        sx={{
          height: 496,
          backgroundColor: "background.paper",
          borderRadius: "16px",
          padding: 3,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {showEmptyMessage && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              backgroundColor: "background.paper",
              p: 3,
              borderRadius: 1,
              boxShadow: 1,
            }}
          >
            <Typography variant="h6">Tüm duyurular silindi</Typography>
            <LoadingButton
              loading={isSubmitting}
              variant="contained"
              sx={{
                minWidth: 120,
              }}
            >
              Kapatılıyor...
            </LoadingButton>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography sx={{ fontSize: "1.125rem", fontWeight: 700 }}>Duyurular</Typography>
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
            gap: 3,
            flexGrow: 1,
            width: "100%",
          }}
        >
          {currentDuyurular.map((duyuru) => (
            <Card
              key={duyuru.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <IconButton
                onClick={() => handleDelete(duyuru.id)}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  zIndex: 2,
                  p: 0.5,
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "1rem",
                    mb: 3,
                  }}
                >
                  {duyuru.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: "0.875rem",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    mb: 2,
                  }}
                >
                  {duyuru.description}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  p: 0,
                  backgroundColor: "background.paper",
                }}
              >
                <CardMedia
                  component="img"
                  image={duyuru.image}
                  alt={duyuru.title}
                  sx={{
                    width: "80%",
                    height: 198,
                    minWidth: 64,
                    objectFit: "cover",
                    borderRadius: "var(--radius-2, 8px)",
                    opacity: 1,
                    mb: 5,
                    transition: "opacity 0.3s ease",
                    "&:hover": {
                      opacity: 0.9,
                    },
                  }}
                />
              </Box>
            </Card>
          ))}
        </Box>
      </Card>
    </Fade>
  );
}
