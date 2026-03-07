import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Iconify } from "src/components/iconify";
import { fDate, formatPatterns, today } from "src/utils/format-time";

const TASKS = {
  "2024-01-29": [
    {
      id: 101,
      startTime: "09:00",
      endTime: "10:00",
      title: "Proje Kapanış Toplantısı",
      completed: true,
      color: "info.lighter",
    },
    {
      id: 102,
      startTime: "11:30",
      endTime: "12:30",
      title: "Yıl Sonu Değerlendirmesi",
      completed: true,
      color: "success.lighter",
    },
  ],
  "2024-01-30": [
    {
      id: 103,
      startTime: "10:00",
      endTime: "11:00",
      title: "Personel Performans Görüşmesi",
      completed: true,
      color: "warning.lighter",
    },
    {
      id: 104,
      startTime: "14:00",
      endTime: "15:00",
      title: "Ekip Eğitimi",
      completed: true,
      color: "primary.lighter",
    },
  ],
  "2024-01-31": [
    {
      id: 105,
      startTime: "09:30",
      endTime: "10:30",
      title: "Müşteri Toplantısı",
      completed: true,
      color: "error.lighter",
    },
  ],
  [today(formatPatterns.paramCase.date)]: [
    {
      id: 106,
      startTime: "09:00",
      endTime: "10:00",
      title: "Günlük Ekip Toplantısı",
      completed: true,
      color: "info.lighter",
    },
    {
      id: 107,
      startTime: "10:30",
      endTime: "11:30",
      title: "Sprint Planlama",
      completed: true,
      color: "success.lighter",
    },
    {
      id: 108,
      startTime: "13:00",
      endTime: "14:00",
      title: "Proje Durum Değerlendirmesi",
      completed: false,
      color: "warning.lighter",
    },
    {
      id: 109,
      startTime: "15:00",
      endTime: "16:00",
      title: "Yeni Proje Görüşmesi",
      completed: false,
      color: "primary.lighter",
    },
  ],
  "2025-01-28": [
    {
      id: 1,
      startTime: "09:00",
      endTime: "10:30",
      title: "Yıllık Planlama Toplantısı",
      completed: false,
      color: "info.lighter",
    },
    {
      id: 2,
      startTime: "11:00",
      endTime: "12:00",
      title: "Departman Hedefleri Sunumu",
      completed: false,
      color: "success.lighter",
    },
    {
      id: 3,
      startTime: "14:00",
      endTime: "15:30",
      title: "Bütçe Değerlendirme",
      completed: false,
      color: "warning.lighter",
    },
  ],
  "2025-01-29": [
    {
      id: 4,
      startTime: "10:00",
      endTime: "11:00",
      title: "Proje Başlangıç Toplantısı",
      completed: false,
      color: "primary.lighter",
    },
    {
      id: 5,
      startTime: "13:00",
      endTime: "14:00",
      title: "Tedarikçi Görüşmesi",
      completed: false,
      color: "error.lighter",
    },
  ],
  "2025-01-30": [
    {
      id: 6,
      startTime: "09:30",
      endTime: "10:30",
      title: "Risk Analizi Toplantısı",
      completed: false,
      color: "info.lighter",
    },
    {
      id: 7,
      startTime: "11:00",
      endTime: "12:00",
      title: "Yazılım Demo Sunumu",
      completed: false,
      color: "success.lighter",
    },
  ],
  "2025-01-31": [
    {
      id: 8,
      startTime: "10:00",
      endTime: "11:00",
      title: "Müşteri Geri Bildirim Toplantısı",
      completed: false,
      color: "primary.lighter",
    },
    {
      id: 9,
      startTime: "14:00",
      endTime: "15:00",
      title: "Kalite Kontrol Değerlendirmesi",
      completed: false,
      color: "error.lighter",
    },
  ],
  "2025-02-01": [
    {
      id: 10,
      startTime: "09:00",
      endTime: "10:00",
      title: "Aylık Değerlendirme Toplantısı",
      completed: false,
      color: "warning.lighter",
    },
    {
      id: 11,
      startTime: "11:30",
      endTime: "12:30",
      title: "Ekip Koordinasyon Toplantısı",
      completed: false,
      color: "info.lighter",
    },
  ],
  "2025-02-02": [
    {
      id: 12,
      startTime: "10:00",
      endTime: "11:00",
      title: "AR-GE Proje Sunumu",
      completed: false,
      color: "success.lighter",
    },
    {
      id: 13,
      startTime: "13:30",
      endTime: "14:30",
      title: "Departmanlar Arası Koordinasyon",
      completed: false,
      color: "primary.lighter",
    },
  ],
  "2025-02-03": [
    {
      id: 14,
      startTime: "09:00",
      endTime: "10:30",
      title: "Haftalık Sprint Toplantısı",
      completed: false,
      color: "error.lighter",
    },
    {
      id: 15,
      startTime: "11:00",
      endTime: "12:00",
      title: "Yeni Personel Görüşmesi",
      completed: false,
      color: "warning.lighter",
    },
    {
      id: 16,
      startTime: "14:00",
      endTime: "15:00",
      title: "Proje İlerleme Raporu",
      completed: false,
      color: "info.lighter",
    },
  ],
  "2025-02-04": [
    {
      id: 17,
      startTime: "10:00",
      endTime: "11:30",
      title: "Stratejik Planlama Toplantısı",
      completed: false,
      color: "success.lighter",
    },
    {
      id: 18,
      startTime: "13:00",
      endTime: "14:00",
      title: "İş Güvenliği Eğitimi",
      completed: false,
      color: "primary.lighter",
    },
  ],
  "2025-02-05": [
    {
      id: 19,
      startTime: "09:30",
      endTime: "10:30",
      title: "Yazılım Geliştirme Toplantısı",
      completed: false,
      color: "error.lighter",
    },
    {
      id: 20,
      startTime: "11:00",
      endTime: "12:00",
      title: "Müşteri Sunumu",
      completed: false,
      color: "warning.lighter",
    },
  ],
};

