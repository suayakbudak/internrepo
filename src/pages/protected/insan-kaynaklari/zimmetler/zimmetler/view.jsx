import { useBoolean, useSetState } from "minimal-shared/hooks";
import { forwardRef, useCallback, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Link from "@mui/material/Link";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import {
  DataGrid,
  GridActionsCellItem,
  gridClasses,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";

import { paths } from "src/routes/paths";
import { RouterLink } from "src/routes/router-link";

import { PRODUCT_STOCK_OPTIONS } from "src/_mock";
import { useGetProducts } from "src/lib/actions/product";
import { DashboardContent } from "src/pages/protected/layout";

import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";
import { ConfirmDialog } from "src/components/custom-dialog";
import { EmptyContent } from "src/components/empty-content";
import { Iconify } from "src/components/iconify";
import { toast } from "src/components/snackbar";

import { idParam } from "src/routes/param";
import { ProductTableFiltersResult } from "./components/product-table-filters-result";
import {
  RenderCellCreatedAt,
  RenderCellPrice,
  RenderCellProduct,
  RenderCellPublish,
  RenderCellStock,
} from "./components/product-table-row";
import { ProductTableToolbar } from "./components/product-table-toolbar";

// ----------------------------------------------------------------------

const PUBLISH_OPTIONS = [
  { value: "published", label: "Published" },
  { value: "draft", label: "Draft" },
];

const HIDE_COLUMNS = { category: false };

const HIDE_COLUMNS_TOGGLABLE = ["category", "actions"];

// ----------------------------------------------------------------------

export function ProductListView() {
  const confirmDialog = useBoolean();

  const { products, productsLoading } = useGetProducts();

  const [tableData, setTableData] = useState(products);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [filterButtonEl, setFilterButtonEl] = useState(null);

  const filters = useSetState({ publish: [], stock: [] });
  const { state: currentFilters } = filters;

  const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);

  useEffect(() => {
    if (products.length) {
      setTableData(products);
    }
  }, [products]);

  const canReset = currentFilters.publish.length > 0 || currentFilters.stock.length > 0;

  const dataFiltered = applyFilter({ inputData: products, filters: currentFilters });

  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);

      toast.success("Delete success!");

      setTableData(deleteRow);
    },
    [tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !selectedRowIds.includes(row.id));

    toast.success("Delete success!");

    setTableData(deleteRows);
  }, [selectedRowIds, tableData]);

  const CustomToolbarCallback = useCallback(
    () => (
      <CustomToolbar
        filters={filters}
        canReset={canReset}
        selectedRowIds={selectedRowIds}
        setFilterButtonEl={setFilterButtonEl}
        filteredResults={dataFiltered.length}
        onOpenConfirmDeleteRows={confirmDialog.onTrue}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentFilters, selectedRowIds]
  );

  const columns = [
    { field: "category", headerName: "Category", filterable: false },
    {
      field: "name",
      headerName: "Product",
      flex: 1,
      minWidth: 360,
      hideable: false,
      renderCell: (params) => (
        <RenderCellProduct
          params={params}
          href={idParam(paths.anasayfa.insanKaynaklari.zimmetler.details, params.row.id)}
        />
      ),
    },
    {
      field: "createdAt",
      headerName: "Create at",
      width: 160,
      renderCell: (params) => <RenderCellCreatedAt params={params} />,
    },
    {
      field: "inventoryType",
      headerName: "Stock",
      width: 160,
      type: "singleSelect",
      valueOptions: PRODUCT_STOCK_OPTIONS,
      renderCell: (params) => <RenderCellStock params={params} />,
    },
    {
      field: "price",
      headerName: "Price",
      width: 140,
      editable: true,
      renderCell: (params) => <RenderCellPrice params={params} />,
    },
    {
      field: "publish",
      headerName: "Publish",
      width: 110,
      type: "singleSelect",
      editable: true,
      valueOptions: PUBLISH_OPTIONS,
      renderCell: (params) => <RenderCellPublish params={params} />,
    },
    {
      type: "actions",
      field: "actions",
      headerName: " ",
      align: "right",
      headerAlign: "right",
      width: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => [
        <GridActionsLinkItem
          showInMenu
          icon={<Iconify icon="solar:eye-bold" />}
          label="View"
          href={idParam(paths.anasayfa.insanKaynaklari.zimmetler.details, params.row.id)}
        />,
        <GridActionsLinkItem
          showInMenu
          icon={<Iconify icon="solar:pen-bold" />}
          label="Edit"
          href={idParam(paths.anasayfa.insanKaynaklari.zimmetler.duzenle, params.row.id)}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:trash-bin-trash-bold" />}
          label="Delete"
          onClick={() => handleDeleteRow(params.row.id)}
          sx={{ color: "error.main" }}
        />,
      ],
    },
  ];

  const getTogglableColumns = () =>
    columns
      .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
      .map((column) => column.field);

  const renderConfirmDialog = () => (
    <ConfirmDialog
      open={confirmDialog.value}
      onClose={confirmDialog.onFalse}
      title="Delete"
      content={
        <>
          Are you sure want to delete <strong> {selectedRowIds.length} </strong> items?
        </>
      }
      action={
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            handleDeleteRows();
            confirmDialog.onFalse();
          }}
        >
          Delete
        </Button>
      }
    />
  );

  return (
    <>
      <DashboardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <CustomBreadcrumbs
          heading="Zimmetler"
          links={[
            { name: "Anasayfa", href: paths.anasayfa.root },
            { name: "İnsan Kaynakları", href: paths.anasayfa.admin.insanKaynaklari.zimmetler.root },
            { name: "Zimmetler" },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.anasayfa.admin.insanKaynaklari.zimmetler.olustur}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New product
            </Button>
          }
          sx={{ mb: { xs: 2, md: 3 } }}
        />

        <Card
          sx={{
            minHeight: 640,
            flexGrow: { md: 1 },
            display: { md: "flex" },
            height: { xs: 800, md: "1px" },
            flexDirection: { md: "column" },
          }}
        >
          <DataGrid
            checkboxSelection
            disableRowSelectionOnClick
            rows={dataFiltered}
            columns={columns}
            loading={productsLoading}
            getRowHeight={() => "auto"}
            pageSizeOptions={[5, 10, 20, { value: -1, label: "All" }]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            onRowSelectionModelChange={(newSelectionModel) => setSelectedRowIds(newSelectionModel)}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
            slots={{
              toolbar: CustomToolbarCallback,
              noRowsOverlay: () => <EmptyContent />,
              noResultsOverlay: () => <EmptyContent title="No results found" />,
            }}
            slotProps={{
              toolbar: { setFilterButtonEl },
              panel: { anchorEl: filterButtonEl },
              columnsManagement: { getTogglableColumns },
            }}
            sx={{ [`& .${gridClasses.cell}`]: { alignItems: "center", display: "inline-flex" } }}
          />
        </Card>
      </DashboardContent>

      {renderConfirmDialog()}
    </>
  );
}

