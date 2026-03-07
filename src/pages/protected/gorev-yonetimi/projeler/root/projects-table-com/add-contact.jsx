import { Box, IconButton, Stack, styled, Tooltip } from "@mui/material";
import { useBoolean } from "minimal-shared/hooks";
import { varAlpha } from "minimal-shared/utils";
import { useEffect, useState } from "react";
import { Iconify } from "src/components/iconify";
import { ProjectContactsDialog } from "../proje-contacts-dialog";
import { UserAvatar } from "src/components/user-avatar";

const BlockLabel = styled("span")(({ theme }) => ({
  ...theme.typography.caption,
  width: 60,
  flexShrink: 0,
  color: theme.vars.palette.text.secondary,
  fontWeight: theme.typography.fontWeightMedium,
}));

export function ProjectAddContact({ label, name, setValue, defaultValue }) {
  const contactsDialog = useBoolean();
  const [selectedAssigners, setSelectedAssigners] = useState(defaultValue || []);

  useEffect(() => {
    setValue(
      name,
      selectedAssigners.map((user) => user.id)
    );
  }, [selectedAssigners, name, setValue]);

  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ px: 1, pb: 1 }}>
      <BlockLabel>{label}</BlockLabel>

      <Box sx={{ gap: 1, display: "flex", flexWrap: "wrap" }}>
        {selectedAssigners.map((user, i) => (
          <UserAvatar key={i} user={user} />
        ))}

        <Tooltip title="Kişi Ekle">
          <IconButton
            onClick={contactsDialog.onTrue}
            sx={{
              border: (theme) => `dashed 1px ${theme.vars.palette.divider}`,
              bgcolor: (theme) => varAlpha(theme.vars.palette.grey["500Channel"], 0.08),
            }}
          >
            <Iconify icon="mingcute:add-line" />
          </IconButton>
        </Tooltip>

        <ProjectContactsDialog
          selectedContacts={selectedAssigners}
          setSelectedContacts={setSelectedAssigners}
          open={contactsDialog.value}
          onClose={contactsDialog.onFalse}
        />
      </Box>
    </Stack>
  );
}
