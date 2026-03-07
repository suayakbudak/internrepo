import { axiosAuth } from "src/lib/axios";

import { JWT_STORAGE_KEY } from "src/lib/constants";
import { setSession } from "src/utils/auth-utils";
import { endpoints } from "../endpoints";

/** **************************************
 * Sign in
 *************************************** */

// ----------------------------------------------------------------------

export const signInWithPassword = async ({ email, password }) => {
  try {
    // DEMO MODE: Backend olmadan test için
    if (email === "demo@minimals.cc" && password === "@demo1") {
      // Mock JWT token oluştur
      const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRlbW8gVXNlciIsImVtYWlsIjoiZGVtb0BtaW5pbWFscy5jYyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxOTk5OTk5OTk5fQ.demo_signature";
      
      setSession(mockToken);
      console.log("✅ DEMO MODE: Giriş başarılı!");
      return;
    }

    // Normal backend isteği
    const params = { email, password };

    const res = await axiosAuth.post(endpoints.post.auth.signIn, params);

    const { access_token } = res.data;

    if (!access_token) {
      throw new Error("Access token not found in response");
    }

    setSession(access_token);
  } catch (error) {
    console.error("Error during sign in:", error);
    throw error;
  }
};

/** **************************************
 * Sign up
 *************************************** */

// ----------------------------------------------------------------------

export const signUp = async ({ email, password, phoneNumber, firstName, lastName }) => {
  const params = {
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
  };

  try {
    const res = await axiosAuth.post(endpoints.post.auth.signUp, params);

    const { access_token } = res.data;

    if (!access_token) {
      throw new Error("Access token not found in response");
    }

    sessionStorage.setItem(JWT_STORAGE_KEY, access_token);
  } catch (error) {
    console.error("Error during sign up:", error);
    throw error;
  }
};

/** **************************************
 * Sign out
 *************************************** */

// ----------------------------------------------------------------------

export const signOut = async () => {
  try {
    await setSession(null);
  } catch (error) {
    console.error("Error during sign out:", error);
    throw error;
  }
};

export const forgotPassword = async ({ email }) => {
  const body = { email };
  try {
    const res = await axiosAuth.post(endpoints.post.auth.forgotPassword, body);
    return res.data;
  } catch (error) {
    console.error("Error during forgot password:", error);
    throw error;
  }
};

export const resetPassword = async ({ email, password, confirmNewPassword }) => {
  try {
    const body = { email, password, confirmNewPassword };
    const res = await axiosAuth.post(endpoints.post.auth.resetPassword, body);
    return res.data;
  } catch (error) {
    console.error("Error during reset password:", error);
    throw error;
  }
};
export const verifyCode = async ({ email, verificationCode }) => {
  try {
    const body = { email, verificationCode };
    const res = await axiosAuth.post(endpoints.post.auth.verifyCode, body);
    return res.data;
  } catch (error) {
    console.error("Error during verify code:", error);
    throw error;
  }
};
