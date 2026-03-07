import { Helmet } from "react-helmet-async";

import { CONFIG } from "src/global-config";

import { AccountNotificationsView } from "./view";

// ----------------------------------------------------------------------

const metadata = {
  title: `Hesap bildirim ayarları | Anasayfa - ${CONFIG.appName}`,
};

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AccountNotificationsView />
    </>
  );
}
