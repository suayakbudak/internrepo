import { Helmet } from "react-helmet-async";

import { CONFIG } from "src/global-config";

import { AccountChangePasswordView } from "./view";

// ----------------------------------------------------------------------

const metadata = { title: `Hesap şifre değiştirme ayarları | Anasayfa - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AccountChangePasswordView />
    </>
  );
}
