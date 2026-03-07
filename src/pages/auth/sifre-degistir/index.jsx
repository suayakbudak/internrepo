import { Helmet } from "react-helmet-async";
import { CONFIG } from "src/global-config";
import { UpdatePasswordView } from "./view";

// ----------------------------------------------------------------------

const metadata = { title: `Şifre Değiştir | ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <UpdatePasswordView />
    </>
  );
}
