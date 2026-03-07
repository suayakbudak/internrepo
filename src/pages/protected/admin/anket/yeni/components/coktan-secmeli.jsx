import { Box, Button } from "@mui/material";
import { SoruHeader } from "./soru-header";
import { Editor } from "src/components/editor";
import { Secenek } from "./secenek-ekle";
import { Iconify } from "src/components/iconify";

export function CoktanSecmeli({
  soruNumarasi,
  value,
  onChange,
  options = [],
  onOptionChange,
  questionId,
}) {
  const handleSecenekEkle = () => {
    onOptionChange(questionId, [...options, ""]);
  };

  const handleOptionValueChange = (index, newValue) => {
    const newOptions = [...options];
    newOptions[index] = newValue;
    onOptionChange(questionId, newOptions);
  };

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

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, height: "36" }}>
        {options.map((option, index) => (
          <Secenek
            key={index}
            index={index}
            value={option}
            onChange={(newValue) => handleOptionValueChange(index, newValue)}
          />
        ))}

        <Button
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleSecenekEkle}
          sx={{
            alignSelf: "flex-start",
            color: "text.primary",
          }}
        >
          Seçenek Ekle
        </Button>
      </Box>
    </Box>
  );
}
