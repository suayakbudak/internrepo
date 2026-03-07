import { startTransition } from "react";
import { axiosAuth } from "src/lib/axios";
import { endpoints } from "src/lib/endpoints";
import useSWR, { mutate } from "swr";

export async function createColumn(boardId, name) {
  await axiosAuth.post(endpoints.post.boards.createColumn(boardId), { name });
  const newPlaceholderColumn = {
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    name,
    limit: null,
  };
  await mutate(boardId, (data) => ({ ...data, columns: [...data.columns, newPlaceholderColumn] }));
}

export async function updateColumnTitle(boardId, columnId, name) {
  await axiosAuth.put(endpoints.put.boards.column(boardId, columnId), { name });
  await mutate(boardId, (data) => ({
    ...data,
    columns: data.columns.map((column) => (column.id === columnId ? { ...column, name } : column)),
  }));
}

export async function deleteColumn(boardId, columnId) {
  await axiosAuth.delete(endpoints.delete.boards.column(boardId, columnId));
  await mutate(boardId, (data) => ({
    ...data,
    columns: data.columns.filter((column) => column.id !== columnId),
  }));
}

export async function createTask(boardId, values) {
  const res = await axiosAuth.post(endpoints.post.tasks.create, values);
  const insertedTask = res.data.task;

  await mutate(boardId, (data) => ({
    ...data,
    columns: data.columns,
    tasks: {
      ...data.tasks,
      [values.columnId]: data.tasks[values.columnId]
        ? [...data.tasks[values.columnId], insertedTask]
        : [insertedTask],
    },
  }));
}

export function useGetKanbanBoard(boardId) {
  const { data, isLoading } = useSWR(
    boardId,
    async (args) => {
      try {
        const tasksRes = await axiosAuth.get(endpoints.get.boards.tasks(boardId));
        const columnsRes = await axiosAuth.get(endpoints.get.boards.columns(boardId));

        const tasks = columnsRes.data.reduce((acc, column) => {
          const tasksInColumn = tasksRes.data.filter((task) => task.column.id === column.id);
          return { ...acc, [column.id]: tasksInColumn };
        }, {});

        return { tasks, columns: columnsRes.data };
      } catch (error) {
        console.error("Failed to fetch:", error);
        throw error;
      }
    },
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return { board: data, isLoading };
}

export async function updateTask(boardId, taskId, data) {
  await axiosAuth.put(endpoints.put.tasks.id(taskId), data);
  mutate(endpoints.get.tasks.id(taskId), (prev) => ({ ...prev, ...data }));
}

export async function deleteTask() {}

export async function moveTask(updateTasks, boardId, movedTaskId, movedToColumnId) {
  console.count("move fired");
  try {
    await axiosAuth.patch(endpoints.patch.tasks.updateStatus(movedTaskId), {
      status: movedToColumnId,
    });
  } catch (e) {
    console.error("move error", e);
  }

  startTransition(() => {
    mutate(
      boardId,
      (board) => {
        // update board.tasks
        const tasks = updateTasks;

        return { ...board, tasks };
      },
      false
    );
  });
}
