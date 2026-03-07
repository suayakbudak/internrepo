import { Helmet } from "react-helmet-async";

import { CONFIG } from "src/global-config";

import { AnketGoruntule } from "./view";

// ----------------------------------------------------------------------

const metadata = { title: `Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AnketGoruntule />
    </>
  );
}
