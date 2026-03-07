import { merge } from "es-toolkit";
import { useBoolean } from "minimal-shared/hooks";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { useTheme } from "@mui/material/styles";
import { iconButtonClasses } from "@mui/material/IconButton";

import { _contacts, _notifications } from "src/_mock";

import { Logo } from "src/components/logo";
import { useSettingsContext } from "src/components/settings";

import { NavMobile } from "./nav-mobile";
import { NavVertical } from "./nav-vertical";
import { layoutClasses } from "src/components/layout-components/core/classes";
import { NavHorizontal } from "./nav-horizontal";
import { _account } from "src/components/layout-components/nav-config-account";
import { MainSection } from "src/components/layout-components/core/main-section";
import { Searchbar } from "src/components/layout-components/searchbar";
// import { _workspaces } from "src/components/layout-components/nav-config-workspace";
import { MenuButton } from "src/components/layout-components/menu-button";
import { HeaderSection } from "src/components/layout-components/core/header-section";
import { LayoutSection } from "src/components/layout-components/core/layout-section";
import { AccountDrawer } from "src/components/layout-components/account-drawer";
import { SettingsButton } from "src/components/layout-components/settings-button";
import { ContactsPopover } from "src/components/layout-components/contacts-popover";
import { navData as dashboardNavData } from "src/components/layout-components/nav-config-dashboard";
import { dashboardLayoutVars, dashboardNavColorVars } from "./css-vars";
import { NotificationsDrawer } from "src/components/layout-components/notifications-drawer";
import { Suspense } from "react";
import { LoadingScreen } from "src/components/loading-screen";
import { Outlet } from "react-router";
import { SignOutButton } from "src/components/layout-components/sign-out-button";
// ----------------------------------------------------------------------

export function DashboardLayout({ sx, cssVars, slotProps, layoutQuery = "lg" }) {
  const theme = useTheme();

  const settings = useSettingsContext();

  const navVars = dashboardNavColorVars(theme, settings.state.navColor, settings.state.navLayout);

  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

  const navData = dashboardNavData;

  const isNavMini = settings.state.navLayout === "mini";
  const isNavHorizontal = settings.state.navLayout === "horizontal";
  const isNavVertical = isNavMini || settings.state.navLayout === "vertical";

  const renderHeader = () => {
    const headerSlotProps = {
      container: {
        maxWidth: false,
        sx: {
          ...(isNavVertical && { px: { [layoutQuery]: 5 } }),
          ...(isNavHorizontal && {
            bgcolor: "var(--layout-nav-bg)",
            height: { [layoutQuery]: "var(--layout-nav-horizontal-height)" },
            [`& .${iconButtonClasses.root}`]: { color: "var(--layout-nav-text-secondary-color)" },
          }),
        },
      },
    };

    const headerSlots = {
      topArea: (
        <Alert severity="info" sx={{ display: "none", borderRadius: 0 }}>
          This is an info Alert.
        </Alert>
      ),
      bottomArea: isNavHorizontal ? (
        <NavHorizontal data={navData} layoutQuery={layoutQuery} cssVars={navVars.section} />
      ) : null,
      leftArea: (
        <>
          {/** @slot Nav mobile */}
          <MenuButton
            onClick={onOpen}
            sx={{ mr: 1, ml: -1, [theme.breakpoints.up(layoutQuery)]: { display: "none" } }}
          />
          <NavMobile data={navData} open={open} onClose={onClose} cssVars={navVars.section} />

          {/** @slot Logo */}
          {isNavHorizontal && (
            <Logo
              sx={{
                display: "none",
                [theme.breakpoints.up(layoutQuery)]: { display: "inline-flex" },
                mt: 2,
                mb: 2,
              }}
            />
          )}

          {/** @slot Divider */}
          {/* {isNavHorizontal && (
            <VerticalDivider sx={{ [theme.breakpoints.up(layoutQuery)]: { display: "flex" } }} />
          )} */}

          {/** @slot Workspace popover */}
          {/* <WorkspacesPopover
            data={_workspaces}
            sx={{ color: "var(--layout-nav-text-primary-color)" }}
          /> */}
        </>
      ),
      rightArea: (
        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0, sm: 0.75 } }}>
          {/** @slot Searchbar */}
          <Searchbar data={navData} />

          <Box
            sx={{ ml: 2 }}
            component="img"
            src="/assets/images/layout/turk-bayragi.svg"
            alt="Türk Bayrağı"
          />

          {/** @slot Language popover */}
          {/* <LanguagePopover data={allLangs} /> */}

          {/** @slot Notifications popover */}
          <NotificationsDrawer data={_notifications} />

          {/** @slot Contacts popover */}
          <ContactsPopover data={_contacts} />

          {/** @slot Settings button */}
          <SettingsButton />

          {/** @slot Account drawer */}
          <AccountDrawer data={_account} />

          <SignOutButton />
        </Box>
      ),
    };

    return (
      <HeaderSection
        layoutQuery={layoutQuery}
        disableElevation={isNavVertical}
        {...slotProps?.header}
        slots={{ ...headerSlots, ...slotProps?.header?.slots }}
        slotProps={merge(headerSlotProps, slotProps?.header?.slotProps ?? {})}
        sx={slotProps?.header?.sx}
      />
    );
  };

  const renderSidebar = () => (
    <NavVertical
      data={navData}
      isNavMini={isNavMini}
      layoutQuery={layoutQuery}
      cssVars={navVars.section}
      onToggleNav={() =>
        settings.setField(
          "navLayout",
          settings.state.navLayout === "vertical" ? "mini" : "vertical"
        )
      }
    />
  );

  const renderFooter = () => null;

  return (
    <LayoutSection
      /** **************************************
       * @Header
       *************************************** */
      headerSection={renderHeader()}
      /** **************************************
       * @Sidebar
       *************************************** */
      sidebarSection={isNavHorizontal ? null : renderSidebar()}
      /** **************************************
       * @Footer
       *************************************** */
      footerSection={renderFooter()}
      /** **************************************
       * @Styles
       *************************************** */
      cssVars={{ ...dashboardLayoutVars(theme), ...navVars.layout, ...cssVars }}
      sx={[
        {
          [`& .${layoutClasses.sidebarContainer}`]: {
            [theme.breakpoints.up(layoutQuery)]: {
              pl: isNavMini ? "var(--layout-nav-mini-width)" : "var(--layout-nav-vertical-width)",
              transition: theme.transitions.create(["padding-left"], {
                easing: "var(--layout-transition-easing)",
                duration: "var(--layout-transition-duration)",
              }),
            },
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <MainSection {...slotProps?.main}>
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      </MainSection>
    </LayoutSection>
  );
}
