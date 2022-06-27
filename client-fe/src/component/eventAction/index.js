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
import Divider from "@mui/material/Divider";
import SideBar from "../navigation";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import './index.css';

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

export default function EventAction() {
  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  var imgFile;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleUploadImage = async (e) => {
    if (e.target.files.length > 0) {
      imgFile = e.target.files[0];
      var src = URL.createObjectURL(imgFile);
      var base = await convertBase64(imgFile);
      console.log(base);
      var preview = document.querySelector("#map-img-preview");
      preview.src = src;
      // preview.style.display = "block";
      preview.style.height = "200px";
      preview.style.width = "300px";
      // window.open(src);
    }
  };

  const handleNewEvent = ()=>{
    var newEvent = new FormData();
    var eventName = document.querySelector("#event-action-info-value-event-name");
    console.log('hello');
    console.log(eventName.value);
    newEvent.append('event-name', eventName.value);
    let r = (Math.random() + 1).toString(36).slice(2,6);
    newEvent.append('event-ID', r);
    newEvent.append('map-img', imgFile)
    for (let pair of newEvent.entries()) {
      console.log(pair[0] + ':' + pair[1]);
    }
}
  

  return (
    <div>
      <Grid container spacing={0}>
        <Grid xs="auto">
          <div>
            <SideBar id="0"></SideBar>
          </div>
        </Grid>
        <Grid xs>
          <div id="header" color="blue">
            <h3>Trang thêm, sửa sự kiện</h3>
          </div>
          <div id="event-list">
            <h3>Danh sách sự kiễn đã có</h3>
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
                            <div className="event-action-edit">Sửa</div>
                            <div className="event-action-del">Xóa</div>
                          </div>
                        ) : (
                          <div className="event-action">
                            <div className="event-action-view">
                              <Link to={"/view-event/" + row.ID}>Xem</Link>
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
          <br />
          <div>
            <Grid container spacing={2}>
              <Grid item xs={12} sm container spacing={2}>
                <Grid item xs={3}>
                  <div className="event-action-info-label">Tên sự kiện :</div>
                </Grid>
                <Grid item xs={3}>
                  <div className="event-action-info-value">
                    <input type="text" id="event-action-info-value-event-name"></input>
                  </div>
                </Grid>

                <Grid item xs={3}>
                  <div className="event-action-info-label">Mã sự kiện :</div>
                </Grid>
                <Grid item xs={3}>
                  <div className="event-action-info-value">
                    <input type="text"></input>
                  </div>
                </Grid>

                <Grid item xs={3}>
                  <div className="event-action-info-label">Bắt đầu :</div>
                </Grid>
                <Grid item xs={3}>
                  <div className="event-action-info-value">
                    <input type="date" id="event-action-info-value-startDate" name="startDate" />
                  </div>
                </Grid>

                <Grid item xs={3}>
                  <div className="event-action-info-label">Kết thúc :</div>
                </Grid>
                <Grid item xs={3}>
                  <div className="event-action-info-value">
                    <input type="date" id="event-action-info-value-endDate" name="endDate" />
                  </div>
                </Grid>

                <Grid item xs={3}>
                  <div className="event-action-info-label">Ghi chú :</div>
                </Grid>
                <Grid item xs={9}>
                  <div className="event-action-info-value" id="event-action-info-value-note">
                    <textarea id="note"></textarea>
                  </div>
                </Grid>
                <Grid item xs={4}>
                    <button id="event-action-add-new-event" onClick={handleNewEvent}>Thêm mới sự kiện</button>
                  </Grid>
              </Grid>
              <Grid item  width="500px">
                <div id="map-img-div">
                  <input
                    type="file"
                    id="file-upload-img"
                    accept="image/*"
                    onChange={handleUploadImage}
                  />
                  <img id="map-img-preview" height="200px" width="300px"/>
                </div>
              </Grid>
            </Grid>
          </div>
<br/>
          <div id="event-action-add-POC-form-button"><button onClick={handleClickOpen}>Thêm mới POC</button></div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            fullWidth='true'
            maxWidth='sm'
          >
            <DialogTitle id="responsive-dialog-title">
              {"Thêm thông tin POC mới"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
              <Grid container spacing={2} xs={12}>
                  <Grid item xs={4}>
                    <div className="event-action-add-new-POC-label">Tên POC</div>
                  </Grid>
                  <Grid item xs={8}>
                    <div>
                      <input type="text"></input>
                    </div>
                  </Grid>

                  <Grid item xs={4}>
                    <div className="event-action-add-new-POC-label">Ghi chú</div>
                  </Grid>

                  <Grid item xs={8}>
                    <div id="event-action-add-new-POC-value-note">
                      <textarea></textarea>
                    </div>
                  </Grid>


                </Grid>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                Thêm mới
              </Button>
              <Button onClick={handleClose} autoFocus>
                Hủy
              </Button>
            </DialogActions>
          </Dialog>
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
        </Grid>
      </Grid>
    </div>
  );
}
