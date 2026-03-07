import { useSortable } from "@dnd-kit/sortable";
import { useBoolean } from "minimal-shared/hooks";
import { useEffect, useState } from "react";

import { KanbanDetailsDialog } from "../details/kanban-details";
import ItemBase from "./item-base";
import { useFetch } from "src/hooks/getters/use-fetch";
import { endpoints } from "src/lib/endpoints";

// ----------------------------------------------------------------------

export function KanbanTaskItem({ task, disabled, columnId, sx, boardId }) {
  const taskDetailsDialog = useBoolean();

  const { setNodeRef, listeners, isDragging, isSorting, transform, transition } = useSortable({
    id: task?.id,
  });

  const mounted = useMountStatus();
  const mountedWhileDragging = isDragging && !mounted;

  const { data: taskDetails } = useFetch(endpoints.get.tasks.id(task.id));

  return (
    <>
      <ItemBase
        ref={disabled ? undefined : setNodeRef}
        task={taskDetails}
        open={taskDetailsDialog.value}
        onClick={taskDetailsDialog.onTrue}
        stateProps={{
          transform,
          listeners,
          transition,
          sorting: isSorting,
          dragging: isDragging,
          fadeIn: mountedWhileDragging,
        }}
        sx={sx}
      />

      {taskDetails && (
        <KanbanDetailsDialog
          task={taskDetails}
          open={taskDetailsDialog.value}
          onClose={taskDetailsDialog.onFalse}
          boardId={boardId}
          columnId={columnId}
        />
      )}
    </>
  );
}

// ----------------------------------------------------------------------

function useMountStatus() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 500);

    return () => clearTimeout(timeout);
  }, []);

  return isMounted;
}
