import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  InputAdornment,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Iconify } from "src/components/iconify";
import { Scrollbar } from "src/components/scrollbar";
import { SearchNotFound } from "src/components/search-not-found";
import { useFetch } from "src/hooks/getters/use-fetch";
import { endpoints } from "src/lib/endpoints";

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 64;

export function ProjectContactsDialog({ selectedContacts, setSelectedContacts, open, onClose }) {
  const [searchContact, setSearchContact] = useState("");

  const { data, isLoading } = useFetch(endpoints.get.users.all);

  if (isLoading || !data) return null;

  const handleSearchContacts = (event) => {
    setSearchContact(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: data.data,
    query: searchContact,
  });

  const notFound = !dataFiltered.length && !!searchContact;

  function handleToggleSelected(user) {
    setSelectedContacts((prev) =>
      prev.find((ass) => ass.id === user.id)
        ? prev.filter((assId) => assId.id !== user.id)
        : [...prev, user]
    );
  }

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle sx={{ pb: 0 }}>
        Kişiler <Typography component="span">({data.total})</Typography>
      </DialogTitle>

      <Box sx={{ px: 3, py: 2.5 }}>
        <TextField
          fullWidth
          value={searchContact}
          onChange={handleSearchContacts}
          placeholder="Ara..."
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: "text.disabled" }} />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      <DialogContent sx={{ p: 0 }}>
        {notFound ? (
          <SearchNotFound query={searchContact} sx={{ mt: 3, mb: 10 }} />
        ) : (
          <Scrollbar sx={{ height: ITEM_HEIGHT * 6, px: 2.5 }}>
            <Box component="ul">
              {dataFiltered.map((contact) => {
                const checked = selectedContacts.some((ass) => ass.id === contact.id);

                return (
                  <Box
                    component="li"
                    key={contact.id}
                    sx={{
                      gap: 2,
                      display: "flex",
                      height: ITEM_HEIGHT,
                      alignItems: "center",
                    }}
                  >
                    <Avatar src={contact.profilePhoto || undefined} />

                    <ListItemText
                      slotProps={{
                        primary: { typography: "subtitle2", sx: { mb: 0.25 } },
                        secondary: { typography: "caption" },
                      }}
                      primary={`${contact.firstName} ${contact.lastName}`}
                      secondary={contact.about}
                    />

                    <Button
                      size="small"
                      color={checked ? "primary" : "inherit"}
                      onClick={() => handleToggleSelected(contact)}
                      startIcon={
                        <Iconify
                          width={16}
                          icon={checked ? "eva:checkmark-fill" : "mingcute:add-line"}
                          sx={{ mr: -0.5 }}
                        />
                      }
                    >
                      {checked ? "Assigned" : "Assign"}
                    </Button>
                  </Box>
                );
              })}
            </Box>
          </Scrollbar>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, query }) {
  if (!query) return inputData;

  return inputData.filter(({ firstName, lastName, about }) =>
    [firstName, lastName, about].some((field) => field?.toLowerCase().includes(query.toLowerCase()))
  );
}
