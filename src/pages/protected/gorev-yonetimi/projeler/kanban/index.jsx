import { Box, Button } from "@mui/material";
import { useBoolean, usePopover } from "minimal-shared/hooks";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";
import { Iconify } from "src/components/iconify";
import { useFetch } from "src/hooks/getters/use-fetch";
import { endpoints } from "src/lib/endpoints";
import { DashboardContent } from "src/pages/protected/layout";
import { paths } from "src/routes/paths";
import { KanbanBoard } from "./board";
import { cssVars } from "./classes";
import { SelectProjectPopover } from "./components/select-project-popover";
import { NewTaskDialog } from "./new-task-dialog";
import { useGetKanbanBoard } from "./actions";
import { KanbanColumnSkeleton } from "./components/kanban-skeleton";

export default function Page() {
  const { id1: projectId = "", id2: boardId = "" } = useParams();
  const { data: currentProject } = useFetch(endpoints.get.projects.id(projectId));
  const { board, isLoading } = useGetKanbanBoard(boardId);

  const { onOpen, open, anchorEl, onClose } = usePopover();
  const newDialog = useBoolean();

  if (!board) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Task | Dashboard - Pviser</title>
      </Helmet>

      <DashboardContent
        maxWidth="lg"
        sx={{
          ...cssVars,
          pb: 0,
          flex: "1 1 0",
          display: "flex",
          overflow: "hidden",
          flexDirection: "column",
        }}
      >
        <CustomBreadcrumbs
          heading="Görev"
          links={[
            { name: "Anasayfa", href: paths.anasayfa.root },
            { name: "Görev yönetimi", href: paths.anasayfa.gorevYonetimi.root },
            { name: "Projeler", href: paths.anasayfa.gorevYonetimi.projeler.root },
            { name: currentProject?.name },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={newDialog.onTrue}
            >
              Yeni Görev
            </Button>
          }
          sx={{ mb: { xs: 2, md: 3 } }}
        />

        <Button
          endIcon={<Iconify icon="eva:chevron-down-fill" />}
          sx={{ px: 2, mb: { xs: 2, md: 3 }, width: "max-content" }}
          onClick={onOpen}
          variant="outlined"
        >
          {currentProject?.name}
        </Button>

        {isLoading ? (
          <Box sx={{ gap: "var(--column-gap)", display: "flex", alignItems: "flex-start" }}>
            <KanbanColumnSkeleton />
          </Box>
        ) : (
          <KanbanBoard
            projectId={projectId}
            boardId={boardId}
            board={board}
            isLoading={isLoading}
          />
        )}

        <NewTaskDialog open={newDialog.value} onClose={newDialog.onFalse} />

        <SelectProjectPopover open={open} anchorEl={anchorEl} onClose={onClose} />
      </DashboardContent>
    </>
  );
}
