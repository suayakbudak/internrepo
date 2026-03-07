import {
  closestCenter,
  closestCorners,
  getFirstCollision,
  KeyboardSensor,
  MouseSensor,
  pointerWithin,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { startTransition, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { axiosAuth } from "src/lib/axios";
import { endpoints } from "src/lib/endpoints";
import { mutate } from "swr";
import { coordinateGetter } from "./utils";
import { moveTask } from "./actions";

export function useKanbanDrag(board, boardId) {
  const recentlyMovedToNewContainer = useRef(false);
  const lastOverId = useRef(null);
  const [activeId, setActiveId] = useState(null);

  const columnIds = useMemo(() => board?.columns?.map((column) => column.id) || [], [board]);

  const isSortingContainer = activeId != null ? columnIds.includes(activeId) : false;

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 3 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, { coordinateGetter })
  );

  const findColumn = useCallback(
    (id) => {
      if (id in board.tasks) {
        return id;
      }
      return Object.keys(board.tasks).find((key) =>
        board.tasks[key].map((task) => task.id).includes(id)
      );
    },
    [board.tasks]
  );

  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeId && activeId in board.tasks) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            (column) => column.id in board.tasks
          ),
        });
      }

      const pointerIntersections = pointerWithin(args);
      const cornersCollisions = closestCorners(args);
      const centerCollisions = closestCenter(args);

      const intersections =
        !!pointerIntersections.length && !!centerCollisions.length && !!cornersCollisions.length
          ? pointerIntersections
          : null;

      let overId = getFirstCollision(intersections, "id");

      if (overId != null) {
        if (overId in board.tasks) {
          const columnItems = board.tasks[overId].map((task) => task.id);

          if (columnItems.length > 0) {
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (column) => column.id !== overId && columnItems.includes(column.id)
              ),
            })[0]?.id;
          }
        }

        lastOverId.current = overId;
        return [{ id: overId }];
      }

      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeId;
      }

      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeId, board?.tasks]
  );

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, []);

  const handleDragStart = useCallback(({ active }) => {
    setActiveId(active.id);
  }, []);

  const handleDragOver = useCallback(
    ({ active, over }) => {
      const overId = over?.id;

      if (overId == null || active.id in board.tasks) {
        return;
      }

      const overColumn = findColumn(overId);
      const activeColumn = findColumn(active.id);

      if (!overColumn || !activeColumn) {
        return;
      }

      if (activeColumn !== overColumn) {
        const activeItems = board.tasks[activeColumn].map((task) => task.id);
        const overItems = board.tasks[overColumn].map((task) => task.id);
        const overIndex = overItems.indexOf(overId);
        const activeIndex = activeItems.indexOf(active.id);

        let newIndex;

        if (overId in board.tasks) {
          newIndex = overItems.length + 1;
        } else {
          const isBelowOverItem =
            over &&
            active.rect.current.translated &&
            active.rect.current.translated.top > over.rect.top + over.rect.height;

          const modifier = isBelowOverItem ? 1 : 0;

          newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
        }

        recentlyMovedToNewContainer.current = true;

        const updateTasks = {
          ...board.tasks,
          [activeColumn]: board.tasks[activeColumn].filter((task) => task.id !== active.id),
          [overColumn]:
            board.tasks[overColumn].length > 0
              ? [
                  ...board.tasks[overColumn].slice(0, newIndex),
                  board.tasks[activeColumn][activeIndex],
                  ...board.tasks[overColumn].slice(newIndex, board.tasks[overColumn].length),
                ]
              : [board.tasks[activeColumn][activeIndex]],
        };

        const movedTaskId = board.tasks[activeColumn][activeIndex].id;
        const movedToColumnId = overColumn;

        if (movedTaskId == null || movedToColumnId == null) {
          return;
        }

        moveTask(updateTasks, boardId, movedTaskId, movedToColumnId);
      }
    },
    [board.tasks, boardId, findColumn]
  );

  const handleDragEnd = useCallback(
    async ({ active, over }) => {
      if (active.id in board.tasks && over?.id) {
        const activeIndex = columnIds.indexOf(active.id);
        const overIndex = columnIds.indexOf(over.id);

        const updateColumns = [...board.columns];
        const [removed] = updateColumns.splice(activeIndex, 1);
        updateColumns.splice(overIndex, 0, removed);

        /**
         * Work in local
         */
        startTransition(() => {
          mutate(
            boardId,
            (data) => ({
              ...data,
              columns: updateColumns,
            }),
            false
          );
        });

        /**
         * Work on server
         */
        await axiosAuth.post(endpoints.patch.tasks.updateStatus(active.id), { status: over.id });
      }

      const activeColumn = findColumn(active.id);

      if (!activeColumn) {
        setActiveId(null);
        return;
      }

      const overId = over?.id;

      if (overId == null) {
        setActiveId(null);
        return;
      }

      const overColumn = findColumn(overId);

      if (overColumn) {
        const activeContainerTaskIds = board.tasks[activeColumn].map((task) => task.id);
        const overContainerTaskIds = board.tasks[overColumn].map((task) => task.id);

        const activeIndex = activeContainerTaskIds.indexOf(active.id);
        const overIndex = overContainerTaskIds.indexOf(overId);

        if (activeIndex !== overIndex) {
          const updateTasks = {
            ...board.tasks,
            [overColumn]: [
              ...board.tasks[overColumn].slice(0, overIndex),
              board.tasks[overColumn][activeIndex],
              ...board.tasks[overColumn].slice(overIndex, activeIndex),
              ...board.tasks[overColumn].slice(activeIndex + 1),
            ],
          };

          moveTask(updateTasks, boardId, active.id, over.id);
        }
      }

      setActiveId(null);
    },
    [board.tasks, board.columns, findColumn, columnIds, boardId]
  );

  return {
    activeId,
    sensors,
    isSortingContainer,
    columnIds,
    collisionDetectionStrategy,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
}