// ----------------------------------------------------------------------

function CustomToolbar({
  filters,
  canReset,
  selectedRowIds,
  filteredResults,
  setFilterButtonEl,
  onOpenConfirmDeleteRows,
}) {
  return (
    <>
      <GridToolbarContainer>
        <ProductTableToolbar
          filters={filters}
          options={{ stocks: PRODUCT_STOCK_OPTIONS, publishs: PUBLISH_OPTIONS }}
        />

        <GridToolbarQuickFilter />

        <Box
          sx={{
            gap: 1,
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {!!selectedRowIds.length && (
            <Button
              size="small"
              color="error"
              startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
              onClick={onOpenConfirmDeleteRows}
            >
              Delete ({selectedRowIds.length})
            </Button>
          )}

          <GridToolbarColumnsButton />
          <GridToolbarFilterButton ref={setFilterButtonEl} />
          <GridToolbarExport />
        </Box>
      </GridToolbarContainer>

      {canReset && (
        <ProductTableFiltersResult
          filters={filters}
          totalResults={filteredResults}
          sx={{ p: 2.5, pt: 0 }}
        />
      )}
    </>
  );
}

// ----------------------------------------------------------------------

export const GridActionsLinkItem = forwardRef((props, ref) => {
  const { href, label, icon, sx } = props;

  return (
    <MenuItem ref={ref} sx={sx}>
      <Link
        component={RouterLink}
        href={href}
        underline="none"
        color="inherit"
        sx={{ width: 1, display: "flex", alignItems: "center" }}
      >
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        {label}
      </Link>
    </MenuItem>
  );
});

// ----------------------------------------------------------------------

function applyFilter({ inputData, filters }) {
  const { stock, publish } = filters;

  if (stock.length) {
    inputData = inputData.filter((product) => stock.includes(product.inventoryType));
  }

  if (publish.length) {
    inputData = inputData.filter((product) => publish.includes(product.publish));
  }

  return inputData;
}
