import { paths } from "../paths";

import Projeler from "src/pages/protected/gorev-yonetimi/projeler/root/index";
import ProjelerDetay from "src/pages/protected/gorev-yonetimi/projeler/detay/index";
import ProjeKanban from "src/pages/protected/gorev-yonetimi/projeler/kanban/index";

export const gorevYonetimiRoutes = {
  path: paths.anasayfa.gorevYonetimi.root,
  children: [
    {
      path: paths.anasayfa.gorevYonetimi.projeler.root,
      children: [
        { index: true, element: <Projeler /> },
        { path: paths.anasayfa.gorevYonetimi.projeler.detay, element: <ProjelerDetay /> },
        { path: paths.anasayfa.gorevYonetimi.projeler.kanban, element: <ProjeKanban /> },
      ],
    },
  ],
};
