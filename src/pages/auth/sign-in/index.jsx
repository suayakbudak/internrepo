import { Helmet } from "react-helmet-async";
import { CONFIG } from "src/global-config";
import { JwtSignInView } from "./view";

// ----------------------------------------------------------------------

const metadata = { title: `Giriş | ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <JwtSignInView />
    </>
  );
}
