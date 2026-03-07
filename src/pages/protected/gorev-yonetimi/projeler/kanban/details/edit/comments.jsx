import { Box, Stack } from "@mui/material";
import { KanbanDetailsCommentList } from "../kanban-details-comment-list";
import Button from "@mui/material/Button";
import { Editor } from "src/components/editor";

export function Yorumlar({ taskId }) {
  return (
    <>
      <Box>
        <Editor fullWidth multiline rows={2} placeholder="Yorumunuzu yazınız..." />

        <Stack direction="row" justifyContent="end" spacing={1} sx={{ p: 1, width: "100%" }}>
          <Button variant="outlined">İptal</Button>
          <Button variant="contained" color="primary">
            Yorum yap
          </Button>
        </Stack>
      </Box>
      <KanbanDetailsCommentList comments={[]} />
    </>
  );
}
