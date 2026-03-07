import { Grid2 } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";
import { CONFIG } from "src/global-config";
import { useGetProject } from "src/hooks/getters/use-get-project";
import { DashboardContent } from "src/pages/protected/layout";
import { paths } from "src/routes/paths";
import { DateForm, Files, GeneralInfo, ProjectStatus } from "./view-components";

// ----------------------------------------------------------------------

const metadata = { title: `Projeler - ${CONFIG.appName}` };

export default function Page() {
  const { id } = useParams();

  const { project } = useGetProject(id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DashboardContent>
        <CustomBreadcrumbs
          heading="Projeler"
          links={[
            { name: "Anasayfa", href: paths.anasayfa.root },
            { name: "Görev yönetimi", href: paths.anasayfa.gorevYonetimi.root },
            { name: "Projeler", href: paths.anasayfa.gorevYonetimi.projeler.root },
            { name: project.name },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <Grid2 container spacing={3}>
          <Grid2 item size={12}>
            <GeneralInfo name={project.name} description={project.description} />
          </Grid2>
          <Grid2 item size={{ xs: 12, md: 7 }}>
            <DateForm startDate={project.start_date} endDate={project.end_date} />
          </Grid2>
          <Grid2 item size={{ xs: 12, md: 5 }}>
            <ProjectStatus status={project.status} />
          </Grid2>
          <Grid2 item size={12}>
            <Files />
          </Grid2>
        </Grid2>
      </DashboardContent>
    </>
  );
}
