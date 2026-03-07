import { Helmet } from "react-helmet-async";

import { CONFIG } from "src/global-config";

import { UserCardsView } from "./view";

// ----------------------------------------------------------------------

const metadata = { title: `User cards | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <UserCardsView />
    </>
  );
}
