import { Helmet } from "react-helmet-async";

import { CONFIG } from "src/global-config";

import { View500 } from "./500-view";

// ----------------------------------------------------------------------

const metadata = { title: `500 Internal server error! | Error - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <View500 />
    </>
  );
}
