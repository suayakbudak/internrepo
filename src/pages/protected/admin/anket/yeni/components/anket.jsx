import { Box, Card, Stack, TextField } from "@mui/material";
import { OptionMenu } from "./option-menu";
import { CoktanSecmeli } from "./coktan-secmeli";
import { Degerlendirmeli } from "./degerlendirmeli";
import { AcikUclu } from "./acik-uclu";
import { LoadingButton } from "@mui/lab";
import { themeConfig } from "src/assets/theme";
import { AnketActions } from "./anket-actions";
import { SoruEkle } from "./soru-ekle";
import { useAnketForm } from "../anket-hook-form";
import { useRouter } from "src/routes/hooks";
import { paths } from "src/routes/paths";
import { SoruHeader } from "./soru-header";

export function Anket() {
  const {
    questions,
    selectedType,
    title,
    subtitle,
    surveyId,
    errors,
    isSubmitting,
    expandedQuestionId,
    setExpandedQuestionId,
    setSelectedType,
    setTitle,
    setSubtitle,
    setErrors,
    handleAddQuestion,
    handleDeleteQuestion,
    handleCreateSurvey,
    handleQuestionTextChange,
    setQuestions,
    handleQuestionOptionsChange,
  } = useAnketForm();

  const router = useRouter();

  const renderQuestion = (question) => {
    switch (question.type) {
      case "Multiple Choice":
        return (
          <CoktanSecmeli
            soruNumarasi={question.id}
            value={question.text}
            onChange={(text) => handleQuestionTextChange(question.id, text)}
            options={question.options || []}
            onOptionChange={handleQuestionOptionsChange}
            questionId={question.id}
          />
        );
      case "Open Ended":
        return (
          <Degerlendirmeli
            soruNumarasi={question.id}
            value={question.text}
            onChange={(text) => handleQuestionTextChange(question.id, text)}
          />
        );
      case "Rating":
        return (
          <AcikUclu
            soruNumarasi={question.id}
            value={question.text}
            onChange={(text) => handleQuestionTextChange(question.id, text)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        flexDirection: { xs: "column", md: "row" },
        width: { xs: "100%", md: "fit-content" },
        maxWidth: "100%",
        mx: "auto",
        px: { xs: 2, md: 0 },
        alignItems: { xs: "stretch", md: "flex-start" },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "712px" },
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        <Box
          sx={{
            padding: "14px 14px",
            border: "1px solid #919EAB33",
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            placeholder="Başlık yazınız..."
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors((prev) => ({ ...prev, title: false }));
            }}
            error={errors.title}
            helperText={errors.title && "Başlık zorunludur"}
            disabled={Boolean(isSubmitting || surveyId)}
            variant="standard"
            sx={{
              "& .MuiInputBase-root": {
                fontSize: 16,
                fontWeight: 500,
              },
              "& .MuiInput-root:before, & .MuiInput-root:after": {
                display: "none",
              },
              "& .MuiInputBase-input::placeholder": {
                color: themeConfig.palette.grey[500],
                opacity: 1,
              },
            }}
          />
        </Box>

        <Box
          sx={{
            padding: "14px 14px",
            border: "1px solid #919EAB33",
            borderRadius: 1,
            height: "86px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            multiline
            placeholder="Alt metin yazınız..."
            value={subtitle}
            onChange={(e) => {
              setSubtitle(e.target.value);
              setErrors((prev) => ({ ...prev, subtitle: false }));
            }}
            error={errors.subtitle}
            helperText={errors.subtitle && "Alt metin zorunludur"}
            disabled={Boolean(isSubmitting || surveyId)}
            variant="standard"
            sx={{
              "& .MuiInputBase-root": {
                fontSize: 16,
                fontWeight: 500,
              },
              "& .MuiInput-root:before, & .MuiInput-root:after": {
                display: "none",
              },
              "& .MuiInputBase-input::placeholder": {
                color: themeConfig.palette.grey[500],
                opacity: 1,
              },
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <LoadingButton
            variant="contained"
            size="large"
            onClick={handleCreateSurvey}
            loading={isSubmitting}
            disabled={isSubmitting || surveyId}
            sx={{
              bgcolor: "primary.main",
              color: "common.white",
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
          >
            Anket Yarat
          </LoadingButton>
        </Box>

        {surveyId && (
          <Card
            sx={{
              width: "100%",
              borderRadius: 2,
              padding: 3,
              boxShadow: themeConfig.boxShadow,
            }}
          >
            {questions.map((question, index) => (
              <Box key={question.id}>
                {expandedQuestionId === question.id ? (
                  <>
                    {renderQuestion(question)}
                    {question.isExpanded && (
                      <AnketActions onDelete={() => handleDeleteQuestion(question.id)} />
                    )}
                    {index === questions.length - 1 && (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          mt: 2,
                        }}
                      >
                        <OptionMenu
                          selectedType={selectedType}
                          onTypeChange={setSelectedType}
                          disabled={!surveyId}
                        />
                        <SoruEkle
                          selectedType={selectedType}
                          onClick={handleAddQuestion}
                          disabled={!selectedType}
                        />
                      </Box>
                    )}
                  </>
                ) : (
                  <Box
                    sx={{ cursor: "pointer" }}
                    onClick={() => setExpandedQuestionId(question.id)}
                  >
                    <SoruHeader soruNumarasi={question.id} />
                  </Box>
                )}
              </Box>
            ))}
            {questions.length === 0 && (
              <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <OptionMenu
                  selectedType={selectedType}
                  onTypeChange={setSelectedType}
                  disabled={!surveyId}
                />
                <SoruEkle
                  sx={{ mt: 4 }}
                  selectedType={selectedType}
                  onClick={handleAddQuestion}
                  disabled={!surveyId || !selectedType}
                />
              </Box>
            )}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <Stack direction="row" spacing={1}>
                <LoadingButton
                  type="reset"
                  onClick={() => {
                    setQuestions([]);
                    setErrors({});
                  }}
                  variant="outlined"
                  size="large"
                  color="inherit"
                  disabled={questions.length === 0 || isSubmitting}
                  sx={{
                    color: "text.primary",
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                  }}
                >
                  İptal
                </LoadingButton>

                <LoadingButton
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={questions.length === 0}
                  loading={isSubmitting}
                  onClick={async () => {
                    const confirmed = window.confirm(
                      "Anketi kaydetmek istediğinizden emin misiniz?"
                    );
                    if (confirmed) {
                      try {
                        await handleAddQuestion();
                        setQuestions([]);
                        router.push(paths.anasayfa.admin.anket.listeAdmin);
                      } catch {
                        alert("Anket oluşturma hatası");
                      }
                    }
                  }}
                  sx={{
                    bgcolor: "primary.main",
                    color: "common.white",
                    "&:hover": {
                      bgcolor: "primary.dark",
                    },
                    ml: 2,
                  }}
                >
                  Anket Oluştur
                </LoadingButton>
              </Stack>
            </Box>
          </Card>
        )}
      </Box>
    </Box>
  );
}
