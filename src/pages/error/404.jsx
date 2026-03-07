import { Helmet } from "react-helmet-async";

import { CONFIG } from "src/global-config";

import { View404 } from "./404-view";

// ----------------------------------------------------------------------

const metadata = { title: `404 page not found! | Error - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <View404 />
    </>
  );
}
