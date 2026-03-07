import { Helmet } from "react-helmet-async";
import { CONFIG } from "src/global-config";
import { JwtSignUpView } from "./view";

// ----------------------------------------------------------------------

const metadata = { title: `Kayıt | ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <JwtSignUpView />
    </>
  );
}
