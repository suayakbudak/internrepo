import { _userAbout } from "src/_mock";

import Card from "@mui/material/Card";
import LoadingButton from "@mui/lab/LoadingButton";
import InputAdornment from "@mui/material/InputAdornment";

import { TwitterIcon, FacebookIcon, LinkedinIcon, InstagramIcon } from "src/assets/icons";

import { Form, Field } from "src/components/hook-form";
import { useSocialForm } from "./use-social-form";

// ----------------------------------------------------------------------

export function AccountSocialsView() {
  const socialLinks = _userAbout.socialLinks;
  const { isSubmitting, methods, onSubmit } = useSocialForm(socialLinks);

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card
        sx={{
          p: 3,
          gap: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {Object.keys(socialLinks).map((social) => (
          <Field.Text
            key={social}
            name={social}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    {social === "facebook" && <FacebookIcon sx={{ width: 24 }} />}
                    {social === "instagram" && <InstagramIcon sx={{ width: 24 }} />}
                    {social === "linkedin" && <LinkedinIcon sx={{ width: 24 }} />}
                    {social === "twitter" && <TwitterIcon sx={{ width: 24 }} />}
                  </InputAdornment>
                ),
              },
            }}
          />
        ))}

        <LoadingButton type="submit" variant="contained" loading={isSubmitting} sx={{ ml: "auto" }}>
          Değişiklikleri kaydet
        </LoadingButton>
      </Card>
    </Form>
  );
}
