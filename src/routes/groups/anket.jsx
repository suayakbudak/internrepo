import { paths } from "../paths";

import AnketListeUser from "src/pages/protected/anket/user-anket";
import AnketGoruntule from "src/pages/protected/anket/user-anket-goruntule";

export const anketRoutes = {
  path: paths.anasayfa.anket.root,
  children: [
    { path: paths.anasayfa.anket.listeUser, element: <AnketListeUser /> },
    { path: paths.anasayfa.anket.goruntule, element: <AnketGoruntule /> },
  ],
};
