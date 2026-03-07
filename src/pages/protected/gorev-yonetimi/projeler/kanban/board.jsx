import { DndContext, MeasuringStrategy } from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { KanbanColumn } from "./column/kanban-column";
import { KanbanColumnAdd } from "./column/kanban-column-add";
import { KanbanDragOverlay } from "./components/kanban-drag-overlay";
import { KanbanTaskItem } from "./item/kanban-task-item";
import { useKanbanDrag } from "./use-kanban-drag";
import { cssVars } from "./classes";

// ----------------------------------------------------------------------

const PLACEHOLDER_ID = "placeholder";

// ----------------------------------------------------------------------

export function KanbanBoard({ board, projectId, boardId }) {
  const {
    activeId,
    sensors,
    isSortingContainer,
    columnIds,
    collisionDetectionStrategy,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useKanbanDrag(board, boardId);

  return (
    <DndContext
      id="dnd-kanban"
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <KanbanContent
        projectId={projectId}
        board={board}
        columnIds={columnIds}
        isSortingContainer={isSortingContainer}
        boardId={boardId}
      />

      <KanbanDragOverlay
        columns={board?.columns}
        tasks={board?.tasks}
        activeId={activeId}
        sx={cssVars}
      />
    </DndContext>
  );
}

function KanbanContent({ projectId, board, columnIds, boardId, isSortingContainer }) {
  const sortableHorizontal = {
    items: [...columnIds, PLACEHOLDER_ID],
    strategy: horizontalListSortingStrategy,
  };

  const sortableVertical = (colId) => ({
    items: board.tasks[colId] || [],
    strategy: verticalListSortingStrategy,
  });

  return (
    <Stack sx={{ flex: "1 1 auto", overflowX: "auto" }}>
      <Stack sx={{ pb: 3, display: "unset" }}>
        <Box sx={{ display: "flex", gap: "var(--column-gap)" }}>
          <SortableContext {...sortableHorizontal}>
            {board?.columns.map((col, colIndex) => (
              <KanbanColumn
                key={`col-${col.id}-${colIndex}`}
                projectId={projectId}
                column={col}
                tasks={board.tasks[col.id]}
                boardId={boardId}
              >
                <SortableContext {...sortableVertical(col.id)}>
                  {board.tasks[col.id]?.map((task, taskIndex) => (
                    <KanbanTaskItem
                      key={`task-${task.id}-${taskIndex}`}
                      task={task}
                      columnId={col.id}
                      disabled={isSortingContainer}
                      boardId={boardId}
                    />
                  ))}
                </SortableContext>
              </KanbanColumn>
            ))}

            <KanbanColumnAdd boardId={boardId} id={PLACEHOLDER_ID} />
          </SortableContext>
        </Box>
      </Stack>
    </Stack>
  );
}
