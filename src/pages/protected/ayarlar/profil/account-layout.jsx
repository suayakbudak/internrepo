import { removeLastSlash } from "minimal-shared/utils";
import { Suspense } from "react";
import { LoadingScreen } from "src/components/loading-screen";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import { paths } from "src/routes/paths";
import { usePathname } from "src/routes/hooks";
import { RouterLink } from "src/routes/router-link";

import { DashboardContent } from "src/pages/protected/layout";

import { Iconify } from "src/components/iconify";
import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";
import { Outlet } from "react-router";

// ----------------------------------------------------------------------

const NAV_ITEMS = [
  {
    label: "Genel",
    icon: <Iconify width={24} icon="solar:user-id-bold" />,
    href: paths.anasayfa.ayarlar.profil.root,
  },
  {
    label: "Bildirimler",
    icon: <Iconify width={24} icon="solar:bell-bing-bold" />,
    href: paths.anasayfa.ayarlar.profil.bildirimler,
  },
  {
    label: "Sosyal Bağlantılar",
    icon: <Iconify width={24} icon="solar:share-bold" />,
    href: paths.anasayfa.ayarlar.profil.sosyalMedya,
  },
  {
    label: "Güvenlik",
    icon: <Iconify width={24} icon="ic:round-vpn-key" />,
    href: paths.anasayfa.ayarlar.profil.sifreDegistir,
  },
];

// ----------------------------------------------------------------------

export default function AccountLayout({ children, ...other }) {
  const pathname = usePathname();

  return (
    <DashboardContent {...other}>
      <CustomBreadcrumbs
        heading="Profil"
        links={[
          { name: "Anasayfa", href: paths.anasayfa.root },
          { name: "Ayarlar", href: paths.anasayfa.ayarlar.root },
          { name: "Profil" },
        ]}
        sx={{ mb: 3 }}
      />

      <Tabs value={removeLastSlash(pathname)} sx={{ mb: { xs: 2, md: 3 } }}>
        {NAV_ITEMS.map((tab) => (
          <Tab
            component={RouterLink}
            key={tab.href}
            label={tab.label}
            icon={tab.icon}
            value={tab.href}
            href={tab.href}
          />
        ))}
      </Tabs>
      <Suspense fallback={<LoadingScreen />}>
        <Outlet />
      </Suspense>
    </DashboardContent>
  );
}
