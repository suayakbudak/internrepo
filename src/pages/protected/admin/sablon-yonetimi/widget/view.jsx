import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { DashboardContent } from "src/pages/protected/layout";
import { _appAuthors, _appFeatured, _appInstalled, _userFeeds } from "src/_mock";

import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";

import { svgColorClasses } from "src/components/svg-color";

import { Ilanlar } from "../olustur/components/ilanlar";
import { AppWidget } from "../olustur/components/app-widget";
import { HavaDurumu } from "../olustur/components/hava-durumu";
import { AppWelcome } from "../olustur/components/app-welcome";
import { AppFeatured } from "../olustur/components/app-featured";
import { YemekMenusu } from "../olustur/components/yemek-menusu";
import { SosyalMecra } from "../olustur/components/sosyal-medya";
import { DogumGunleri } from "../olustur/components/dogum-gunleri";
import { AppTopAuthors } from "../olustur/components/app-top-authors";
import { AppAreaInstalled } from "../olustur/components/app-area-installed";
import { AppWidgetSummary } from "../olustur/components/app-widget-summary";
import { AppCurrentDownload } from "../olustur/components/app-current-download";
import { AppTopInstalledCountries } from "../olustur/components/app-top-installed-countries";

// ----------------------------------------------------------------------

export function WidgetView() {
  const theme = useTheme();

  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Widget"
        links={[{ name: "Anasayfa" }, { name: "Admin Panel" }, { name: "Widget" }]}
        sx={{ mb: { xs: 2, md: 3 } }}
      />
      <Card>
        <Accordion defaultExpanded>
          <AccordionSummary
            sx={{ height: 100 }}
            aria-controls="panel1-content"
            id="panel1-header"
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography>Grafikler</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <AppWidgetSummary
                  title="Total active users"
                  percent={2.6}
                  total={18765}
                  chart={{
                    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
                    series: [15, 18, 12, 51, 68, 11, 39, 37],
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <AppWidgetSummary
                  title="Total installed"
                  percent={0.2}
                  total={4876}
                  chart={{
                    colors: [theme.palette.info.main],
                    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
                    series: [20, 41, 63, 33, 28, 35, 50, 46],
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <AppWidgetSummary
                  title="Total downloads"
                  percent={-0.1}
                  total={678}
                  chart={{
                    colors: [theme.palette.error.main],
                    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
                    series: [18, 19, 31, 8, 16, 37, 12, 33],
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <AppCurrentDownload
                  title="Current download"
                  subheader="Downloaded by operating system"
                  chart={{
                    series: [
                      { label: "Mac", value: 12244 },
                      { label: "Window", value: 53345 },
                      { label: "iOS", value: 44313 },
                      { label: "Android", value: 78343 },
                    ],
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6, lg: 8 }}>
                <AppAreaInstalled
                  title="Area installed"
                  subheader="(+43%) than last year"
                  chart={{
                    categories: [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ],
                    series: [
                      {
                        name: "2022",
                        data: [
                          { name: "Asia", data: [12, 10, 18, 22, 20, 12, 8, 21, 20, 14, 15, 16] },
                          { name: "Europe", data: [12, 10, 18, 22, 20, 12, 8, 21, 20, 14, 15, 16] },
                          {
                            name: "Americas",
                            data: [12, 10, 18, 22, 20, 12, 8, 21, 20, 14, 15, 16],
                          },
                        ],
                      },
                      {
                        name: "2023",
                        data: [
                          { name: "Asia", data: [6, 18, 14, 9, 20, 6, 22, 19, 8, 22, 8, 17] },
                          { name: "Europe", data: [6, 18, 14, 9, 20, 6, 22, 19, 8, 22, 8, 17] },
                          { name: "Americas", data: [6, 18, 14, 9, 20, 6, 22, 19, 8, 22, 8, 17] },
                        ],
                      },
                      {
                        name: "2024",
                        data: [
                          { name: "Asia", data: [6, 20, 15, 18, 7, 24, 6, 10, 12, 17, 18, 10] },
                          { name: "Europe", data: [6, 20, 15, 18, 7, 24, 6, 10, 12, 17, 18, 10] },
                          { name: "Americas", data: [6, 20, 15, 18, 7, 24, 6, 10, 12, 17, 18, 10] },
                        ],
                      },
                    ],
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <AppTopInstalledCountries title="Top installed countries" list={_appInstalled} />
              </Grid>

              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <AppTopAuthors title="Top authors" list={_appAuthors} />
              </Grid>

              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <Box sx={{ gap: 3, display: "flex", flexDirection: "column" }}>
                  <AppWidget
                    title="Conversion"
                    total={38566}
                    icon="solar:user-rounded-bold"
                    chart={{ series: 48 }}
                  />

                  <AppWidget
                    title="Applications"
                    total={55566}
                    icon="fluent:mail-24-filled"
                    chart={{
                      series: 75,
                      colors: [theme.vars.palette.info.light, theme.vars.palette.info.main],
                    }}
                    sx={{
                      bgcolor: "info.dark",
                      [`& .${svgColorClasses.root}`]: { color: "info.light" },
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Card>
      <Card sx={{ my: 3 }}>
        <Accordion>
          <AccordionSummary
            sx={{ height: 100 }}
            aria-controls="panel1-content"
            id="panel1-header"
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography>Günlük Araçlar</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }} container>
                <Grid container size={{ xs: 12 }}>
                  <Grid item size={8}>
                    <HavaDurumu title="Hoşgeldiniz" />
                  </Grid>
                  <Grid item size={4}>
                    <AppWelcome
                      title="Dosya Yönetimi"
                      action={
                        <Button variant="contained" color="primary">
                          Görüntüle
                        </Button>
                      }
                    />
                  </Grid>
                </Grid>
                <Grid container size={{ xs: 12 }}>
                  <Grid item size={4}>
                    <DogumGunleri
                      title="Doğum Günleri"
                      description="Melih KOCAMAN"
                      description2="Bilgi İşlem Müdürü"
                    />
                  </Grid>
                  <Grid item size={8}>
                    <YemekMenusu title="Yemek Menüsü" description="10.12.2024" />
                  </Grid>
                </Grid>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <AppFeatured list={_appFeatured} />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Card>
      <Card>
        <Accordion>
          <AccordionSummary
            sx={{ height: 100 }}
            aria-controls="panel2-content"
            id="panel2-header"
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography>Sosyal Araçlar</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <SosyalMecra posts={_userFeeds} />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Ilanlar />
              </Grid>

              {/* <Grid size={{ xs: 12, lg: 8 }}>
                            <AppNewInvoice
                                title="Bekleyen Talepler"
                                tableData={_appInvoices}
                                headCells={[
                                    { id: 'id', label: 'Talep Numarası' },
                                    { id: 'category', label: 'Başlık' },
                                    { id: 'status', label: 'Durum' },
                                    { id: '' },
                                ]}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                            <AppTopRelated title="Dökümanlar" list={_appRelated} />
                        </Grid> */}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Card>
    </DashboardContent>
  );
}
