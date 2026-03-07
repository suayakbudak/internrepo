import { m } from "framer-motion";
import { varAlpha } from "minimal-shared/utils";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { Iconify } from "src/components/iconify";
import { varFade, MotionViewport } from "src/components/animate";

import { FloatLine, FloatPlusIcon, FloatTriangleDownIcon } from "./svg-elements";

// ----------------------------------------------------------------------

export function HomeFAQs({ sx, ...other }) {
  const renderContact = () => (
    <Box
      sx={[
        (theme) => ({
          px: 3,
          py: 8,
          textAlign: "center",
          background: `linear-gradient(to left, ${varAlpha(theme.vars.palette.grey["500Channel"], 0.08)}, transparent)`,
        }),
      ]}
    >
      <m.div variants={varFade("in")}>
        <Typography variant="h4">Still have questions?</Typography>
      </m.div>

      <m.div variants={varFade("in")}>
        <Typography sx={{ mt: 2, mb: 3, color: "text.secondary" }}>
          Please describe your case to receive the most accurate advice
        </Typography>
      </m.div>

      <m.div variants={varFade("in")}>
        <Button
          color="inherit"
          variant="contained"
          startIcon={<Iconify icon="fluent:mail-24-filled" />}
        >
          Contact us
        </Button>
      </m.div>
    </Box>
  );

  return (
    <Box component="section" sx={sx} {...other}>
      <MotionViewport sx={{ py: 10, position: "relative" }}>
        {topLines()}

        <Stack sx={{ position: "relative" }}>
          {bottomLines()}
          {renderContact()}
        </Stack>
      </MotionViewport>
    </Box>
  );
}

// ----------------------------------------------------------------------

const topLines = () => (
  <>
    <Stack
      spacing={8}
      alignItems="center"
      sx={{
        top: 64,
        left: 80,
        position: "absolute",
        transform: "translateX(-50%)",
      }}
    >
      <FloatTriangleDownIcon sx={{ position: "static", opacity: 0.12 }} />
      <FloatTriangleDownIcon
        sx={{
          width: 30,
          height: 15,
          opacity: 0.24,
          position: "static",
        }}
      />
    </Stack>

    <FloatLine vertical sx={{ top: 0, left: 80 }} />
  </>
);

const bottomLines = () => (
  <>
    <FloatLine sx={{ top: 0, left: 0 }} />
    <FloatLine sx={{ bottom: 0, left: 0 }} />
    <FloatPlusIcon sx={{ top: -8, left: 72 }} />
    <FloatPlusIcon sx={{ bottom: -8, left: 72 }} />
  </>
);
