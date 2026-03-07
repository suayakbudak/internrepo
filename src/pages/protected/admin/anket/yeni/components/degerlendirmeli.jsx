import { Box } from "@mui/material";
import { SoruHeader } from "./soru-header";
import { Editor } from "src/components/editor";
import { DegerlendirmeBox } from "./degerlendirme-box";

export function Degerlendirmeli({ soruNumarasi, value, onChange }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <SoruHeader soruNumarasi={soruNumarasi} />
      <Editor
        placeholder="Sorunuzu buraya yazın..."
        value={value}
        onChange={onChange}
        sx={{
          "& .MuiInputBase-root": {
            bgcolor: "background.paper",
          },
          "& .tiptap": {
            minHeight: 200,
          },
          mb: 1,
          mt: 1,
        }}
      />
      <DegerlendirmeBox />
    </Box>
  );
}
