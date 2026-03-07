import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import { fNumber } from "src/utils/format-number";
import { Chart, useChart, ChartLegends } from "src/components/chart";
import { varAlpha } from "minimal-shared/utils";
import { sumBy } from "es-toolkit";
import { DashboardContent } from "src/pages/protected/layout";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid2,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";
import { paths } from "src/routes/paths";
import { Iconify } from "src/components/iconify";

// {
//   "id": "23f51288-a05b-4be0-883a-94f5f1a4d96d",
//   "created_at": "2025-01-21T17:55:17.698Z",
//   "updated_at": "2025-01-21T17:55:17.698Z",
//   "title": "Melih Anket",
//   "description": "Anket Desc",
//   "status": "Active",
//   "created_by": "2646a9e8-b9bb-4b0f-b15c-68494c1cd589"
// },

function Title() {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h5" component="h1" gutterBottom>
          Personel Memnuniyeti Anketi
        </Typography>
      </CardContent>
    </Card>
  );
}

function Buttons() {
  return (
    <Card>
      <CardContent>
        <Button
          startIcon={<Iconify icon="solar:download-minimalistic-bold" />}
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        >
          Sonuçları PDF Formatında İndir
        </Button>
        <Button
          startIcon={<Iconify icon="solar:download-minimalistic-bold" />}
          variant="outlined"
          fullWidth
        >
          Sonuçları Excel Formatında İndir
        </Button>
      </CardContent>
    </Card>
  );
}

function RadialResult() {
  const theme = useTheme();

  const chartSeries = [
    { label: "Sold out", value: 120 },
    { label: "Available", value: 67 },
  ];

  const total = sumBy(chartSeries, (series) => series.value);

  const chartOptions = useChart({
    chart: { sparkline: { enabled: true } },
    stroke: { width: 0 },
    fill: {
      type: "gradient",
      gradient: {
        colorStops: [
          { offset: 0, color: theme.palette.primary.light, opacity: 1 },
          { offset: 100, color: theme.palette.primary.main, opacity: 1 },
        ],
      },
    },
    plotOptions: {
      radialBar: {
        hollow: { margin: -20 },
        track: { margin: -20, background: varAlpha(theme.vars.palette.grey["500Channel"], 0.08) },
        dataLabels: {
          name: { offsetY: -12 },
          value: { offsetY: 6 },
          total: { label: "Kullanıcı", formatter: () => fNumber(total) },
        },
      },
    },
  });

  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title="Katılımcılar" />
      <CardContent>
        <Chart
          type="radialBar"
          series={[(chartSeries.filter((i) => i.label === "Sold out")[0].value / total) * 100]}
          options={chartOptions}
        />
      </CardContent>
    </Card>
  );
}

function PieChart({ title, subheader, chart, sx, ...other }) {
  const theme = useTheme();

  const chartSeries = chart.series.map((item) => item.value);

  const chartColors = chart.colors ?? [
    theme.palette.primary.main,
    theme.palette.warning.light,
    theme.palette.info.dark,
    theme.palette.error.main,
  ];

  const chartOptions = useChart({
    chart: { sparkline: { enabled: true } },
    colors: chartColors,
    labels: chart.series.map((item) => item.label),
    stroke: { width: 0 },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      y: {
        formatter: (value) => fNumber(value),
        title: { formatter: (seriesName) => `${seriesName}` },
      },
    },
    plotOptions: { pie: { donut: { labels: { show: false } } } },
    ...chart.options,
  });

  return (
    <Card>
      <CardHeader title={title} subheader={subheader} />

      <Chart
        type="pie"
        series={chartSeries}
        options={chartOptions}
        sx={{
          my: 6,
          mx: "auto",
          width: { xs: 240, xl: 260 },
          height: { xs: 240, xl: 260 },
        }}
      />

      <Divider sx={{ borderStyle: "dashed" }} />

      <ChartLegends
        labels={chartOptions?.labels}
        colors={chartOptions?.colors}
        sx={{ p: 3, justifyContent: "center" }}
      />
    </Card>
  );
}

