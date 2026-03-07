import { useState } from "react";
import { createSurvey, createSurveyQuestion, deleteSurveyQuestion } from "src/lib/actions/anket";

export const useAnketForm = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [surveyId, setSurveyId] = useState(null);
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);

  const [errors, setErrors] = useState({
    title: false,
    subtitle: false,
    questionText: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateSurvey = async () => {
    if (!title.trim() || !subtitle.trim()) {
      setErrors({
        title: !title.trim(),
        subtitle: !subtitle.trim(),
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const surveyData = {
        title: title.trim(),
        description: subtitle.trim(),
        status: "Inactive",
      };

      const response = await createSurvey(surveyData);
      setSurveyId(response.id);
    } catch (error) {
      console.error("Survey creation failed:", error);
      setErrors({
        title: true,
        subtitle: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuestionOptionsChange = (questionId, newOptions) => {
    setQuestions(questions.map((q) => (q.id === questionId ? { ...q, options: newOptions } : q)));
  };

  const saveQuestion = async (question) => {
    if (!question?.text?.trim()) {
      setErrors((prev) => ({ ...prev, questionText: true }));
      return null;
    }

    try {
      const questionData = {
        question_text: question.text.trim(),
        question_type: question.type,
      };

      // Add options if it's a multiple choice question
      if (question.type.toLowerCase() === "multiple choice") {
        // Filter out empty options and trim whitespace
        const validOptions = (question.options || [])
          .map((opt) => opt.trim())
          .filter((opt) => opt.length > 0);

        if (validOptions.length === 0) {
          setErrors((prev) => ({ ...prev, questionText: true }));
          return null;
        }

        questionData.options = validOptions;
      }

      const response = await createSurveyQuestion(surveyId, questionData);
      return response;
    } catch (error) {
      console.error("Failed to save question:", error);
      setErrors((prev) => ({ ...prev, questionText: true }));
      return null;
    }
  };

  const handleAddQuestion = async () => {
    if (questions.length === 0) {
      const questionId = 1;
      setQuestions([
        {
          id: questionId,
          type: selectedType,
          text: "",
          options: selectedType.toLowerCase() === "multiple choice" ? [""] : undefined,
          isExpanded: true,
          questionId: null,
        },
      ]);
      setSelectedType(null);
      setExpandedQuestionId(questionId);
      return;
    }

    setIsSubmitting(true);
    try {
      const activeQuestion = questions[questions.length - 1];
      if (!activeQuestion) {
        throw new Error("No active question found");
      }

      let updatedQuestions = questions.map((q) => (q.id ? { ...q, isExpanded: false } : q));

      // Check if there's an unsaved question
      if (!questions.find((q) => q.questionId === null)) {
        const newQuestionId = Math.max(...questions.map((q) => q.id)) + 1;
        setQuestions([
          ...updatedQuestions, // All previous questions collapsed
          {
            id: newQuestionId,
            type: selectedType,
            text: "",
            options: selectedType.toLowerCase() === "multiple choice" ? [""] : undefined,
            isExpanded: true, // New question expanded
            questionId: null,
          },
        ]);
        setSelectedType(null);
        setErrors((prev) => ({ ...prev, questionText: false }));

        setExpandedQuestionId(newQuestionId);

        return;
      }

      const response = await saveQuestion(activeQuestion);
      if (!response) {
        return;
      }

      updatedQuestions = questions.map((q) =>
        q.id === activeQuestion.id ? { ...q, questionId: response.id } : q
      );

      const newQuestionId = Math.max(...questions.map((q) => q.id)) + 1;
      setQuestions([
        ...updatedQuestions,
        {
          id: newQuestionId,
          type: selectedType,
          text: "",
          options: selectedType.toLowerCase() === "multiple choice" ? [""] : undefined,
          isExpanded: true,
          questionId: null,
        },
      ]);
      setExpandedQuestionId(newQuestionId);
      setSelectedType(null);
      setErrors((prev) => ({ ...prev, questionText: false }));
    } catch (error) {
      console.error("Failed to add question:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteQuestion = async (localId) => {
    const questionToDelete = questions.find((q) => q.id === localId);

    try {
      if (questionToDelete.questionId) {
        await deleteSurveyQuestion(surveyId, questionToDelete.questionId);
      }

      const remainingQuestions = questions.filter((q) => q.id !== localId);

      const expandedQuestions = remainingQuestions.map((q, index) => ({
        ...q,
        id: index + 1,
        isExpanded: index === questions.length - 1,
      }));

      setQuestions(expandedQuestions);

      if (remainingQuestions.length > 0) {
        setExpandedQuestionId(remainingQuestions[remainingQuestions.length - 1].id);
      }
    } catch (error) {
      console.error("Failed to delete question:", error);
    }
  };

  const handleQuestionTextChange = (questionId, text) => {
    setQuestions(questions.map((q) => (q.id === questionId ? { ...q, text } : q)));
    if (errors.questionText) {
      setErrors((prev) => ({ ...prev, questionText: false }));
    }
  };

  return {
    questions,
    selectedType,
    title,
    subtitle,
    surveyId,
    errors,
    isSubmitting,
    expandedQuestionId,
    setSelectedType,
    setExpandedQuestionId,
    setTitle,
    setSubtitle,
    setErrors,
    handleAddQuestion,
    handleDeleteQuestion,
    handleCreateSurvey,
    handleQuestionTextChange,
    handleQuestionOptionsChange,
    setQuestions,
  };
};
