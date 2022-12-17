import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
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
import * as React from "react";

// Hàm so sánh các trường thông tin trong cột (orderTime để đánh dấu cột thông tin là thời gian - có cách so sánh riêng)
function descendingComparator(a, b, orderBy, orderTime) {
  if (orderTime) {
    if (Date.parse(b[orderBy]) < Date.parse(a[orderBy])) {
      return -1;
    }
    if (Date.parse(b[orderBy]) > Date.parse(a[orderBy])) {
      return 1;
    }
    return 0;
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// Hàm chọn kiểu so sánh vì hàm so sánh phía trên chỉ so sánh theo một chiều
function getComparator(order, orderBy, orderTime) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy, orderTime)
    : (a, b) => -descendingComparator(a, b, orderBy, orderTime);
}

// Hàng tiêu đề trong bảng được hiệu chỉnh
function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, headCells } = props;
  const createSortHandler = (property, time) => (event) => {
    onRequestSort(event, property, time);
    console.log("Order time", time);
  };

  // Cột thông tin có mã là "id" được dùng để phân biệt các dòng nhưng không hiển thị
  // nên phải lọc cột này ra và giữ các cột còn lại
  const filteredHeadCells = headCells.filter((cell) => cell.id !== "id");

  return (
    <TableHead>
      <TableRow>
        {/* Cột trống được thêm để tạo khoảng cách cho ô chọn select - check */}
        <TableCell padding="checkbox"></TableCell>
        {filteredHeadCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"center"}
            padding={"normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight: "700" }}
          >
            {/* Nếu đây là tiêu đề cho cột thông tin có thể sắp xếp tăng giảm thì chèn thêm hiệu ứng mũi tên */}
            {headCell.sort ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id, headCell.time)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function CheckTable({
  rows,
  id,
  headCells,
  setSelectedItem = (f) => f,
  numOfRowsPerPage = 8,
  handleClickButtonField = (f) => f,
  customField = [],
}) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [orderTime, setOrderTime] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(numOfRowsPerPage);
  const [selected, setSelected] = React.useState([]);

  // Cột thông tin có mã là "id" được dùng để phân biệt các dòng nhưng không hiển thị
  // nên phải lọc cột này ra và giữ các cột còn lại
  const filteredHeadCells = headCells.filter((cell) => cell.id !== "id");

  // Xử lý khi có yêu cầu sắp xếp (chọn vào tiêu đề cột thông tin)
  // Hàm sẽ thiết lập các thông số gồm:
  // 1. Trường nào được sắp xếp
  // 2. Sắp xếp tăng hay giảm
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Thay đổi trang của bảng (mỗi trang là có numOfRowsPerPage hàng, sang hàng sau đó tức sang trang)
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Chọn tất cả các hàng
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows;
      setSelected(newSelected);
      setSelectedItem(newSelected);
      return;
    }
    setSelected([]);
    setSelectedItem([]);
  };

  // Chọn một hàng bất kỳ:
  // 1. Nếu hàng đã chọn sẽ bỏ hàng đây ra khỏi danh sách selected
  // 2. Nếu hàng chưa được chọn sẽ thêm vào danh sách selected
  const handleClick = (event, row) => {
    console.log("Click select row", row);
    const selectedIndex = selected.map((e) => e[id]).indexOf(row[id]);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    console.log("New selected: ", newSelected);

    setSelected(newSelected);
    setSelectedItem(newSelected);
  };

  // Kiểm tra một hàng có phải được chọn hay không (xem thông tin của hàng có trong selected)
  const isSelected = (value) =>
    selected.map((e) => e[id]).indexOf(value) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Paper sx={{ width: "90%", mb: 2 }}>
        <div style={{ textAlign: "left" }}>
          {/* Hiển thị thông tin đã chọn tất cả các dòng trong bảng hay không và cho phép chọn/bỏ chọn tất cả  */}
          <Checkbox
            color="primary"
            indeterminate={selected.length > 0 && selected.length < rows.length}
            checked={rows.length > 0 && selected.length === rows.length}
            onChange={handleSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
          {rows.length > 0 && selected.length === rows.length
            ? "Bỏ chọn tất cả"
            : "Chọn tất cả"}
        </div>

        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              headCells={headCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
              {rows
                .sort(getComparator(order, orderBy, orderTime))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const isItemSelected = isSelected(row[id]);
                  console.log("isItemSelected: " + isItemSelected);
                  console.log(row[id]);
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={index}
                      onClick={(event) => handleClick(event, row)}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      {filteredHeadCells.map((headCell, index) => {
                        // Nếu cột thông tin là đường dẫn link
                        if (headCell.link) {
                          // Nếu đường dẫn link ra trang web bên ngoài
                          if (headCell.external) {
                            return (
                              <TableCell
                                align="center"
                                width={headCell.width}
                                key={index}
                              >
                                <a
                                  href={"https://" + headCell.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {row[headCell.id]}
                                </a>
                              </TableCell>
                            );
                          }

                          // Nếu đường dẫn link là chuyển trang trong ứng dụng (navigation)
                          return (
                            <TableCell
                              align="center"
                              width={headCell.width}
                              key={index}
                            >
                              <Button
                                style={{ textTransform: "none" }}
                                variant="text"
                                color="inherit"
                                onClick={() =>
                                  handleClickButtonField(headCell.id, row)
                                }
                                sx={{ whiteSpace: "normal" }}
                              >
                                {row[headCell.id]}
                              </Button>
                            </TableCell>
                          );
                        }

                        // Nếu trường thông tin này là trường được hiệu chỉnh (tức có component hiển thị riêng)
                        const checkCustomField = customField.filter(
                          (field) => field.id === headCell.id
                        );
                        if (checkCustomField.length > 0) {
                          return checkCustomField[0].component(row, index);
                        }

                        // Nếu trường "id" thì chỉ dùng phân biệt và xử lý logic, không hiển thị
                        if (headCell.id === "id") return <></>;

                        // Các trường khác hiển thị bình thường
                        return (
                          <TableCell
                            align="center"
                            width={headCell.width}
                            key={index}
                          >
                            {row[headCell.id]}
                          </TableCell>
                        );
                      })}
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

        {/* Chuyển trang trong bảng */}
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
