import { themeConfig } from "src/assets/theme/theme-config";

// ----------------------------------------------------------------------

export const SETTINGS_STORAGE_KEY = "app-settings";

// ----------------------------------------------------------------------

export const defaultSettings = {
  colorScheme: themeConfig.defaultMode,
  direction: themeConfig.direction,
  contrast: "default",
  navLayout: "horizontal",
  primaryColor: "preset5",
  navColor: "integrate",
  compactLayout: true,
  fontSize: 16,
  fontFamily: themeConfig.fontFamily.primary,
};
