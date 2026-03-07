import { merge } from "es-toolkit";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

import { paths } from "src/routes/paths";
import { RouterLink } from "src/routes/router-link";

import { CONFIG } from "src/global-config";

import { Logo } from "src/components/logo";

import { HeaderSection } from "src/components/layout-components/core/header-section";
import { LayoutSection } from "src/components/layout-components/core/layout-section";
import { MainSection } from "src/components/layout-components/core/main-section";
import { SettingsButton } from "src/components/layout-components/settings-button";
import { AuthSplitContent } from "./content";
import { AuthSplitSection } from "./section";

// ----------------------------------------------------------------------

export function AuthSplitLayout({ sx, cssVars, children, slotProps, layoutQuery = "md" }) {
  const renderHeader = () => {
    const headerSlotProps = {
      container: { maxWidth: false },
    };

    const headerSlots = {
      topArea: (
        <Alert severity="info" sx={{ display: "none", borderRadius: 0 }}>
          This is an info Alert.
        </Alert>
      ),
      leftArea: (
        <>
          {/** @slot Logo */}
          <Logo />
        </>
      ),
      rightArea: (
        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 1.5 } }}>
          {/** @slot Help link */}
          <Link
            href={paths.faqs}
            component={RouterLink}
            color="inherit"
            sx={{ typography: "subtitle2" }}
          >
            Yardım
          </Link>

          {/** @slot Settings button */}
          <SettingsButton />
        </Box>
      ),
    };

    return (
      <HeaderSection
        disableElevation
        layoutQuery={layoutQuery}
        {...slotProps?.header}
        slots={{ ...headerSlots, ...slotProps?.header?.slots }}
        slotProps={merge(headerSlotProps, slotProps?.header?.slotProps ?? {})}
        sx={[
          { position: { [layoutQuery]: "fixed" } },
          ...(Array.isArray(slotProps?.header?.sx)
            ? (slotProps?.header?.sx ?? [])
            : [slotProps?.header?.sx]),
        ]}
      />
    );
  };

  const renderFooter = () => null;

  const renderMain = () => (
    <MainSection
      {...slotProps?.main}
      sx={[
        (theme) => ({ [theme.breakpoints.up(layoutQuery)]: { flexDirection: "row" } }),
        ...(Array.isArray(slotProps?.main?.sx)
          ? (slotProps?.main?.sx ?? [])
          : [slotProps?.main?.sx]),
      ]}
    >
      <AuthSplitSection
        layoutQuery={layoutQuery}
        method={CONFIG.auth.method}
        {...slotProps?.section}
        methods={[
          {
            label: "Jwt",
            path: paths.auth.giris,
            icon: `${CONFIG.assetsDir}/assets/icons/platforms/ic-jwt.svg`,
          },
        ]}
      />
      <AuthSplitContent layoutQuery={layoutQuery} {...slotProps?.content}>
        {children}
      </AuthSplitContent>
    </MainSection>
  );

  return (
    <LayoutSection
      /** **************************************
       * @Header
       *************************************** */
      headerSection={renderHeader()}
      /** **************************************
       * @Footer
       *************************************** */
      footerSection={renderFooter()}
      /** **************************************
       * @Styles
       *************************************** */
      cssVars={{ "--layout-auth-content-width": "420px", ...cssVars }}
      sx={sx}
    >
      {renderMain()}
    </LayoutSection>
  );
}
