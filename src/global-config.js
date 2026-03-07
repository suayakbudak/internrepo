import { paths } from "src/routes/paths";

import packageJson from "../package.json";

// ----------------------------------------------------------------------

export const CONFIG = {
  appName: "Pviser",
  appVersion: packageJson.version,
  serverUrl: import.meta.env.VITE_SERVER_URL ?? "",
  assetsDir: import.meta.env.VITE_ASSETS_DIR ?? "",
  apiServerUrl: import.meta.env.VITE_API_SERVER_URL ?? "",
  /**
   * Auth
   * @method jwt | amplify | firebase | supabase | auth0
   */
  auth: {
    method: "jwt",
    skip: false,
    redirectPath: paths.anasayfa.root,
  },
  /**
   * Mapbox
   */
  mapboxApiKey: import.meta.env.VITE_MAPBOX_API_KEY ?? "",
};
