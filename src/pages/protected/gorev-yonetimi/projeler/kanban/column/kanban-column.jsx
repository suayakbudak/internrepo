import { defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ColumnBase from "./column-base";
import { KanbanColumnToolBar } from "./kanban-column-toolbar";

// ----------------------------------------------------------------------

const animateLayoutChanges = (args) => defaultAnimateLayoutChanges({ ...args, wasDragging: true });

export function KanbanColumn({ projectId, children, column, tasks, disabled, sx, boardId }) {
  const { attributes, isDragging, listeners, setNodeRef, transition, active, over, transform } =
    useSortable({
      id: column.id,
      data: { type: "container", children: tasks },
      animateLayoutChanges,
    });

  const tasksIds = tasks?.map((task) => task.id) || [];

  const isOverContainer = over
    ? (column.id === over.id && active?.data.current?.type !== "container") ||
      tasksIds.includes(over.id)
    : false;

  return (
    <ColumnBase
      ref={disabled ? undefined : setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      sx={sx}
      stateProps={{
        dragging: isDragging,
        overContainer: isOverContainer,
        handleProps: { ...attributes, ...listeners },
      }}
      slots={{
        header: (
          <KanbanColumnToolBar
            projectId={projectId}
            boardId={boardId}
            columnId={column.id}
            columnName={column.name}
            handleProps={{ ...attributes, ...listeners }}
            totalTasks={tasks?.length || 0}
          />
        ),
        main: children,
      }}
    />
  );
}
