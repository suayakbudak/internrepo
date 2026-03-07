import { Helmet } from "react-helmet-async";

import { CONFIG } from "src/global-config";
import { NotificationsView } from "./view";

// ----------------------------------------------------------------------

const metadata = { title: `Bildirimler - ${CONFIG.appName}` };

export default function NotificationsPage() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <NotificationsView />
    </>
  );
}
