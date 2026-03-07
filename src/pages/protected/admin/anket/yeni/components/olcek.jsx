import { Box, Typography, Stack, Divider, Radio, useTheme } from "@mui/material";
import { useState } from "react";

export function Olcek() {
  const theme = useTheme();
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Box
      sx={{
        width: "664px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        width="60%"
        sx={{
          mb: 2,
        }}
      >
        {[1, 2, 3, 4, 5].map((number) => (
          <Typography
            key={number}
            sx={{
              color: "text.primary",
              fontSize: theme.typography.pxToRem(14),
              fontFamily: theme.typography.fontFamily,
              fontWeight: theme.typography.fontWeightRegular,
              width: 42,
              textAlign: "center",
            }}
          >
            {number}
          </Typography>
        ))}
      </Stack>

      <Divider sx={{ width: "60%", mb: 2, borderColor: "text.primary" }} />

      <Stack direction="row" spacing={0} alignItems="center" sx={{ width: "60%" }}>
        <Typography
          sx={{
            color: "text.primary",
            fontSize: theme.typography.pxToRem(14),
            fontFamily: theme.typography.fontFamily,
            fontWeight: theme.typography.fontWeightRegular,
            width: "100px",
          }}
        >
          Katılmıyorum
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="center" sx={{ flex: 1 }}>
          {[1, 2, 3, 4, 5].map((value) => (
            <Radio
              key={value}
              value={value.toString()}
              checked={selectedValue === value.toString()}
              onChange={handleChange}
              size="medium"
              sx={{
                width: 42,
                height: 42,
                padding: 0,
                color: "text.primary",
                "&.Mui-checked": {
                  color: "primary.main",
                },
              }}
            />
          ))}
        </Stack>

        <Typography
          sx={{
            color: "text.primary",
            fontSize: theme.typography.pxToRem(14),
            fontFamily: theme.typography.fontFamily,
            fontWeight: theme.typography.fontWeightRegular,
            ml: 2,
          }}
        >
          Katılıyorum
        </Typography>
      </Stack>
    </Box>
  );
}
