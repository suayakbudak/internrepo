import { Typography, Box, useTheme, Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Form } from "src/components/hook-form";
import { CoktanSecmeli } from "./coktan-secmeli";
import { AcikUclu } from "./acik-uclu";
import { PuanOlcegi } from "./puan-olcegi";

export function Anket({ data }) {
  const theme = useTheme();
  const { title, description, questions } = data;

  // Split description into content and span parts
  const [content, ...spanParts] = description.split("!");
  const span = spanParts.join("!");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case "coktan-secmeli":
        return <CoktanSecmeli key={question.id} data={question} />;
      case "acik-uclu":
        return <AcikUclu key={question.id} data={question} />;
      case "puan-olcegi":
        return <PuanOlcegi key={question.id} data={question} />;
      default:
        return null;
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Box
          sx={{
            width: "704px",
            height: "54px",
            background: theme.palette.action.disabledBackground,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingRight: "14px",
            paddingLeft: "14px",
          }}
        >
          <Typography
            sx={{
              width: "100%",
              fontFamily: theme.typography.fontFamily,
              fontWeight: theme.typography.fontWeightBold,
              fontSize: theme.typography.pxToRem(16),
              lineHeight: 24,
              textAlign: "center",
            }}
          >
            {title}
          </Typography>
        </Box>

        <Box
          sx={{
            width: "704px",
            minHeight: "78px",
            borderRadius: "8px",
            border: "1px solid",
            borderColor: theme.palette.divider,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "14px",
          }}
        >
          <Typography
            sx={{
              fontFamily: theme.typography.fontFamily,
              fontSize: theme.typography.pxToRem(14),
              fontWeight: 400,
              lineHeight: theme.typography.pxToRem(24),
              textAlign: "center",
              mb: 1,
            }}
          >
            {content}!
          </Typography>
          <Typography
            sx={{
              fontFamily: theme.typography.fontFamily,
              fontSize: theme.typography.pxToRem(13),
              fontWeight: 400,
              lineHeight: theme.typography.pxToRem(24),
              textAlign: "center",
            }}
          >
            {span}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {questions.map((question) => renderQuestion(question))}
        </Box>

        <Box sx={{ display: "flex", width: "704px", justifyContent: "flex-end" }}>
          <Stack direction="row" spacing={1}>
            <LoadingButton
              type="button"
              variant="contained"
              size="large"
              sx={{
                // bgcolor: "#1C252E",
                // color: "#FFFFFF",
                // "&:hover": {
                //   bgcolor: "#454F5B",
                // },
                fontFamily: theme.typography.fontFamily,
                textTransform: "none",
              }}
            >
              Devam etmek üzere kaydet
            </LoadingButton>

            <LoadingButton
              type="reset"
              variant="outlined"
              size="large"
              sx={{
                bgcolor: "action.disabledBackground",
                border: "none",
                // color: "#1C252E",
                // "&:hover": {
                //   border: "none",
                //   bgcolor: "#919EAB33",
                // },
              }}
            >
              Temizle
            </LoadingButton>

            <LoadingButton
              type="submit"
              variant="contained"
              size="large"
              sx={{
                bgcolor: theme.palette.primary.main,
                // color: "#FFFFFF",
                // "&:hover": {
                //   bgcolor: "#2D996C",
                // },
                fontFamily: theme.typography.fontFamily,
                textTransform: "none",
              }}
            >
              Gönder
            </LoadingButton>
          </Stack>
        </Box>
      </Box>
    </Form>
  );
}
