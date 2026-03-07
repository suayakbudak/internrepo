import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// ----------------------------------------------------------------------

const ANKET_STATUS = {
  completed: {
    label: "Tamamlandı",
    color: "#00A76F",
    bgcolor: "#E9FCD4",
  },
  ongoing: {
    label: "Devam Et",
    color: "#FFAB00",
    bgcolor: "#FFF5CC",
  },
  pending: {
    label: "Anketi Yanıtla",
    color: "#FF5630",
    bgcolor: "#FFE4DE",
  },
};

const ANKET_LIST = [
  {
    id: 1,
    title: "Personel Memnuniyet Anketi",
    status: "completed",
  },
  {
    id: 2,
    title: "Teknoloji Kullanım Anketi",
    status: "pending",
  },
  {
    id: 3,
    title: "Eğitim İhtiyaçları Anketi",
    status: "completed",
  },
  {
    id: 4,
    title: "Performans Geri Bildirimi Anketi",
    status: "ongoing",
  },
  {
    id: 5,
    title: "Hizmet Kalitesi Anketi",
    status: "ongoing",
  },
  {
    id: 6,
    title: "İletişim ve İş Birliği Anketi",
    status: "pending",
  },
];

export function Anketler() {
  return (
    <Card
      sx={{
        height: 654.5,
      }}
    >
      <Typography
        variant="h6"
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
        Anket
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
        <Stack spacing={2} sx={{ py: 2 }}>
          {ANKET_LIST.map((anket) => (
            <Box
              key={anket.id}
              sx={{
                width: "100%",
                p: 1,
                borderRadius: 1,
                boxShadow:
                  "0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)",
                textAlign: "center",
              }}
            >
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                {anket.title}
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  bgcolor: ANKET_STATUS[anket.status].bgcolor,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: ANKET_STATUS[anket.status].color,
                  }}
                >
                  {ANKET_STATUS[anket.status].label}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    </Card>
  );
}
