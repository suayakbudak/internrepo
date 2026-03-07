import { Helmet } from "react-helmet-async";

import { CONFIG } from "src/global-config";

import { AccountSocialsView } from "./view";

// ----------------------------------------------------------------------

const metadata = { title: `Hesap sosyal medya ayarları | Anasayfa - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AccountSocialsView />
    </>
  );
}
