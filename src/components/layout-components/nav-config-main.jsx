import { paths } from "src/routes/paths";

import { Iconify } from "src/components/iconify";

// ----------------------------------------------------------------------

export const navData = [
  {
    title: "Hakkımızda",
    path: paths.hakkimizda,
    icon: <Iconify width={22} icon="solar:atom-bold-duotone" />,
  },
  {
    title: "Bize Ulaşın",
    path: paths.bizeUlasin,
    icon: <Iconify width={22} icon="solar:atom-bold-duotone" />,
  },
];
