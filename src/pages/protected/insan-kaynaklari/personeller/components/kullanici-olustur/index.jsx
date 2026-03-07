import { Helmet } from "react-helmet-async";

import { CONFIG } from "src/global-config";

import { UserCreateView } from "./view";

// ----------------------------------------------------------------------

const metadata = { title: `Create a new user | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <UserCreateView />
    </>
  );
}
