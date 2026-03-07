import { Button } from "@mui/material";
import { useBoolean } from "minimal-shared/hooks";
import { Helmet } from "react-helmet-async";
import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";
import { Iconify } from "src/components/iconify";
import { CONFIG } from "src/global-config";
import { DashboardContent } from "src/pages/protected/layout";
import { paths } from "src/routes/paths";
import { NewProjectDialog } from "./new-project-dialog";
import { ProjectTable } from "./projects-table-com/table";

/**
 * Projects page component.
 * Displays a list of projects with ability to add new ones.
 * @return {JSX.Element} The rendered page component
 */
const ProjectsPage = () => {
  const { value: isDialogOpen, onTrue: openDialog, onFalse: closeDialog } = useBoolean();

  return (
    <>
      <Helmet>
        <title>{`Projeler - ${CONFIG.appName}`}</title>
      </Helmet>

      <DashboardContent>
        <CustomBreadcrumbs
          heading="Projeler"
          links={[
            { name: "Anasayfa", href: paths.anasayfa.root },
            { name: "Görev yönetimi", href: paths.anasayfa.gorevYonetimi.root },
            { name: "Projeler" },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openDialog}
            >
              Yeni proje
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <ProjectTable />
        <NewProjectDialog open={isDialogOpen} onClose={closeDialog} />
      </DashboardContent>
    </>
  );
};

export default ProjectsPage;
