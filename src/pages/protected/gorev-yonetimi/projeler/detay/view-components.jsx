import {
  Box,
  Card,
  CardContent,
  Grid2,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { sumBy } from "es-toolkit";
import { varAlpha } from "minimal-shared";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { _allFiles } from "src/_mock/_files.js";
import { Chart } from "src/components/chart/chart.jsx";
import { useChart } from "src/components/chart/use-chart.js";
import { Field, Form } from "src/components/hook-form";
import { Iconify } from "src/components/iconify/index.js";
import { Upload } from "src/components/upload/index.js";
import { FileRecentItem } from "src/pages/protected/dosya/components/file-recent-item.jsx";
import { fNumber } from "src/utils/format-number.js";
import { ProjectAddContact } from "../root/projects-table-com/add-contact.jsx";
import { getStatusName } from "../utils.js";

/**
 * Renders HTML content with custom styling
 * @param {Object} props Component props
 * @param {string} props.content HTML content to render
 * @returns {JSX.Element}
 */
const HTMLContent = memo(({ content }) => (
  <Box
    dangerouslySetInnerHTML={{ __html: content }}
    sx={{
      "& p": { typography: "body2", m: 0 },
      "& a": { color: "inherit", textDecoration: "none" },
      "& strong": { typography: "subtitle2" },
    }}
  />
));

/**
 * General project information component
 * @param {Object} props Component props
 * @param {string} props.name Project name
 * @param {string} props.description Project description
 * @returns {JSX.Element}
 */
export const GeneralInfo = memo(({ name, description }) => (
  <Card>
    <CardContent>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5" gutterBottom>
          {name}
        </Typography>
        <IconButton>
          <Iconify icon="solar:pen-bold" />
        </IconButton>
      </Stack>
      <HTMLContent content={description} />
    </CardContent>
  </Card>
));

/**
 * Project date form component
 * @param {Object} props Component props
 * @param {string} props.startDate Project start date
 * @param {string} props.endDate Project end date
 * @returns {JSX.Element}
 */
export const DateForm = memo(({ startDate, endDate }) => {
  const methods = useForm({
    defaultValues: {
      start_date: startDate,
      end_date: endDate,
    },
  });

  return (
    <Card>
      <CardContent>
        <Form methods={methods}>
          <Stack spacing={3}>
            <Field.DatePicker name="startDate" label="Başlangıç Tarihi" />
            <Field.DatePicker name="endDate" label="Bitiş Tarihi" />
            <ProjectAddContact name="assignerIds" label="Kişi Ekle" setValue={methods.setValue} />
          </Stack>
        </Form>
      </CardContent>
    </Card>
  );
});

/**
 * Project status component
 * @param {Object} props Component props
 * @param {string} props.status Project status
 * @returns {JSX.Element}
 */
export const ProjectStatus = memo(({ status }) => (
  <Card>
    <CardContent>
      <Typography variant="h5">Proje ilerleme durumu</Typography>
      <Typography variant="body1" color="text.secondary">
        {getStatusName(status)}
      </Typography>
      <Box sx={{ mt: 3 }}>
        <RadialProgress />
      </Box>
    </CardContent>
  </Card>
));

/**
 * Project files component
 * @returns {JSX.Element}
 */
export const Files = memo(() => (
  <Card>
    <CardContent>
      <Upload sx={{ pb: 3 }} />
      <Grid2 container spacing={3}>
        {_allFiles.map((file) => (
          <Grid2 item size={{ sx: 12, md: 6 }} key={file.id}>
            <FileRecentItem file={file} />
          </Grid2>
        ))}
      </Grid2>
    </CardContent>
  </Card>
));

/**
 * Radial progress chart component
 * @returns {JSX.Element}
 */
const RadialProgress = memo(() => {
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
    <Chart
      type="radialBar"
      series={[(chartSeries.filter((i) => i.label === "Sold out")[0].value / total) * 100]}
      options={chartOptions}
    />
  );
});
