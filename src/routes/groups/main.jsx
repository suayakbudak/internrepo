import { Suspense } from "react";
import { Outlet } from "react-router";
import { SplashScreen } from "src/components/loading-screen";
import { MainLayout } from "src/pages/main/layout";
import { paths } from "../paths";

import ContactPage from "src/pages/main/bize-ulasin";
import AboutPage from "src/pages/main/hakkimizda";
import HomePage from "src/pages/main/landing";

export const mainRoutes = {
  element: (
    <Suspense fallback={<SplashScreen />}>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </Suspense>
  ),
  children: [
    { path: paths.root, element: <HomePage /> },
    { path: paths.hakkimizda, element: <AboutPage /> },
    { path: paths.bizeUlasin, element: <ContactPage /> },
  ],
};
