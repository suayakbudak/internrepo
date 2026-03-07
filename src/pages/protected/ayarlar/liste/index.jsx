import { Helmet } from "react-helmet-async";

import { CONFIG } from "src/global-config";

import { UserListView } from "./view";

// ----------------------------------------------------------------------

const metadata = { title: `Kullanıcı listesi | Anasayfa - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <UserListView />
    </>
  );
}
