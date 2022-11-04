import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";
import * as React from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

function createData(name, id, time, note, image) {
  return {
    name,
    id,
    time,
    note,
    image,
  };
}

const rows = [
  createData(
    "Nguyễn Văn A",
    "0123456",
    "09:00 12/12/2022",
    "Khách checkin không chụp ảnh",
    ""
  ),
  createData(
    "Nguyễn Văn A",
    "0123456",
    "09:00 12/12/2022",
    "Khách checkin không chụp ảnh",
    ""
  ),
  createData(
    "Nguyễn Văn A",
    "0123456",
    "09:00 12/12/2022",
    "Khách checkin không chụp ảnh",
    ""
  ),
  createData(
    "Nguyễn Văn A",
    "0123456",
    "09:00 12/12/2022",
    "Khách checkin không chụp ảnh",
    ""
  ),
  createData(
    "Nguyễn Văn A",
    "0123456",
    "09:00 12/12/2022",
    "Khách checkin không chụp ảnh",
    ""
  ),
  createData(
    "Nguyễn Văn A",
    "0123456",
    "09:00 12/12/2022",
    "Khách checkin không chụp ảnh",
    ""
  ),
  createData(
    "Nguyễn Văn A",
    "0123456",
    "09:00 12/12/2022",
    "Khách checkin không chụp ảnh",
    ""
  ),
  createData(
    "Nguyễn Văn A",
    "0123456",
    "09:00 12/12/2022",
    "Khách checkin không chụp ảnh",
    ""
  ),
  createData(
    "Nguyễn Văn A",
    "0123456",
    "09:00 12/12/2022",
    "Khách checkin không chụp ảnh",
    ""
  ),
  createData(
    "Nguyễn Văn A",
    "0123456",
    "09:00 12/12/2022",
    "Khách checkin không chụp ảnh",
    ""
  ),
  createData(
    "Nguyễn Văn A",
    "0123456",
    "09:00 12/12/2022",
    "Khách checkin không chụp ảnh",
    ""
  ),
  createData(
    "Nguyễn Văn A",
    "0123456",
    "09:00 12/12/2022",
    "Khách checkin không chụp ảnh",
    ""
  ),
  createData(
    "Nguyễn Văn A",
    "0123456",
    "09:00 12/12/2022",
    "Khách checkin không chụp ảnh",
    ""
  ),
  createData(
    "Nguyễn Văn A",
    "0123456",
    "09:00 12/12/2022",
    "Khách checkin không chụp ảnh",
    ""
  ),
  createData(
    "Nguyễn Văn A",
    "0123456",
    "09:00 12/12/2022",
    "Khách checkin không chụp ảnh",
    ""
  ),
  createData(
    "Nguyễn Văn A",
    "0123456",
    "09:00 12/12/2022",
    "Khách checkin không chụp ảnh",
    ""
  ),
  createData(
    "Nguyễn Văn A",
    "0123456",
    "09:00 12/12/2022",
    "Khách checkin không chụp ảnh",
    ""
  ),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: "name",
    label: "Họ và tên",
  },
  {
    id: "id",
    label: "Mã định danh",
  },
  {
    id: "time",
    label: "Thời điểm check-in",
  },
  {
    id: "note",
    label: "Ghi chú",
  },
  {
    id: "image",
    label: "Hình ảnh check-in",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"center"}
            padding={"normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ backgroundColor: "#E6E6E6", fontWeight: "700" }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function GuestsTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const navigate = useNavigate();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Paper sx={{ width: "90%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
              {rows
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover tabIndex={-1} key={row.name}>
                      <TableCell component="th" id={labelId} align="center">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.id}</TableCell>
                      <TableCell align="center">{row.time}</TableCell>
                      <TableCell align="center">{row.note}</TableCell>
                      <TableCell align="center">{row.image}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </Paper>
    </Box>
  );
}