import { Helmet } from "react-helmet-async";

import { CONFIG } from "src/global-config";

import { OverviewBookingView } from "./view";

// ----------------------------------------------------------------------

const metadata = { title: `Booking | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <OverviewBookingView />
    </>
  );
}
