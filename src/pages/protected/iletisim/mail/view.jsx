import { useBoolean } from "minimal-shared/hooks";
import { useEffect, useCallback, startTransition } from "react";

import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import { paths } from "src/routes/paths";
import { useRouter, useSearchParams } from "src/routes/hooks";

import { DashboardContent } from "src/pages/protected/layout";
import { useGetMail, useGetMails, useGetLabels } from "src/lib/actions/mail";

import { MailNav } from "./components/mail-nav";
import { MailLayout } from "./components/layout";
import { MailList } from "./components/mail-list";
import { MailHeader } from "./components/mail-header";
import { MailCompose } from "./components/mail-compose";
import { MailDetails } from "./components/mail-details";

// ----------------------------------------------------------------------

const LABEL_INDEX = "inbox";

export function MailView() {
  const router = useRouter();

  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  const searchParams = useSearchParams();
  const selectedLabelId = searchParams.get("label") ?? LABEL_INDEX;
  const selectedMailId = searchParams.get("id") ?? "";

  const openNav = useBoolean();
  const openMail = useBoolean();
  const openCompose = useBoolean();

  const { labels, labelsLoading, labelsEmpty } = useGetLabels();
  const { mail, mailLoading, mailError } = useGetMail(selectedMailId);
  const { mails, mailsLoading, mailsEmpty } = useGetMails(selectedLabelId);

  const firstMailId = mails.allIds[0] || "";

  const handleToggleCompose = useCallback(() => {
    if (openNav.value) {
      openNav.onFalse();
    }
    openCompose.onToggle();
  }, [openCompose, openNav]);

  const handleClickLabel = useCallback(
    (labelId) => {
      if (!mdUp) {
        openNav.onFalse();
      }

      const redirectPath =
        labelId !== LABEL_INDEX
          ? `${paths.anasayfa.iletisim.mail}?label=${labelId}`
          : paths.anasayfa.iletisim.mail;

      if (selectedLabelId !== labelId) {
        startTransition(() => {
          router.push(redirectPath);
        });
      }
    },
    [mdUp, selectedLabelId, openNav, router]
  );

  const handleClickMail = useCallback(
    (mailId) => {
      if (!mdUp) {
        openMail.onFalse();
      }

      const redirectPath =
        selectedLabelId !== LABEL_INDEX
          ? `${paths.anasayfa.iletisim.mail}?id=${mailId}&label=${selectedLabelId}`
          : `${paths.anasayfa.iletisim.mail}?id=${mailId}`;

      if (selectedMailId !== mailId) {
        startTransition(() => {
          router.push(redirectPath);
        });
      }
    },
    [mdUp, openMail, router, selectedLabelId, selectedMailId]
  );

  useEffect(() => {
    if (!selectedMailId && firstMailId) {
      handleClickMail(firstMailId);
    }
  }, [firstMailId, handleClickMail, selectedMailId]);

  return (
    <>
      <DashboardContent
        maxWidth={false}
        sx={{ flex: "1 1 auto", display: "flex", flexDirection: "column" }}
      >
        <Typography variant="h4" sx={{ mb: { xs: 2, md: 3 } }}>
          Mail
        </Typography>

        <MailLayout
          sx={{
            p: 1,
            borderRadius: 2,
            flex: "1 1 auto",
            bgcolor: "background.neutral",
          }}
          slots={{
            header: (
              <MailHeader
                onOpenNav={openNav.onTrue}
                onOpenMail={mailsEmpty ? undefined : openMail.onTrue}
                sx={{ display: { md: "none" } }}
              />
            ),
            nav: (
              <MailNav
                labels={labels}
                isEmpty={labelsEmpty}
                loading={labelsLoading}
                openNav={openNav.value}
                onCloseNav={openNav.onFalse}
                selectedLabelId={selectedLabelId}
                onClickLabel={handleClickLabel}
                onToggleCompose={handleToggleCompose}
              />
            ),
            list: (
              <MailList
                mails={mails}
                isEmpty={mailsEmpty}
                loading={mailsLoading}
                openMail={openMail.value}
                onCloseMail={openMail.onFalse}
                onClickMail={handleClickMail}
                selectedLabelId={selectedLabelId}
                selectedMailId={selectedMailId}
              />
            ),
            details: (
              <MailDetails
                mail={mail}
                isEmpty={mailsEmpty}
                error={mailError?.message}
                loading={mailsLoading || mailLoading}
                renderLabel={(id) => labels.find((label) => label.id === id)}
              />
            ),
          }}
        />
      </DashboardContent>

      {openCompose.value && <MailCompose onCloseCompose={openCompose.onFalse} />}
    </>
  );
}
