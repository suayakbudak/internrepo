import { Helmet } from "react-helmet-async";

import { CONFIG } from "src/global-config";

import { AnketSonucView } from "./view";

// ----------------------------------------------------------------------

const metadata = { title: `Anket - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AnketSonucView />
    </>
  );
}
