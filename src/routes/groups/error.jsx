import { paths } from "../paths";

import Page403 from "src/pages/error/403";
import Page404 from "src/pages/error/404";
import Page500 from "src/pages/error/500";
import PermissionDeniedPage from "src/pages/error/yetki";

export const errorRoutes = {
  path: paths.error.root,
  children: [
    { path: paths.error[500], element: <Page500 /> },
    { path: paths.error[404], element: <Page404 /> },
    { path: paths.error[403], element: <Page403 /> },
    { path: paths.error.yetki, element: <PermissionDeniedPage /> },
  ],
};
