import { Helmet } from "react-helmet-async";

import { CONFIG } from "src/global-config";

import { AnketOlusturView } from "./view";

// ----------------------------------------------------------------------

const metadata = { title: `Anket Oluştur - ${CONFIG.appName}` };

export default function AnketOlustur() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AnketOlusturView />
    </>
  );
}
