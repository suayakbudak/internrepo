import { paths } from "src/routes/paths";

import { axiosAuth } from "src/lib/axios";
import { JWT_STORAGE_KEY } from "src/lib/constants";
import { endpoints } from "src/lib/endpoints";

// ----------------------------------------------------------------------

export function jwtDecode(token) {
  try {
    if (!token) return null;

    const parts = token.split(".");
    if (parts.length < 2) {
      throw new Error("Invalid token!");
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(atob(base64));

    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    throw error;
  }
}

// ----------------------------------------------------------------------

export function isValidToken(accessToken) {
  if (!accessToken) {
    return false;
  }

  try {
    // DEMO MODE: Demo token her zaman geçerli
    if (accessToken.includes("demo_signature")) {
      console.log("✅ Demo token geçerli kabul edildi");
      return true;
    }

    const decoded = jwtDecode(accessToken);

    if (!decoded || !("exp" in decoded)) {
      return false;
    }

    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
  } catch (error) {
    console.error("Error during token validation:", error);
    return false;
  }
}

// ----------------------------------------------------------------------

export function tokenExpired(exp) {
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;

  sendRefreshTokenRequest(exp);

  setTimeout(() => {
    try {
      // alert("Token expired!");
      sessionStorage.removeItem(JWT_STORAGE_KEY);

      const currentPath = window.location.pathname;
      const queryString = new URLSearchParams({ returnTo: currentPath }).toString();

      window.location.href = `${paths.auth.giris}?${queryString}`;
    } catch (error) {
      console.error("Error during token expiration:", error);
      throw error;
    }
  }, timeLeft);
}

// ----------------------------------------------------------------------

export function sendRefreshTokenRequest(tokenExpiration) {
  const refreshTokenDeadline = tokenExpiration - 1000 * 60 * 20; // 20 minutes

  setTimeout(async () => {
    try {
      const response = await axiosAuth.get(endpoints.get.auth.tokenRefresh, {
        grant_type: "refresh_token",
        refresh_token: sessionStorage.getItem(JWT_STORAGE_KEY),
      });

      const accessToken = response.data.access_token;

      sessionStorage.setItem(JWT_STORAGE_KEY, accessToken);

      axiosAuth.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } catch (error) {
      console.error("Error during refresh token request:", error);
      throw error;
    }
  }, refreshTokenDeadline);
}

// ----------------------------------------------------------------------

export async function setSession(accessToken) {
  try {
    if (accessToken) {
      sessionStorage.setItem(JWT_STORAGE_KEY, accessToken);

      axiosAuth.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      // DEMO MODE: Demo token için expire kontrolü yapma
      if (accessToken.includes("demo_signature")) {
        console.log("✅ Demo token kaydedildi (expire check atlandı)");
        return;
      }

      const decodedToken = jwtDecode(accessToken); // ~3 days by minimals server

      if (decodedToken && "exp" in decodedToken) {
        tokenExpired(decodedToken.exp);
      } else {
        throw new Error("Invalid access token!");
      }
    } else {
      sessionStorage.removeItem(JWT_STORAGE_KEY);
      delete axiosAuth.defaults.headers.common.Authorization;
    }
  } catch (error) {
    console.error("Error during set session:", error);
    throw error;
  }
}
