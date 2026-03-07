import { Helmet } from "react-helmet-async";
import { CONFIG } from "src/global-config";
import { ResetPasswordView } from "./view";

// ----------------------------------------------------------------------

const metadata = { title: `Şifremi Unuttum | ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ResetPasswordView />
    </>
  );
}
