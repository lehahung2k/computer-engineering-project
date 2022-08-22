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

const currentDate = new Date();

export default function EventTable({ listEvents, type }) {
  const [confirmEventDelete, setConfirmEventDelete] = React.useState(false);
  const event_name_deletion = React.useRef("");
  const confirmEventDeletion = (id, name) => {
    event_name_deletion.current = name;
    setConfirmEventDelete(!confirmEventDelete);
  };

  const handleDeleteEvent = () => {
    console.log("Xác nhận xóa sự kiện");
    setConfirmEventDelete(!confirmEventDelete);
  };

  return (
    <div>
      <TableContainer
        component={Paper}
        id="event-list-table"
        style={{ height: 200 }}
      >
        <Table stickyHeader sx={{ minWidth: 650 }}>
          <TableHead id="event-list-TableHead">
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên sự kiện</TableCell>
              <TableCell>Bắt đầu</TableCell>
              <TableCell>Kết thúc</TableCell>
              <TableCell>POC</TableCell>
              <TableCell>
                {type == "CRUD" ? "Thao tác" : "Xem chi tiết thống kê"}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listEvents.map((row) => (
              <TableRow
                key={row["event_id"]}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row["event_code"]}</TableCell>
                <TableCell>{row["event_name"]}</TableCell>
                <TableCell>{row["start_date"]}</TableCell>
                <TableCell>{row["end_date"]}</TableCell>
                <TableCell>10</TableCell>
                {type === "CRUD" ? (
                  <TableCell>
                    {new Date(row["start_date"]) > currentDate ? (
                      <div className="event-action">
                        <Button className="event-action-edit">
                          <a
                            style={{ color: "#1976d2", textDecoration: "none" }}
                            href={"/event-action/" + row["event_id"]}
                          >
                            Sửa
                          </a>
                        </Button>
                        <Button
                          className="event-action-del"
                          onClick={() =>
                            confirmEventDeletion(
                              row["event_id"],
                              row["event_name"]
                            )
                          }
                        >
                          Xóa
                        </Button>
                      </div>
                    ) : (
                      <div className="event-action">
                        <Button className="event-action-view">
                          <a
                            style={{ color: "#1976d2", textDecoration: "none" }}
                            href={"/view-event/" + row["event_id"]}
                          >
                            Xem
                          </a>
                        </Button>
                        <Button
                          className="event-action-del"
                          onClick={() =>
                            confirmEventDeletion(
                              row["event_id"],
                              row["event_name"]
                            )
                          }
                        >
                          Xóa
                        </Button>
                      </div>
                    )}
                  </TableCell>
                ) : (
                  <TableCell>
                    <Button onClick={() =>alert("Tính năng đang được cập nhật cho phiên bản sau")}>Xem</Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={confirmEventDelete}
        onClose={confirmEventDeletion}
        aria-labelledby="responsive-dialog-title"
        fullWidth="true"
        maxWidth="sm"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Xóa thông tin sự kiện"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>
              Bạn có muốn xóa thông tin sự kiện {event_name_deletion.current}{" "}
              không?
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDeleteEvent}>
            Xác nhận
          </Button>
          <Button onClick={confirmEventDeletion} autoFocus>
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
