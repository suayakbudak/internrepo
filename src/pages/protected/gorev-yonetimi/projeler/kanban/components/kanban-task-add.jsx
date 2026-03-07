import ClickAwayListener from "@mui/material/ClickAwayListener";
import FormHelperText from "@mui/material/FormHelperText";
import InputBase, { inputBaseClasses } from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import { useCallback, useMemo, useState } from "react";
import { fAdd } from "src/utils/format-time";

// ----------------------------------------------------------------------

/**
 * KanbanTaskAdd component for adding new tasks to a Kanban board
 * @param {Object} props - Component props
 * @param {boolean} props.openAddTask - Whether the add task form is open
 * @param {Function} props.onAddTask - Callback when task is added
 * @param {Function} props.onCloseAddTask - Callback when add task form is closed
 * @param {string} props.projectId - ID of the project
 * @param {string} props.columnId - ID of the column to add task to
 * @returns {React.ReactElement|null} Rendered component
 */
export function KanbanTaskAdd({ openAddTask, onAddTask, onCloseAddTask, projectId, columnId }) {
  const [taskName, setTaskName] = useState("");

  const defaultTask = useMemo(
    () => ({
      title: taskName.trim() ? taskName : "Untitled",
      description: "",
      priority: "medium",
      due_date: fAdd({ days: 1 }),
      columnId,
      projectId,
      assigned_to: [],
      labels: [],
      taskPeriod: "day",
    }),
    [taskName, columnId, projectId]
  );

  const handleChangeName = useCallback((event) => {
    setTaskName(event.target.value);
  }, []);

  const handleKeyUpAddTask = useCallback(
    (event) => {
      if (event.key === "Enter") {
        onAddTask(defaultTask);
        setTaskName("");
      }
    },
    [defaultTask, onAddTask]
  );

  const handleCancel = useCallback(() => {
    setTaskName("");
    onCloseAddTask();
  }, [onCloseAddTask]);

  if (!openAddTask) {
    return null;
  }

  return (
    <ClickAwayListener onClickAway={handleCancel}>
      <div>
        <Paper
          sx={[
            (theme) => ({
              borderRadius: 1.5,
              bgcolor: "background.default",
              boxShadow: theme.vars.customShadows.z1,
            }),
          ]}
        >
          <InputBase
            autoFocus
            fullWidth
            placeholder="Untitled"
            value={taskName}
            onChange={handleChangeName}
            onKeyUp={handleKeyUpAddTask}
            sx={{
              px: 2,
              height: 56,
              [`& .${inputBaseClasses.input}`]: { p: 0, typography: "subtitle2" },
            }}
          />
        </Paper>

        <FormHelperText sx={{ mx: 1 }}>Press Enter to create the task.</FormHelperText>
      </div>
    </ClickAwayListener>
  );
}
