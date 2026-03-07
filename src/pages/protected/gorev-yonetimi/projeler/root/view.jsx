import Button from "@mui/material/Button";
import { useBoolean } from "minimal-shared/hooks";
import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";
import { Iconify } from "src/components/iconify";
import { DashboardContent } from "src/pages/protected/layout";
import { paths } from "src/routes/paths";
import { NewProjectDialog } from "./new-project-dialog";

import { Suspense } from "react";
import { ProjectTable } from "./projects-table-com/table";

export function ProjelerView() {
  const newDialog = useBoolean();

  return (
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
            onClick={newDialog.onTrue}
          >
            Yeni proje
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <NewProjectDialog open={newDialog.value} onClose={newDialog.onFalse} />
      <Suspense fallback={<div>Loading...</div>}>
        <ProjectTable />
      </Suspense>
    </DashboardContent>
  );
}
