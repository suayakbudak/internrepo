import { useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { DashboardContent } from "src/pages/protected/layout";

import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";

// ----------------------------------------------------------------------

const logs = [
  {
    id: 1,
    username: "user1",
    email: "user1@example.com",
    action: "Login",
    timestamp: "2024-12-20 10:15:00",
    unit: "Finance",
  },
  {
    id: 2,
    username: "user2",
    email: "user2@example.com",
    action: "Logout",
    timestamp: "2024-12-21 11:00:00",
    unit: "IT",
  },
  {
    id: 3,
    username: "user3",
    email: "user3@example.com",
    action: "Updated Profile",
    timestamp: "2024-12-21 12:30:00",
    unit: "HR",
  },
  {
    id: 4,
    username: "user1",
    email: "user1@example.com",
    action: "Reset Password",
    timestamp: "2024-12-21 13:45:00",
    unit: "Finance",
  },
  {
    id: 5,
    username: "user2",
    email: "user2@example.com",
    action: "Login",
    timestamp: "2024-12-21 14:15:00",
    unit: "IT",
  },
];

export function LogView() {
  const [filteredLogs, setFilteredLogs] = useState(logs);
  const [filters, setFilters] = useState({
    email: "",
    username: "",
    startDate: null,
    endDate: null,
    unit: "",
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const { email, username, startDate, endDate, unit } = filters;
    const filtered = logs.filter((log) => {
      const matchesEmail = email ? log.email.includes(email) : true;
      const matchesUsername = username ? log.username.includes(username) : true;
      const matchesStartDate = startDate ? new Date(log.timestamp) >= new Date(startDate) : true;
      const matchesEndDate = endDate ? new Date(log.timestamp) <= new Date(endDate) : true;
      const matchesUnit = unit ? log.unit.includes(unit) : true;
      return matchesEmail && matchesUsername && matchesStartDate && matchesEndDate && matchesUnit;
    });
    setFilteredLogs(filtered);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Kullanıcı Log İzleme"
        links={[
          { name: "Anasayfa" },
          { name: "Admin Panel" },
          { name: "Raporlama" },
          { name: "Kullanıcı Log İzleme" },
        ]}
        sx={{ mb: { xs: 2, md: 3 } }}
      />
      <Box sx={{ p: 3 }}>
        <Card>
          <CardHeader
            sx={{ mb: 3 }}
            title="Kullanıcı Logları"
            subheader="Kullanıcı aktivitelerini filtreleyin ve görüntüleyin."
          />
          <Divider />
          <Box sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Kullanıcı Maili"
                  fullWidth
                  value={filters.email}
                  onChange={(e) => handleFilterChange("email", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Kullanıcı Adı"
                  fullWidth
                  value={filters.username}
                  onChange={(e) => handleFilterChange("username", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Başlangıç Tarihi"
                    value={filters.startDate}
                    onChange={(value) => handleFilterChange("startDate", value)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                    ampm={false}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Bitiş Tarihi"
                    value={filters.endDate}
                    onChange={(value) => handleFilterChange("endDate", value)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                    ampm={false}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Birim"
                  fullWidth
                  value={filters.unit}
                  onChange={(e) => handleFilterChange("unit", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button variant="contained" onClick={applyFilters} fullWidth>
                  Filtrele
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight="bold">Kullanıcı Adı</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">E-posta</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">Eylem</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">Tarih ve Saat</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">Birim</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredLogs
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.username}</TableCell>
                      <TableCell>{log.email}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.timestamp}</TableCell>
                      <TableCell>{log.unit}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={filteredLogs.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Box>
    </DashboardContent>
  );
}
