import "src/global.css";
import { useEffect } from "react";
import { usePathname } from "src/routes/hooks";
import { LocalizationProvider } from "src/assets/locales";
import { themeConfig, ThemeProvider } from "src/assets/theme";
import { I18nProvider } from "src/assets/locales/i18n-provider";
import { Snackbar } from "src/components/snackbar";
import { ProgressBar } from "src/components/progress-bar";
import { MotionLazy } from "src/components/animate/motion-lazy";
import { SettingsDrawer, defaultSettings, SettingsProvider } from "src/components/settings";
import { Outlet } from "react-router";
import { AuthProvider } from "src/context/auth-context";

export function AppProviders() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <I18nProvider>
      <AuthProvider>
        <SettingsProvider defaultSettings={defaultSettings}>
          <LocalizationProvider>
            <ThemeProvider
              noSsr
              defaultMode={themeConfig.defaultMode}
              modeStorageKey={themeConfig.modeStorageKey}
            >
              <MotionLazy>
                <Snackbar />
                <ProgressBar />
                <SettingsDrawer defaultSettings={defaultSettings} />
                {/* outlet */}
                <Outlet />
                {/* outlet */}
              </MotionLazy>
            </ThemeProvider>
          </LocalizationProvider>
        </SettingsProvider>
      </AuthProvider>
    </I18nProvider>
  );
}

// ----------------------------------------------------------------------