function OrnekSonuc() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ pb: 2 }}>
          Personelin vatandaşlarla iletişimi ve yardımseverliği hakkında ne düşünüyorsunuz?
        </Typography>
        {[
          "Çalışma alanlarının daha sessiz ve izole olması için düzenlemeler yapılabilir.",
          "Daha iyi bir havalandırma sistemi, verimliliği artırabilir.",
          "Çalışanlar için dinlenme alanları veya kısa mola yerleri oluşturulabilir.",
          "Dijital araçların modernleştirilmesi işleri hızlandırabilir.",
          "Işıklandırma koşulları göz yormayacak şekilde düzenlenebilir.",
        ].map((item, i) => (
          <Card
            key={i}
            sx={{ mb: 2, bgcolor: (th) => th.palette.background.default }}
            variant="elevation"
          >
            <CardContent>
              <Typography variant="body1">{item}</Typography>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}

function OrnekSonuc2() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ pb: 2 }}>
          Çalıştığınız birimde iş arkadaşlarınızla etkili bir iletişim kurabildiğinizi düşünüyor
          musunuz?
        </Typography>
        <Stack direction="column" spacing={2}>
          <Typography variant="caption" color="text.secondary">
            Katılmıyorum
          </Typography>
          {[1, 2, 3, 4, 5].map((item) => (
            <Stack direction="row" spacing={2} key={item} alignItems="center">
              <Typography variant="subtitle2" color="text.secondary" sx={{ textWrap: "nowrap" }}>
                {item} ({Math.floor(Math.random() * 90) + 10} cevap)
              </Typography>
              <LinearProgress
                variant="determinate"
                value={Math.floor(Math.random() * 90) + 10}
                color="primary"
                sx={{ maxWidth: "100%", width: "100%" }}
              />
            </Stack>
          ))}
          <Typography variant="caption" color="text.secondary">
            Katılıyorum
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export function AnketSonucView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Anket Sonuçları"
        links={[
          { name: "Anasayfa", href: paths.anasayfa.root },
          { name: "Admin paneli", href: paths.anasayfa.admin.root },
          { name: "Anket sonuçları" },
        ]}
        sx={{ mb: { xs: 2, md: 3 } }}
      />

      <Box>
        <Grid2 container spacing={3} maxWidth={960} marginInline="auto">
          <Grid2 item size={{ xs: 12, md: 8 }}>
            <Title />
            <Buttons />
          </Grid2>
          <Grid2 item size={{ xs: 12, md: 4 }}>
            <RadialResult />
          </Grid2>
          <Grid2 item size={{ xs: 12, md: 6 }} height="100%">
            <PieChart
              title="Kurumumuza ulaşımınızı nasıl değerlendiriyorsunuz?"
              chart={{
                series: [
                  { label: "Çok zor", value: 3500 },
                  { label: "Zor", value: 2500 },
                  { label: "Kolay", value: 1500 },
                  { label: "Çok kolay", value: 500 },
                ],
              }}
            />
          </Grid2>
          <Grid2 item size={{ xs: 12, md: 6 }} height="100%">
            <PieChart
              title="Çalışma ortamınızı genel olarak nasıl değerlendirirsiniz?"
              chart={{
                series: [
                  { label: "Çok memnunum", value: 3500 },
                  { label: "Memnunum", value: 2500 },
                  { label: "Kararsızım", value: 1500 },
                  { label: "Memnun değilim", value: 500 },
                ],
              }}
            />
          </Grid2>
          <Grid2 item size={12}>
            <OrnekSonuc />
          </Grid2>
          <Grid2 item size={12}>
            <OrnekSonuc2 />
          </Grid2>
        </Grid2>
      </Box>
    </DashboardContent>
  );
}
