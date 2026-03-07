import { Suspense } from "react";
import { Outlet } from "react-router";
import { SplashScreen } from "src/components/loading-screen";
import { AuthSplitLayout } from "src/pages/auth/auth-split";
import { GuestGuard } from "src/pages/auth/guard/guest-guard";
import { paths } from "../paths";

import UpdatePasswordPage from "src/pages/auth/sifre-degistir";
import ResetPasswordPage from "src/pages/auth/sifremi-unuttum";
import SignInPage from "src/pages/auth/sign-in";
import SignUpPage from "src/pages/auth/sign-up";

export const authRoutes = {
  path: paths.auth.root,
  element: (
    <GuestGuard>
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    </GuestGuard>
  ),
  children: [
    {
      path: paths.auth.giris,
      element: (
        <AuthSplitLayout slotProps={{ section: { title: "Hoşgeldiniz!" } }}>
          <SignInPage />
        </AuthSplitLayout>
      ),
    },
    {
      path: paths.auth.kayit,
      element: (
        <AuthSplitLayout>
          <SignUpPage />
        </AuthSplitLayout>
      ),
    },
    {
      path: paths.auth.sifremiUnuttum,
      element: (
        <AuthSplitLayout>
          <ResetPasswordPage />
        </AuthSplitLayout>
      ),
    },
    {
      path: paths.auth.sifreDegistir,
      element: (
        <AuthSplitLayout>
          <UpdatePasswordPage />
        </AuthSplitLayout>
      ),
    },
  ],
};
