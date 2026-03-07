import { useBoolean } from "minimal-shared/hooks";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import { Label } from "src/components/label";
import { ConfirmDialog } from "src/components/custom-dialog";
import { fDate } from "src/utils/format-time";
import { OptionMenu } from "./option-menu";

// ----------------------------------------------------------------------

export function AnketTableRow({ row, selected, onSelectRow, onDeleteRow }) {
  const confirmDialog = useBoolean();

  const renderConfirmDialog = () => (
    <ConfirmDialog
      open={confirmDialog.value}
      onClose={confirmDialog.onFalse}
      title="Sil"
      content="Bu anketi silmek istediğinizden emin misiniz?"
      action={
        <Button variant="contained" color="error" onClick={onDeleteRow}>
          Sil
        </Button>
      }
    />
  );

  return (
    <>
      <TableRow hover selected={selected} sx={{ flexDirection: "row" }}>
        <TableCell>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              maxWidth: 300,
            }}
          >
            <Typography
              variant="subtitle2"
              noWrap
              sx={{
                fontWeight: 600,
                color: "text.primary",
              }}
            >
              {row.name}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: "20px",
              }}
            >
              {row.description}
            </Typography>
          </Box>
        </TableCell>

        <TableCell>{fDate(row.createdAt)}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (row.status === "Tamamlandı" && "success") ||
              (row.status === "Anketi Yanıtla" && "error") ||
              "warning"
            }
          >
            {row.status}
          </Label>
        </TableCell>
        <TableCell />

        <TableCell align="right">
          <OptionMenu anketId={row.id} onDelete={() => confirmDialog.onTrue()} />
        </TableCell>
      </TableRow>

      {renderConfirmDialog()}
    </>
  );
}
