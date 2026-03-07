import { useSetState } from "minimal-shared/hooks";
import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { axiosAuth } from "src/lib/axios";
import { JWT_STORAGE_KEY } from "src/lib/constants";
import { endpoints } from "src/lib/endpoints";
import { isValidToken, setSession } from "src/utils/auth-utils";
// ----------------------------------------------------------------------

export const AuthContext = createContext(undefined);

// ----------------------------------------------------------------------

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext: Context must be used inside AuthProvider");
  }

  return context;
}

// ----------------------------------------------------------------------

export function AuthProvider({ children }) {
  const { state, setState } = useSetState({ user: null, loading: true });

  const checkUserSession = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(JWT_STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        // DEMO MODE: Mock user data
        if (accessToken.includes("demo_signature")) {
          const mockUser = {
            id: "demo-user-123",
            email: "demo@minimals.cc",
            displayName: "Demo User",
            firstName: "Demo",
            lastName: "User",
            photoURL: "",
            phoneNumber: "+90 555 123 4567",
            role: "admin",
          };
          
          setState({ user: { ...mockUser, accessToken }, loading: false });
          console.log("✅ DEMO MODE: Mock user loaded");
          return;
        }

        // Normal backend isteği
        const res = await axiosAuth.post(endpoints.post.users.me);

        const user = res.data;

        setState({ user: { ...user, accessToken }, loading: false });
      } else {
        setState({ user: null, loading: false });
      }
    } catch (error) {
      console.error(error);
      setState({ user: null, loading: false });
    }
  }, [setState]);

  useEffect(() => {
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? "authenticated" : "unauthenticated";

  const status = state.loading ? "loading" : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user ? { ...state.user, role: state.user?.role ?? "admin" } : null,
      checkUserSession,
      loading: status === "loading",
      authenticated: status === "authenticated",
      unauthenticated: status === "unauthenticated",
    }),
    [checkUserSession, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
