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
import { Link, useParams } from "react-router-dom";
import { WebcamCapture } from "../Webcam";
import Divider from "@mui/material/Divider";
import SideBar from "../navigation";
import { useState, useEffect } from "react";

export default function ViewEventInfo({eventId = ''}) {
  function createData(ID, eventName, start, end, POC) {
    return { ID, eventName, start, end, POC };
  }

  const rows = [
    createData(1, "Frozen yoghurt", "2021-03-05", "2021-04-05", 24),
    createData(
      2,
      "Frozen yoghurt",
      "2021-05-05T08:00:00",
      "2021-06-05T08:00:00",
      24
    ),
    createData(
      3,
      "Frozen yoghurt",
      "2021-07-05T08:00:00",
      "2021-08-05T08:00:00",
      24
    ),
    createData(
      4,
      "Frozen yoghurt",
      "2021-09-05T08:00:00",
      "2021-10-05T08:00:00",
      24
    ),
    createData(
      5,
      "Frozen yoghurt",
      "2022-10-05T08:00:00",
      "2022-11-05T08:00:00",
      24
    ),
    createData(
      6,
      "Frozen yoghurt",
      "2022-03-05T08:00:00",
      "2022-04-05T08:00:00",
      24
    ),
  ];

  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (eventId==='') return;
    if (!loading) return;
    fetch(`https://api.github.com/users/`+eventId)
      .then((data) => data.json())
      .then(setData)
      .then(console.log('data'))
      .then(() => setLoading(false))
      .catch(setError);
  });

    console.log(eventId);
  if (eventId==='') return <h3>Hãy chọn sự kiện để xem</h3>
  if (loading) return <h3>Đang tải thông tin sự kiện ...</h3>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  if (data)
    return (
        
      <div>
        <div id="view-event-info">
          <div id="view-event-info-main">
            <div id="view-event-info-event-name-label">
              <p>Tên sự kiện</p>
            </div>
            <div id="view-event-info-event-name">
              <p>Event name</p>
            </div>

            <div id="view-event-info-event-ID-label">
              <p>Mã sự kiện</p>
            </div>
            <div id="view-event-info-event-ID">
              <p>Event ID</p>
            </div>

            <div id="view-event-info-event-start-label">
              <p>Bắt đầu</p>
            </div>
            <div id="view-event-info-event-start">
              <p>Start</p>
            </div>

            <div id="view-event-info-event-end-label">
              <p>Kết thúc</p>
            </div>
            <div id="view-event-info-event-end">
              <p>End</p>
            </div>

            <div id="view-event-info-event-note-label">
              <p>Ghi chú</p>
            </div>
            <div id="view-event-info-event-note">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              semper erat sapien. Pellentesque eu varius augue. Praesent lacus
              eros, pellentesque in tempor at, dapibus et libero. Vestibulum
              vehicula blandit urna vehicula hendrerit. Nulla nec viverra justo,
              quis faucibus metus. Praesent ut nisl erat. Vestibulum vulputate
              pulvinar mi id sollicitudin. Ut facilisis lectus eu placerat
              mattis. Sed pulvinar odio sit amet felis luctus, sit amet
              consectetur purus dapibus. Duis viverra fermentum imperdiet. Donec
              est nisl, vehicula eu fringilla dapibus, tempor at dolor. Quisque
              feugiat iaculis sagittis.
            </div>
          </div>
          <div id="view-event-info-map-thumbnail">
            <img src="/image/map_example.jpg" />
          </div>
        </div>
        <Divider />
        <div>
          <TableContainer
            component={Paper}
            id="POC-list-table"
            style={{ height: 200 }}
          >
            <Table stickyHeader sx={{ minWidth: 650 }}>
              <TableHead id="POC-list-TableHead">
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Tên sự kiện</TableCell>
                  <TableCell>Mã POC</TableCell>
                  <TableCell>Ghi chú</TableCell>
                  <TableCell>Vị trí</TableCell>
                  <TableCell>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.ID}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.eventName}
                    </TableCell>
                    <TableCell>Mã POC</TableCell>
                    <TableCell>Ghi chú</TableCell>
                    <TableCell>
                      <a href="#">Map</a>
                    </TableCell>
                    <TableCell>
                      <div>Xóa</div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
}
