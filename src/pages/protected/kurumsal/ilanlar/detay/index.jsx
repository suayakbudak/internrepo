import { Helmet } from "react-helmet-async";
import { CONFIG } from "src/global-config";
import { JobDetailsView } from "./view";

// ----------------------------------------------------------------------

const metadata = { title: `İlan Detayı | ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <JobDetailsView />
    </>
  );
}
