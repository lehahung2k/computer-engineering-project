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
  var selectEvent = true;

  // useEffect(() => {
  //   const selected = document.querySelector("#event-select-box-selected");
  //   const optionsContainer = document.querySelector(
  //     "#event-select-box-options-container"
  //   );

  //   const optionsList = document.querySelectorAll(".event-select-box-option");

  //   // selected.addEventListener("click", () => {
  //   //   optionsContainer.classList.toggle("active");
  //   //   console.log("event selected");
  //   // });

  //   selected.onclick = () => {
  //     optionsContainer.classList.toggle("active");
  //     console.log("event clicked");
  //   };

  //   optionsList.forEach((o) => {
  //     // o.addEventListener("click", () => {
  //     //   selected.innerHTML = o.querySelector("label").innerHTML;
  //     //   optionsContainer.classList.remove("active");
  //     // });

  //     o.onclick = () => {
  //       selected.innerHTML = o.querySelector("label").innerHTML;
  //       optionsContainer.classList.remove("active");
  //       if (selectEvent) {
  //         fetch("https://api.github.com/users/moonhighway")
  //           .then((res) => res.json())
  //           .then(console.log)
  //           .then(() => {
  //             selectEvent = true;
  //           });
  //         console.log("hello");
  //       }

  //       selectEvent = false;
  //     };
  //   });
  // }, []);


  let {event_id} = useParams();
  if(event_id === undefined)
  event_id = '';
  console.log(event_id);

  return (
    <div>
      <>
        {/* <Grid container spacing={0}>
        <Grid xs="auto">
          <div>
            <SideBar id="0"></SideBar>
          </div>
        </Grid>
        <Grid xs>
          <div id="header" color="blue">
            <h3>Trang quản lý sự kiện</h3>
          </div>

          <div id="poc-info">
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <div id="event-name-label">Chọn sự kiện</div>
              </Grid>

              <Grid item xs={4}>
                <div id="event-select-box">
                  <div id="event-select-box-options-container">
                    <div class="event-select-box-option">
                      <input
                        type="radio"
                        class="radio"
                        id="automobiles"
                        name="category"
                      />
                      <label for="automobiles">Automobiles</label>
                    </div>

                    <div class="event-select-box-option">
                      <input
                        type="radio"
                        class="radio"
                        id="film"
                        name="category"
                      />
                      <label for="film">Film & Animation</label>
                    </div>

                    <div class="event-select-box-option">
                      <input
                        type="radio"
                        class="radio"
                        id="science"
                        name="category"
                      />
                      <label for="science">Science & Technology</label>
                    </div>

                    <div class="event-select-box-option">
                      <input
                        type="radio"
                        class="radio"
                        id="art"
                        name="category"
                      />
                      <label for="art">Art</label>
                    </div>

                    <div class="event-select-box-option">
                      <input
                        type="radio"
                        class="radio"
                        id="music"
                        name="category"
                      />
                      <label for="music">Music</label>
                    </div>

                    <div class="event-select-box-option">
                      <input
                        type="radio"
                        class="radio"
                        id="travel"
                        name="category"
                      />
                      <label for="travel">Travel & Events</label>
                    </div>

                    <div class="event-select-box-option">
                      <input
                        type="radio"
                        class="radio"
                        id="sports"
                        name="category"
                      />
                      <label for="sports">Sports</label>
                    </div>

                    <div class="event-select-box-option">
                      <input
                        type="radio"
                        class="radio"
                        id="news"
                        name="category"
                      />
                      <label for="news">News & Politics</label>
                    </div>

                    <div class="event-select-box-option">
                      <input
                        type="radio"
                        class="radio"
                        id="tutorials"
                        name="category"
                      />
                      <label for="tutorials">Tutorials</label>
                    </div>
                  </div>

                  <div id="event-select-box-selected">
                    Select Video Category
                  </div>
                </div>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={3}>
                <div id="poc-name-label">Tên quầy</div>{" "}
              </Grid>

              <Grid item xs={4}>
                <div id="poc-name-value">Tên quầy</div>{" "}
              </Grid>
            </Grid>
          </div>

          <div id="check-in">
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <div className="poc-cam">
                  <WebcamCapture />
                </div>
              </Grid>

              <Grid item xs={4}>
                <div className="poc-cam">
                  <WebcamCapture />
                </div>
              </Grid>

              <Grid item xs={4} id="check-in-info">
                <div id="check-in-info-div">
                  <form id="check-in-info-form">
                    <label>Mã số sinh viên</label>
                    <br />
                    <input
                      type="text"
                      id="student-id"
                      name="student-id"
                      autofocus="true"
                    ></input>
                    <br />

                    <label>Ghi chú</label>
                    <br />
                    <textarea
                      type="text"
                      id="check-in-note"
                      name="check-in-note"
                    ></textarea>
                    <br />
                  </form>
                  <button
                    type="submit"
                    form="check-in-info-form"
                    value="Submit"
                  >
                    Submit
                  </button>
                </div>
              </Grid>
            </Grid>
          </div>
          <Divider />
          <div id="check-in-table-label">
            <h3>Xem danh sách check-in</h3>
          </div>

          <div id="check-in-list">
            <TableContainer
              component={Paper}
              id="check-in-table"
              style={{ height: 200 }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead id="check-in-TableHead">
                  <TableRow>
                    <TableCell>Thời điểm</TableCell>
                    <TableCell>Mã số sinh viên</TableCell>
                    <TableCell>Ghi chú</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.calories}</TableCell>
                      <TableCell>{row.fat}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
                  </div>
        </Grid>
      </Grid> */}
      </>
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
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{row.ID}</TableCell>
                      <TableCell component="th" scope="row">
                        {row.eventName}
                      </TableCell>
                      <TableCell>{row.start}</TableCell>
                      <TableCell>{row.end}</TableCell>
                      <TableCell>{row.POC}</TableCell>
                      <TableCell>
                        {new Date(row.start) > currentDate ? (
                          <div className="event-action">
                            <div className="event-action-edit"><Link to={'/event-action/'+row.ID}>Sửa</Link></div>
                            <div className="event-action-del">Xóa</div>
                          </div>
                        ) : (
                          <div className="event-action">
                            <div className="event-action-view"><Link to={'/view-event/'+row.ID}>Xem</Link></div>
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
