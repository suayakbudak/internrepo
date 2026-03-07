import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { useCallback, useEffect, useState } from "react";
import { Iconify } from "src/components/iconify";
import { useGetKanbanBoard } from "../../actions";
import { useBoolean } from "minimal-shared/hooks";
import { NewTaskDialog } from "../../new-task-dialog";

const SUBTASKS = [
  "Complete project proposal",
  "Conduct market research",
  "Design user interface mockups",
  "Develop backend api",
  "Implement authentication system",
];

export function TaskSubTasks({ parentTask, boardId }) {
  const { board } = useGetKanbanBoard(boardId);
  const [subtaskCompleted, setSubtaskCompleted] = useState(SUBTASKS.slice(0, 2));
  const [subTasks, setSubTasks] = useState([]);

  const newSubTaskDialog = useBoolean();

  useEffect(() => {
    if (board.tasks) {
      const currentColumnTasks = board.tasks[parentTask.column.id];

      const relatedTasks = currentColumnTasks.filter((t) => t.parentTask?.id === parentTask.id);
      setSubTasks(relatedTasks);
    }
  }, [board.tasks, parentTask]);

  const handleClickSubtaskComplete = useCallback((taskId) => {
    setSubtaskCompleted((prev) =>
      prev.includes(taskId) ? prev.filter((value) => value !== taskId) : [...prev, taskId]
    );
  }, []);

  return (
    <>
      <div>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {subtaskCompleted.length} of {SUBTASKS.length}
        </Typography>

        <LinearProgress
          variant="determinate"
          value={(subtaskCompleted.length / SUBTASKS.length) * 100}
        />
      </div>

      <FormGroup>
        {subTasks.map((taskItem) => (
          <FormControlLabel
            key={taskItem.id}
            control={
              <Checkbox
                disableRipple
                name={taskItem.id}
                checked={subtaskCompleted.includes(taskItem.id)}
              />
            }
            label={taskItem.title}
            onChange={() => handleClickSubtaskComplete(taskItem.id)}
          />
        ))}
      </FormGroup>

      <Button
        variant="outlined"
        startIcon={<Iconify icon="mingcute:add-line" />}
        sx={{ alignSelf: "flex-start" }}
        onClick={newSubTaskDialog.onTrue}
      >
        Yeni alt görev
      </Button>

      <NewTaskDialog
        isSubTask={1}
        open={newSubTaskDialog.value}
        onClose={newSubTaskDialog.onFalse}
        defaultColumnId={parentTask.column.id}
        defaultParentTaskId={parentTask.id}
      />
    </>
  );
}
