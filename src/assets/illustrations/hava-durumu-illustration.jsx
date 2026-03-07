import { memo, forwardRef } from "react";

import SvgIcon from "@mui/material/SvgIcon";

import { CONFIG } from "src/global-config";

const HavaDurumuIllustration = forwardRef((props, ref) => {
  const { sx, ...other } = props;

  return (
    <SvgIcon
      ref={ref}
      viewBox="0 0 480 480"
      sx={[
        (theme) => ({
          width: 400,
          height: "auto",
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <image
        href={`${CONFIG.assetsDir}/assets/images/about/havadurumu.png`}
        height="200"
        y="140"
        x="70"
      />
    </SvgIcon>
  );
});

export default memo(HavaDurumuIllustration);
