import { useBoolean } from "minimal-shared/hooks";

import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import CardHeader from "@mui/material/CardHeader";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";

import { Iconify } from "src/components/iconify";

// ----------------------------------------------------------------------

export function AccountBillingPayment({ cards, sx, ...other }) {
  const openForm = useBoolean();

  return (
    <>
      <Card sx={[{ my: 3 }, ...(Array.isArray(sx) ? sx : [sx])]} {...other}>
        <CardHeader
          title="Payment method"
          action={
            <Button
              size="small"
              color="primary"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openForm.onTrue}
            >
              New card
            </Button>
          }
        />
      </Card>

      <Dialog fullWidth maxWidth="xs" open={openForm.value} onClose={openForm.onFalse}>
        <DialogTitle> Add new card </DialogTitle>

        <DialogActions>
          <Button color="inherit" variant="outlined" onClick={openForm.onFalse}>
            Cancel
          </Button>

          <Button color="inherit" variant="contained" onClick={openForm.onFalse}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
