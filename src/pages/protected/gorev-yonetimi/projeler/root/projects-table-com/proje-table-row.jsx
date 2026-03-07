import { useBoolean, usePopover } from "minimal-shared/hooks";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import { RouterLink } from "src/routes/router-link";

import { ConfirmDialog } from "src/components/custom-dialog";
import { CustomPopover } from "src/components/custom-popover";
import { Iconify } from "src/components/iconify";
import { Label } from "src/components/label";

import { fDate } from "src/utils/format-time";
import { getStatusColor, getStatusName } from "../../utils";
import { NewProjectDialog } from "../new-project-dialog";

/**
 * @typedef {import("../../../../../hooks/getters/use-get-project").Project} Project
 * @typedef {{
 *   row: Project;
 *   selected: boolean;
 *   editHref: string;
 *   detailsHref: string;
 *   kanbanHref: string;
 *   onDeleteRow: (id: string) => void;
 * }} ProjectTableRowProps
 *
 * @param {ProjectTableRowProps} props - Component props
 */
export function ProjectTableRow({ row, selected, editHref, detailsHref, kanbanHref, onDeleteRow }) {
  const menuActions = usePopover();
  const confirmDialog = useBoolean();
  const editDialog = useBoolean();

  const MenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{ arrow: { placement: "right-top" } }}
    >
      <MenuList>
        <li>
          <MenuItem component={RouterLink} href={detailsHref} onClick={() => menuActions.onClose()}>
            Projeyi görüntüle
          </MenuItem>
        </li>
        <li>
          <MenuItem
            component={RouterLink}
            href={editHref}
            onClick={() => {
              editDialog.onTrue();
              menuActions.onClose();
            }}
          >
            Projeyi düzenle
          </MenuItem>
        </li>

        <MenuItem
          onClick={() => {
            confirmDialog.onTrue();
            menuActions.onClose();
          }}
          sx={{ color: "error.main" }}
        >
          Projeyi sil
        </MenuItem>
      </MenuList>
    </CustomPopover>
  );

  const renderConfirmDialog = () => (
    <ConfirmDialog
      open={confirmDialog.value}
      onClose={confirmDialog.onFalse}
      title="Delete"
      content="Are you sure want to delete?"
      action={
        <Button variant="contained" color="error" onClick={onDeleteRow}>
          Delete
        </Button>
      }
    />
  );

  const HTMLContent = ({ content }) => (
    <Box
      dangerouslySetInnerHTML={{ __html: content }}
      sx={{
        color: "text.secondary",
        mb: 0.5,
        "& p": { typography: "body2", m: 0 },
        "& a": { color: "inherit", textDecoration: "none" },
        "& strong": { typography: "subtitle2" },
      }}
    />
  );

  return (
    <>
      <TableRow hover selected={selected} aria-checked={selected} tabIndex={-1}>
        <TableCell>
          <Stack sx={{ typography: "body2", flex: "1 1 auto", alignItems: "flex-start" }}>
            <Link
              component={RouterLink}
              href={kanbanHref}
              color="inherit"
              sx={{ cursor: "pointer" }}
            >
              {row.name}
            </Link>
            <HTMLContent content={row.description} />
          </Stack>
        </TableCell>

        <TableCell sx={{ whiteSpace: "nowrap" }}>
          {row.created_by.firstName + " " + row.created_by.lastName}
        </TableCell>

        <TableCell sx={{ whiteSpace: "nowrap" }}>
          <Box component="span" sx={{ color: "text.disabled" }}>
            {fDate(row.start_date)}
          </Box>
        </TableCell>

        <TableCell sx={{ whiteSpace: "nowrap" }}>
          <Box component="span" sx={{ color: "text.disabled" }}>
            {fDate(row.end_date)}
          </Box>
        </TableCell>

        <TableCell>
          <Label variant="soft" color={getStatusColor(row.status)}>
            {getStatusName(row.status)}
          </Label>
        </TableCell>

        <TableCell>
          <IconButton color={menuActions.open ? "inherit" : "default"} onClick={menuActions.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      <MenuActions />
      {renderConfirmDialog()}

      <NewProjectDialog
        open={editDialog.value}
        onClose={editDialog.onFalse}
        isEditForm
        values={row}
      />
    </>
  );
}
