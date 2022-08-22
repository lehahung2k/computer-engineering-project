import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "./index.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function PocTable({ listPocs }) {
  const [confirmPOCDelete, setConfirmPOCDelete] = React.useState(false);
  const confirmPOCDeletion = () => {
    setConfirmPOCDelete(!confirmPOCDelete);
  };

  const handleDeletePOC = () => {
    console.log("Xác nhận xóa POC");
    setConfirmPOCDelete(!confirmPOCDelete);
  };
  return (
    <>
      <TableContainer
        component={Paper}
        id="POC-list-table"
        style={{ height: 200 }}
      >
        <Table stickyHeader sx={{ minWidth: 650 }}>
          <TableHead id="POC-list-TableHead">
            <TableRow>
              <TableCell>ID POC</TableCell>
              <TableCell>ID sự kiện</TableCell>
              <TableCell>Tên POC</TableCell>
              <TableCell>Ghi chú</TableCell>
              <TableCell>Vị trí</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listPocs.map((row) => (
              <TableRow
                key={row["point_id"]}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row["point_id"]}</TableCell>
                <TableCell component="th" scope="row">
                  {row["event_id"]}
                </TableCell>
                <TableCell>{row["point_name"]}</TableCell>
                <TableCell>Ghi chú</TableCell>
                <TableCell>
                  <div className="view-event-info-show-map">Map</div>
                </TableCell>
                <TableCell>
                  <Button onClick={confirmPOCDeletion}>Xóa</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={confirmPOCDelete}
        onClose={confirmPOCDeletion}
        aria-labelledby="responsive-dialog-title"
        fullWidth="true"
        maxWidth="sm"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Xác nhận xóa thông tin POC"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>Bạn có muốn xóa thông tin POC này không?</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDeletePOC}>
            Xác nhận
          </Button>
          <Button onClick={confirmPOCDeletion} autoFocus>
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
