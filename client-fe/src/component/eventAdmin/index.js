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
import { Link, useParams } from 'react-router-dom'
import { WebcamCapture } from "../Webcam";
import Divider from "@mui/material/Divider";
import SideBar from "../navigation";
import { useEffect } from "react";
import ViewEventInfo from "./viewEventInfo";
import eventApi from "../../api/eventAPI.js";
import pocApi from "../../api/PocApi.js";

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

const currentDate = new Date();

export default function ViewEvent() {
  const [listEvents, setListEvents] = React.useState([]);
  
  useEffect(() => {
    const responseGetListEvents = eventApi.getAll();
    responseGetListEvents
      .then((listEvents) => {
        console.log(listEvents);
        setListEvents(listEvents.data);
      })
      .catch((error) => console.error(error));
  
  }, []);



  let {event_id} = useParams();
  if(event_id === undefined)
  event_id = '';
  console.log(event_id);

  return (
    <div>
      <Grid container spacing={0}>
        <Grid xs="auto">
          <div>
            <SideBar id="admin"></SideBar>
          </div>
        </Grid>
        <Grid xs>
          <div id="header" color="blue">
            <h3>Trang theo dõi sự kiện</h3>
          </div>
          <div id="event-list">
            <h3>Chọn sự kiện</h3>
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
                    <TableCell>Thao tác</TableCell>
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
                      <TableCell>
                        {new Date(row["start_date"]) > currentDate ? (
                          <div className="event-action">
                            <div className="event-action-edit">
                              <a href={"/event-action/" + row["event_id"]}>Sửa</a>
                            </div>
                            <div className="event-action-del">Xóa</div>
                          </div>
                        ) : (
                          <div className="event-action">
                            <div className="event-action-view">
                              <a href={"/view-event/" + row["event_id"]}>Xem</a>
                            </div>
                            <div className="event-action-del">Xóa</div>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <Divider />
<ViewEventInfo eventId={event_id}/>
        </Grid>
      </Grid>
    </div>
  );
}
