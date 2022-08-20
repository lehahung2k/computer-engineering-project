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
import eventApi from '../../api/eventAPI.js';

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
  const [listEvents, setListEvents] = React.useState([]);
  const [addNewEvent, setAddNewEvent] = React.useState(false);
  var imgFile = React.useRef('');
  var baseImage = React.useRef('');

  const getListEvents = async ()=>{
    const response = await eventApi.getAll();
    
  }

  useEffect(() => {
    const responseGetListEvents = eventApi.getAll();
    responseGetListEvents.then(listEvents => {console.log(listEvents); setListEvents(listEvents.data)})
    .catch(error=>console.error(error));
  },[addNewEvent]);

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
      imgFile.current = e.target.files[0];
      var src = URL.createObjectURL(imgFile.current);
      baseImage.current = await convertBase64(imgFile.current);
      console.log(baseImage);
      var preview = document.querySelector("#map-img-preview");
      preview.src = src;
      // preview.style.display = "block";
      preview.style.height = "200px";
      preview.style.width = "300px";
      // window.open(src);
    }
  };

  const handleNewEvent = ()=>{
    var eventName = document.querySelector("#event-action-info-value-event-name");
    var eventCode = document.querySelector("#event-action-info-value-id");
    var startTime = document.querySelector("#event-action-info-value-startDate");
    var endTime = document.querySelector("#event-action-info-value-endDate");
    var eventNote = document.querySelector("#note")
    var img = baseImage.current;
    var eventId = (Math.random() + 1).toString(36).slice(2,6);

    const params = {
      event_id: listEvents.length + 1,
      event_code: eventCode.value,
      event_name: eventName.value,
      is_active: 1,
      event_description: eventNote.value,
      start_date: startTime.value,
      end_date: endTime.value,
    };
    
    console.log('Post new event');
  
    const response = eventApi.addNew(params);
    response.then(response => {
      alert("Thêm mới sự kiện thành công");
      setAddNewEvent(true);
    })
    .catch(err => console.log(err))
    
    
    // console.log('hello');
    // console.log(eventName.value);
    // newEvent.append('event-name', eventName.value);
    // let r = (Math.random() + 1).toString(36).slice(2,6);
    // newEvent.append('event-ID', r);
    // newEvent.append('map-img', imgFile)
    // for (let pair of newEvent.entries()) {
    //   console.log(pair[0] + ':' + pair[1]);
    // }
  };
  
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
            <h3>Trang thêm, sửa sự kiện</h3>
          </div>
          <div id="event-list">
            <h3>Danh sách sự kiện đã có</h3>
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
                      key={row['event_id']}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{row['event_code']}</TableCell>
                      <TableCell>
                        {row['event_name']}
                      </TableCell>
                      <TableCell>{row['start_date']}</TableCell>
                      <TableCell>{row['end_date']}</TableCell>
                      <TableCell>10</TableCell>
                      <TableCell>
                        {new Date(row['start_date']) > currentDate ? (
                          <div className="event-action">
                            <div className="event-action-edit"><Link to={'/event-action/'+row.ID}>Sửa</Link></div>
                            <div className="event-action-del">Xóa</div>
                          </div>
                        ) : (
                          <div className="event-action">
                            <div className="event-action-view">
                              <a href={'/view-event/'+row.ID}>Xem</a>
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
                    <input type="text" id="event-action-info-value-id"></input>
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