export function Takvim() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handlePrevDay = () => {
    setSelectedDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() - 1);
      return newDate;
    });
  };

  const handleNextDay = () => {
    setSelectedDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + 1);
      return newDate;
    });
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  const toggleTaskCompletion = (taskId) => {
    console.log("Toggle task:", taskId);
  };

  const dateKey = fDate(selectedDate, formatPatterns.paramCase.date);
  const tasksForDay = TASKS[dateKey] || [];
  const formattedDate = fDate(selectedDate, formatPatterns.date);

  return (
    <Card
      sx={{
        height: 496,
        backgroundColor: "background.paper",
        borderRadius: "16px",
        padding: 3,
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6">Takvim</Typography>
        <Button variant="contained" color="error" size="small" onClick={handleToday}>
          Bugün
        </Button>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {formattedDate}
        </Typography>
        <IconButton onClick={handlePrevDay} size="small">
          <Iconify icon="eva:arrow-ios-back-fill" />
        </IconButton>
        <IconButton onClick={handleNextDay} size="small">
          <Iconify icon="eva:arrow-ios-forward-fill" />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          overflow: "auto",
          flex: 1,
        }}
      >
        {tasksForDay.length > 0 ? (
          tasksForDay.map((task) => (
            <Box
              key={task.id}
              onClick={() => toggleTaskCompletion(task.id)}
              sx={{
                display: "flex",
                flexDirection: "column",
                p: 2,
                backgroundColor: task.color,
                borderRadius: 1,
                cursor: "pointer",
                position: "relative",
                "&:hover": {
                  opacity: 0.9,
                },
              }}
            >
              <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
                {task.startTime} / {task.endTime}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.completed ? "text.disabled" : "text.primary",
                }}
              >
                {task.title}
              </Typography>
            </Box>
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Typography color="text.secondary">Bu tarihte görev bulunmamaktadır</Typography>
          </Box>
        )}
      </Box>
    </Card>
  );
}
