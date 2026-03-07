import { Helmet } from "react-helmet-async";

import { CONFIG } from "src/global-config";

import { AccountBillingView } from "./view";

// ----------------------------------------------------------------------

const metadata = { title: `Hesap fatura ayarları | Anasayfa - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AccountBillingView />
    </>
  );
}
