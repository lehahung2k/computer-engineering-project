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
import "./index.css";
import eventApi from "../../api/eventAPI.js";
import pocApi from "../../api/PocApi.js";
import PocTable from "../pocTable";
import EventTable from "../eventTable";

const currentDate = new Date();

export default function EventAction() {
  const [open, setOpen] = React.useState(false);
  const [confirmPOCDelete, setConfirmPOCDelete] = React.useState(false);
  const [confirmEventDelete, setConfirmEventDelete] = React.useState(false);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [listEvents, setListEvents] = React.useState([]);
  const [listPOCs, setListPOCs] = React.useState([]);
  const [addNewEvent, setAddNewEvent] = React.useState(false);
  const [addNewPOC, setAddNewPOC] = React.useState(false);

  var imgFile = React.useRef("");
  var baseImage = React.useRef("");
  var eventId = React.useRef(0);

  const getListEvents = async () => {
    const response = await eventApi.getAll(sessionStorage.getItem('accessToken'));
  };

  useEffect(() => {
    const responseGetListEvents = eventApi.getAll(sessionStorage.getItem('accessToken'));
    responseGetListEvents
      .then((listEvents) => {
        console.log(listEvents);
        setListEvents(listEvents.data);
      })
      .catch((error) => console.error(error));
    setAddNewEvent(false);
  }, [addNewEvent]);

  useEffect(() => {
    console.log(eventId.current);
    const responseGetListPoc = pocApi.findAllBasedEventId({ id: eventId.current }, sessionStorage.getItem("accessToken"));
    responseGetListPoc
      .then((listPocs) => {
        console.log(listPocs);
        setListPOCs(listPocs.data);
      })
      .catch((error) => console.log(error));
    setAddNewPOC(false);
  }, [addNewPOC]);

  useEffect(() => {}, [addNewPOC]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirmEventDeletion = () => {
    setConfirmEventDelete(!confirmEventDelete);
  }

  const confirmPOCDeletion = () => {
    setConfirmPOCDelete(!confirmPOCDelete);
  }

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

  const handleNewEvent = () => {
    var eventName = document.querySelector(
      "#event-action-info-value-event-name"
    ).value;
    var eventCode = document.querySelector("#event-action-info-value-id").value;
    var startTime = document.querySelector(
      "#event-action-info-value-startDate"
    ).value;
    var endTime = document.querySelector("#event-action-info-value-endDate").value;
    var eventNote = document.querySelector("#note").value;
    var img = baseImage.current;
    var id = (Math.random() + 1).toString(36).slice(2, 6);

      if (!eventName || !eventCode || !startTime || !endTime || !eventNote || !img)
        return alert("Hãy điền đầy đủ thông tin sự kiện")
    eventId.current = listEvents.length + 1;
    const params = {
      // event_id: listEvents.length + 1,
      event_code: eventCode,
      event_name: eventName,
      is_active: 1,
      event_description: eventNote,
      start_date: startTime,
      end_date: endTime,
    };

    console.log("Post new event");

    const response = eventApi.addNew(params,sessionStorage.getItem('accessToken'));
    response
      .then((response) => {
        alert("Thêm mới sự kiện thành công");
        setAddNewEvent(true);
      })
      .catch((err) => console.log(err));

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

  const handleAddNewPOC = () => {
    var event_id = document.querySelector(
      "#event-action-add-new-POC-event-id-value"
    );
    var pocId = document.querySelector("#event-action-add-new-POC-id-value");
    var pocName = document.querySelector(
      "#event-action-add-new-POC-name-value"
    );

    eventId.current = event_id.value;

    var params = {
      // point_id: pocId.value,
      event_id: event_id.value,
      point_name: pocName.value,
    };

    console.log(params);
    console.log(eventId.current);

    const response = pocApi.addNew(params, sessionStorage.getItem("accessToken"));

    response
      .then((response) => {
        alert("Thêm mới điểm checkin thành công");
        setAddNewPOC(true);
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteEvent = ()=>{
    console.log('Xác nhận xóa sự kiện')
  }

  const handleDeletePOC = ()=>{
    console.log('Xác nhận xóa POC')
  }

  let { event_id } = useParams();
  if (event_id === undefined) event_id = "";
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
            {!sessionStorage.getItem("accessToken") && (
              <>
                <div>
                  <button><a href='/login'>Đăng nhập</a></button>
                  <button><a href="/register">Đăng ký</a></button>
                </div>
              </>
            )}
          </div>
          <div id="event-list">
            <h3>Danh sách sự kiện đã có</h3>
            {/* <TableContainer
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
                            <div className="event-action-del" onClick={confirmEventDeletion}>Xóa</div>
                          </div>
                        ) : (
                          <div className="event-action">
                            <div className="event-action-view">
                              <a href={"/view-event/" + row["event_id"]}>Xem</a>
                            </div>
                            <div className="event-action-del" onClick={confirmEventDeletion}>Xóa</div>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer> */} 
            <EventTable listEvents={listEvents} type='CRUD'></EventTable>
          </div>
          {/* <Dialog
            open={confirmEventDelete}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            fullWidth="true"
            maxWidth="sm"
          >
            <DialogTitle id="responsive-dialog-title">
              {"Xóa thông tin sự kiện"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <p>Bạn có muốn xóa thông tin sự kiện này không?</p>
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
          </Dialog> */}

         
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
                    <input
                      type="text"
                      id="event-action-info-value-event-name"
                    ></input>
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
                    <input
                      type="date"
                      id="event-action-info-value-startDate"
                      name="startDate"
                    />
                  </div>
                </Grid>

                <Grid item xs={3}>
                  <div className="event-action-info-label">Kết thúc :</div>
                </Grid>
                <Grid item xs={3}>
                  <div className="event-action-info-value">
                    <input
                      type="date"
                      id="event-action-info-value-endDate"
                      name="endDate"
                    />
                  </div>
                </Grid>

                <Grid item xs={3}>
                  <div className="event-action-info-label">Ghi chú :</div>
                </Grid>
                <Grid item xs={9}>
                  <div
                    className="event-action-info-value"
                    id="event-action-info-value-note"
                  >
                    <textarea id="note"></textarea>
                  </div>
                </Grid>
                <Grid item xs={4}>

                  <Button
                    id="event-action-add-new-event"
                    onClick={handleNewEvent}
                  >
                    {event_id===""?'Thêm mới sự kiện':'Sửa thông tin sự kiện'}
                  </Button>
                </Grid>
              </Grid>
              <Grid item width="500px">
                <div id="map-img-div">
                  <Button   component="label">
                    Chọn ảnh tải lên
                    <input
                    type="file"
                    id="file-upload-img"
                    accept="image/*"
                    onChange={handleUploadImage}
                    hidden
                  />
                  </Button>
                  <img id="map-img-preview" height="200px" width="300px" />
                </div>
              </Grid>
            </Grid>
          </div>
          <br />
          <div id="event-action-add-POC-form-button">
            <Button onClick={handleClickOpen}>Thêm mới POC</Button>
          </div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            fullWidth="true"
            maxWidth="sm"
          >
            <DialogTitle id="responsive-dialog-title">
              {"Thêm thông tin POC mới"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Grid container spacing={2} xs={12}>
                  <Grid item xs={4}>
                    <div className="event-action-add-new-POC-event-id">
                      ID của sự kiện
                    </div>
                  </Grid>
                  <Grid item xs={8}>
                    <div>
                      <input
                        type="text"
                        id="event-action-add-new-POC-event-id-value"
                        defaultValue={eventId.current}
                      />
                    </div>
                  </Grid>

                  <Grid item xs={4}>
                    <div className="event-action-add-new-POC-label">
                      ID của POC
                    </div>
                  </Grid>
                  <Grid item xs={8}>
                    <div>
                      <input
                        type="text"
                        id="event-action-add-new-POC-id-value"
                      ></input>
                    </div>
                  </Grid>

                  <Grid item xs={4}>
                    <div className="event-action-add-new-POC-label">
                      Tên POC
                    </div>
                  </Grid>

                  <Grid item xs={8}>
                    <div>
                      <input
                        type="text"
                        id="event-action-add-new-POC-name-value"
                      ></input>
                    </div>
                  </Grid>
                </Grid>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleAddNewPOC}>
                Thêm mới
              </Button>
              <Button onClick={handleClose} autoFocus>
                Hủy
              </Button>
            </DialogActions>
          </Dialog>
          <div>
            {/* <TableContainer
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
                  {listPOCs.map((row) => (
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
                        <a href="#">Map</a>
                      </TableCell>
                      <TableCell>
                        <button onClick={confirmPOCDeletion}>Xóa</button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Dialog
            open={confirmPOCDelete}
            onClose={handleClose}
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
          </Dialog> */}

          <PocTable listPocs={listPOCs}></PocTable>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
