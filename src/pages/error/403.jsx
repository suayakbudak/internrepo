import { Helmet } from "react-helmet-async";

import { CONFIG } from "src/global-config";

import { View403 } from "./403-view";

// ----------------------------------------------------------------------

const metadata = { title: `403 forbidden! | Error - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <View403 />
    </>
  );
}
