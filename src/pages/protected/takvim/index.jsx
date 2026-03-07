import { Helmet } from "react-helmet-async";

import { CONFIG } from "src/global-config";

import { CalendarView } from "./view";

// ----------------------------------------------------------------------

const metadata = { title: `Calendar | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CalendarView />
    </>
  );
}
