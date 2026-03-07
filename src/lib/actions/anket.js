import { endpoints } from "../endpoints";
import { axiosAuth } from "../axios";
import { JWT_STORAGE_KEY } from "src/lib/constants";
import { jwtDecode } from "jwt-decode";

// Anket listesini getir
export const getSurveys = async () => {
  try {
    const response = await axiosAuth.get(endpoints.get.surveys.root);
    return response.data;
  } catch (error) {
    console.error("Error fetching surveys:", error);
    throw error;
  }
};

// Tekil anket detayını getir
export const getSurveyById = async (id) => {
  try {
    const response = await axiosAuth.get(endpoints.get.surveys.id(id));
    return response.data;
  } catch (error) {
    console.error("Error fetching survey:", error);
    throw error;
  }
};

// Add this function to get user ID from token
export const getCurrentUserId = () => {
  const token = sessionStorage.getItem(JWT_STORAGE_KEY);
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.userId; // check which property your JWT uses
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

// Modify createSurvey to automatically include user ID
export const createSurvey = async (surveyData) => {
  try {
    const userId = getCurrentUserId();
    const dataWithUser = {
      ...surveyData,
      created_by: userId,
    };

    const response = await axiosAuth.post(endpoints.post.surveys.create, dataWithUser);
    return response.data;
  } catch (error) {
    console.error("Error creating survey:", error);
    throw error;
  }
};

// Anket güncelle
export const updateSurvey = async (id, surveyData) => {
  try {
    const response = await axiosAuth.put(endpoints.put.surveys.update(id), surveyData);
    return response.data;
  } catch (error) {
    console.error("Error updating survey:", error);
    throw error;
  }
};

// Anket sil
export const deleteSurvey = async (id) => {
  try {
    const response = await axiosAuth.delete(endpoints.delete.surveys.id(id));
    return response.data;
  } catch (error) {
    console.error("Error deleting survey:", error);
    throw error;
  }
};

// Anket sorusu ekle
export const createSurveyQuestion = async (surveyId, questionData) => {
  try {
    const response = await axiosAuth.post(
      endpoints.post.surveys.createQuestion(surveyId),
      questionData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating survey question:", error);
    throw error;
  }
};

// Anket sorusu güncelle
export const updateSurveyQuestion = async (surveyId, questionId, questionData) => {
  try {
    const response = await axiosAuth.put(
      endpoints.put.surveys.updateQuestion(surveyId, questionId),
      questionData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating survey question:", error);
    throw error;
  }
};

// Anket sorusu sil
export const deleteSurveyQuestion = async (surveyId, questionId) => {
  try {
    const response = await axiosAuth.delete(
      endpoints.delete.surveys.question(surveyId, questionId)
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting survey question:", error);
    throw error;
  }
};

// Anket cevaplarını getir
export const getSurveyResponses = async (surveyId) => {
  try {
    const response = await axiosAuth.get(endpoints.get.surveys.responses(surveyId));
    return response.data;
  } catch (error) {
    console.error("Error fetching survey responses:", error);
    throw error;
  }
};

// Anket cevabı ekle
export const createSurveyResponse = async (surveyId, responseData) => {
  try {
    const response = await axiosAuth.post(
      endpoints.post.surveys.createResponse(surveyId),
      responseData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating survey response:", error);
    throw error;
  }
};
