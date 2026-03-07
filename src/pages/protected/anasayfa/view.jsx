import Grid from "@mui/material/Grid2";
import { DashboardContent } from "src/pages/protected/layout";
import { _appFeatured, _userFeeds } from "src/_mock";
import { Duyurular } from "./components/duyurular";
import { Ilanlar } from "./components/ilanlar";
import { AppFeatured } from "./components/app-featured";
import { SosyalMecra } from "./components/sosyal-medya";
import { Takvim } from "./components/takvim";
import { Anketler } from "./components/anketler";

// ----------------------------------------------------------------------

export function OverviewAppView() {
  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Duyurular />
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <AppFeatured list={_appFeatured} />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Takvim />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Ilanlar />
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <SosyalMecra posts={_userFeeds} />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Anketler />
        </Grid>

        {/* <Grid size={{ xs: 12, lg: 8 }}>
          <AppNewInvoice
            title="Bekleyen Talepler"
            tableData={_appInvoices}
            headCells={[
              { id: "id", label: "Talep Numarası" },
              { id: "category", label: "Başlık" },
              { id: "status", label: "Durum" },
              { id: "" },
            ]}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AppTopRelated title="Dökümanlar" list={_appRelated} />
        </Grid> */}
      </Grid>
    </DashboardContent>
  );
}
