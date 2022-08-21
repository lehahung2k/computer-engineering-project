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
import { useState, useEffect, useRef } from "react";
import pocApi from "../../api/PocApi";
import eventApi from "../../api/eventAPI.js";

export default function ViewEventInfo({ eventId = "" }) {
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

  const [error, setError] = useState();
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [loadingPoc, setLoadingPoc] = useState(true);
  const event_id = useRef("");
  const [eventInfo, setEventInfo] = useState({});
  const [listPocs, setListPocs] = useState([]);

  useEffect(() => {
    if (eventId === "") return;
    if (!loadingEvent) return;
    const responseEventInfo = eventApi.fetchEventInfo({ id: eventId });
    
    responseEventInfo
      .then((response) => {
        setEventInfo(response.data);
        console.log(response.data);
        setLoadingEvent(false);
      })
      .catch((err) => console.log(err));
    
  });

  useEffect(() => {
    if (eventId === "") return;
    if (!loadingPoc) return;
    const responseListPocs = pocApi.findAllBasedEventId({id: eventId});

    responseListPocs.then((response) => {
      console.log(response);
      setListPocs(response.data);
      setLoadingPoc(false);
    })
    .catch((err) => console.log(err));
  })

  console.log(eventId);
  if (eventId === "") return <h3>Hãy chọn sự kiện để xem</h3>;
  if (loadingEvent) return <h3>Đang tải thông tin sự kiện ...</h3>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  if (eventInfo) {
    var showMap = document.querySelectorAll(".view-event-info-show-map");
    showMap.forEach((e) => {
      e.onclick = () => {
        console.log("hello");
        window.open("https://source.unsplash.com/user/c_v_r/1900x800");
      };
    });

    const startDate = new Date(eventInfo["start_date"]);
    const endDate = new Date(eventInfo["end_date"]);

    const startDateFormatted =
      startDate.getDate().toString().padStart(2, "0") + '/' + 
      (startDate.getMonth() + 1).toString().padStart(2, "0") + '/' +
      startDate.getFullYear().toString();
    const endDateFormatted =
      endDate.getDate().toString().padStart(2, "0") + '/' +
      (endDate.getMonth() + 1).toString().padStart(2, "0") + '/' +
      endDate.getFullYear().toString();
    return (
      <div>
        <div id="view-event-info">
          <div id="view-event-info-main">
            <div id="view-event-info-event-name-label">
              <p>Tên sự kiện</p>
            </div>
            <div id="view-event-info-event-name">
              <p>{eventInfo["event_name"]}</p>
            </div>

            <div id="view-event-info-event-ID-label">
              <p>Mã sự kiện</p>
            </div>
            <div id="view-event-info-event-ID">
              <p>{eventInfo["event_code"]}</p>
            </div>

            <div id="view-event-info-event-start-label">
              <p>Bắt đầu</p>
            </div>
            <div id="view-event-info-event-start">
              <p>{startDateFormatted}</p>
            </div>

            <div id="view-event-info-event-end-label">
              <p>Kết thúc</p>
            </div>
            <div id="view-event-info-event-end">
              <p>{endDateFormatted}</p>
            </div>

            <div id="view-event-info-event-note-label">
              <p>Ghi chú</p>
            </div>
            <div id="view-event-info-event-note">
              {eventInfo["event_description"]}
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
                    key={row['point_id']}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row['point_id']}</TableCell>
                    <TableCell component="th" scope="row">
                      {row['event_id']}
                    </TableCell>
                    <TableCell>{row['point_name']}</TableCell>
                    <TableCell>Ghi chú</TableCell>
                    <TableCell>
                      <div className="view-event-info-show-map">Map</div>
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
}
