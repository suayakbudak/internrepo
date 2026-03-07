import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { useSetState } from "minimal-shared/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Scrollbar } from "src/components/scrollbar";
import { toast } from "src/components/snackbar";
import {
  emptyRows,
  getComparator,
  rowInPage,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  useTable,
} from "src/components/table";
import { useGetProjects } from "src/hooks/getters/use-get-projects";
import { axiosAuth } from "src/lib/axios";
import { endpoints } from "src/lib/endpoints";
import { idParam, idsParam } from "src/routes/param";
import { paths } from "src/routes/paths";
import { applyFilter } from "./apply-filter";
import { ProjeTableFiltersResult } from "./proje-table-filters-result";
import { ProjectTableRow } from "./proje-table-row";
import { ProjectTableTabsBar } from "./proje-table-tabs-bar";
import { ProjeTableToolbar } from "./proje-table-toolbar";
import { TABLE_HEAD } from "./table-head";

// ----------------------------------------------------------------------

/**
 * ProjeTable Component - Displays project data in a tabular format
 * @returns {JSX.Element} Project table component
 */
export function ProjectTable() {
  const { projects, projectsLoading, projectsError } = useGetProjects();
  const table = useTable();
  const [tableData, setTableData] = useState(projects);
  const filters = useSetState({ name: "", role: [], status: "all" });
  const { state: currentFilters, setState: updateFilters } = filters;

  useEffect(() => {
    if (projectsLoading || projectsError) return;
    setTableData(projects);
  }, [projectsLoading, projectsError, projects]);

  const dataFiltered = useMemo(
    () =>
      applyFilter({
        inputData: tableData,
        comparator: getComparator(table.order, table.orderBy),
        filters: currentFilters,
      }).slice(table.page * table.rowsPerPage, table.page * table.rowsPerPage + table.rowsPerPage),
    [tableData, table.order, table.orderBy, currentFilters, table.page, table.rowsPerPage]
  );

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset =
    !!currentFilters.name || currentFilters.role.length > 0 || currentFilters.status !== "all";

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleDeleteRow = useCallback(
    async (id) => {
      try {
        await axiosAuth.delete(endpoints.delete.projects.id(id));
        const deleteRow = tableData.filter((row) => row.id !== id);
        setTableData(deleteRow);
        toast.success("Delete success!");
        table.onUpdatePageDeleteRow(dataInPage.length);
      } catch (error) {
        toast.error(error.message);
      }
    },
    [dataInPage.length, table, tableData]
  );

  const handleFilterStatus = useCallback(
    (_event, newValue) => {
      table.onResetPage();
      updateFilters({ status: newValue });
    },
    [updateFilters, table]
  );

  return (
    <Card>
      <ProjectTableTabsBar
        currentFilters={currentFilters}
        handleFilterStatus={handleFilterStatus}
        tableData={tableData}
      />

      <ProjeTableToolbar
        filters={filters}
        onResetPage={table.onResetPage}
        options={{ roles: [] }}
      />

      {canReset && (
        <ProjeTableFiltersResult
          filters={filters}
          totalResults={dataFiltered.length}
          onResetPage={table.onResetPage}
          sx={{ p: 2.5, pt: 0 }}
        />
      )}

      <Scrollbar>
        <Table size={table.dense ? "small" : "medium"} sx={{ minWidth: 960 }}>
          <TableHeadCustom
            headCells={TABLE_HEAD}
            order={table.order}
            onSort={table.onSort}
            orderBy={table.orderBy}
          />

          <TableBody>
            {dataFiltered.map((row) => (
              <ProjectTableRow
                key={row.id}
                row={row}
                onDeleteRow={() => handleDeleteRow(row.id)}
                detailsHref={idParam(paths.anasayfa.gorevYonetimi.projeler.detay, row.id)}
                kanbanHref={idsParam(paths.anasayfa.gorevYonetimi.projeler.kanban, [
                  row.id,
                  row.board.id,
                ])}
              />
            ))}

            <TableEmptyRows
              height={table.dense ? 56 : 56 + 20}
              emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
            />

            <TableNoData notFound={notFound} />
          </TableBody>
        </Table>
      </Scrollbar>

      <TablePaginationCustom
        page={table.page}
        count={dataFiltered.length}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onChangeDense={table.onChangeDense}
        onRowsPerPageChange={table.onChangeRowsPerPage}
      />
    </Card>
  );
}
