import { useSetState } from "minimal-shared/hooks";
import { varAlpha } from "minimal-shared/utils";
import { useCallback, useState, useMemo } from "react";
import Card from "@mui/material/Card";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";

import { Label } from "src/components/label";
import { Scrollbar } from "src/components/scrollbar";
import {
  TableHeadCustom,
  useTable,
  TableNoData,
  TableEmptyRows,
  emptyRows,
  TablePaginationCustom,
} from "src/components/table";

import { AnketTableToolbar } from "./anket-table-toolbar";
import { AnketTableFiltersResult } from "./search-filters-result";
import { _anketList } from "src/_mock/anket";
import { AnketTableRow } from "./anket-table-row";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Anket Adı", width: 300 },
  { id: "createdAt", label: "Oluşturulma Tarihi", width: 180 },
  { id: "status", label: "Durumu", width: 100 },
  { id: "participation", label: "Katılım Oranı", width: 120 },
  { id: "", width: 88 },
];

const STATUS_OPTIONS = [
  { value: "all", label: "Tümü" },
  { value: "published", label: "Aktif" },
  { value: "draft", label: "Pasif" },
];

// ----------------------------------------------------------------------

export function AdminListe() {
  const table = useTable();

  const [tableData, setTableData] = useState(_anketList);

  const filters = useSetState({
    name: "",
    status: "all",
  });

  const { state: currentFilters } = filters;

  const dataFiltered = useMemo(() => {
    let filtered = tableData;

    // Status filtresi
    if (currentFilters.status !== "all") {
      filtered = filtered.filter((item) => item.status === currentFilters.status);
    }

    // Arama filtresi
    if (currentFilters.name) {
      const searchTerm = currentFilters.name.toLowerCase().trim();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().trim().includes(searchTerm) ||
          (item.description && item.description.toLowerCase().trim().includes(searchTerm))
      );
    }

    return filtered;
  }, [tableData, currentFilters.status, currentFilters.name]);

  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setTableData(deleteRow);
  };

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      table.onResetPage();
      filters.setState({ status: newValue });
    },
    [filters, table]
  );

  const handleSort = useCallback((sortDirection) => {
    const sortedData = [...tableData].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortDirection === "desc" ? dateB - dateA : dateA - dateB;
    });
    setTableData(sortedData);
  }, []);

  const canReset = !!currentFilters.name || currentFilters.status !== "all";
  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  return (
    <Card>
      <Tabs
        value={currentFilters.status}
        onChange={handleFilterStatus}
        sx={[
          (theme) => ({
            px: 2.5,
            boxShadow: `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey["500Channel"], 0.08)}`,
          }),
        ]}
      >
        {STATUS_OPTIONS.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            label={tab.label}
            icon={
              <Label
                variant={(tab.value === currentFilters.status && "filled") || "soft"}
                color={
                  (tab.value === "published" && "success") ||
                  (tab.value === "draft" && "error") ||
                  "default"
                }
              >
                {tab.value === "all"
                  ? tableData.length
                  : tableData.filter((item) => item.status === tab.value).length}
              </Label>
            }
          />
        ))}
      </Tabs>

      <AnketTableToolbar filters={filters} onResetPage={table.onResetPage} onSort={handleSort} />

      {canReset && (
        <AnketTableFiltersResult
          filters={filters}
          onResetPage={table.onResetPage}
          totalResults={dataFiltered.length}
          sx={{ p: 2.5, pt: 0 }}
        />
      )}

      <Scrollbar>
        <Box sx={{ px: 2.5 }}>
          <Table size={table.dense ? "small" : "medium"} sx={{ minWidth: 960 }}>
            <TableHeadCustom
              order={table.order}
              orderBy={table.orderBy}
              headCells={TABLE_HEAD}
              rowCount={dataFiltered.length}
              numSelected={table.selected.length}
              onSort={table.onSort}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  dataFiltered.map((row) => row.id)
                )
              }
              sx={{
                borderRadius: 2,
                "& th:first-of-type": { borderTopLeftRadius: 8 },
                "& th:last-child": { borderTopRightRadius: 8 },
              }}
            />

            <TableBody>
              {dataFiltered
                .slice(
                  table.page * table.rowsPerPage,
                  table.page * table.rowsPerPage + table.rowsPerPage
                )
                .map((row) => (
                  <AnketTableRow
                    key={row.id}
                    row={row}
                    selected={table.selected.includes(row.id)}
                    onSelectRow={() => table.onSelectRow(row.id)}
                    onDeleteRow={() => handleDeleteRow(row.id)}
                  />
                ))}

              <TableEmptyRows
                height={table.dense ? 56 : 56 + 20}
                emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
              />

              <TableNoData notFound={notFound} />
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>

      <TablePaginationCustom
        count={dataFiltered.length}
        page={table.page}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
        dense={table.dense}
        onChangeDense={table.onChangeDense}
      />
    </Card>
  );
}
