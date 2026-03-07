import { paths } from "../paths";

import Mail from "src/pages/protected/iletisim/mail/index";
import Sohbet from "src/pages/protected/iletisim/sohbet/index";

export const iletisimRoutes = {
  path: paths.anasayfa.iletisim.root,
  children: [
    { path: paths.anasayfa.iletisim.mail, element: <Mail /> },
    { path: paths.anasayfa.iletisim.sohbet, element: <Sohbet /> },
  ],
};
