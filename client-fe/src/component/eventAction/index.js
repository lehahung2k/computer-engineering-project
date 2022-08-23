import * as React from "react";
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
  const [rerender, setRerender] = React.useState(false);
  const [eventInfo, setEventInfo] = React.useState();

  const imgFile = React.useRef("");
  const baseImage = React.useRef("");
  const eventId = React.useRef(0);
  const type = React.useRef();
  let { event_id } = useParams();
  if(event_id) {type.current='UPDATE'; eventId.current=event_id;}
  else type.current='VIEW';

/* Get list event */
  useEffect(() => {
    const responseGetListEvents = eventApi.getAll(
      sessionStorage.getItem("accessToken")
    );
    responseGetListEvents
      .then((listEvents) => {
        console.log(listEvents);
        setListEvents(listEvents.data);
      })
      .catch((error) => console.error(error));
    setAddNewEvent(false);
  }, [addNewEvent]);

/* Get list POC of specific event */
  useEffect(() => {
    console.log(eventId.current);
    const responseGetListPoc = pocApi.findAllBasedEventId(
      { id: eventId.current },
      sessionStorage.getItem("accessToken")
    );
    responseGetListPoc
      .then((listPocs) => {
        console.log(listPocs);
        setListPOCs(listPocs.data);
      })
      .catch((error) => console.log(error));
    setAddNewPOC(false);
  }, [addNewPOC]);

/* Get event info if type.current is UPDATE */
  useEffect(() => {
    if (event_id === undefined) return;

    console.log("Event_id params", event_id);
    const responseGetEventInfo = eventApi.fetchEventInfo(
      { id: event_id },
      sessionStorage.getItem("accessToken")
    );

    responseGetEventInfo
      .then((response) => {
        console.log(response.data);
        setEventInfo(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

/* Handle open add new POC dialog */
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

/* Function convert image to base64 */
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

/* Handle upload image and preview image uploaded */
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

/* Handel event action: Update event if type.current = 'UPDATE' and 
*  add new if type.current = 'VIEW'
 */
  const handleEventAction = () => {
    var eventNameDOM = document.querySelector(
      "#event-action-info-value-event-name"
    );
    var eventCodeDOM = document.querySelector("#event-action-info-value-id");
    var startTimeDOM = document.querySelector(
      "#event-action-info-value-startDate"
    );
    var endTimeDOM = document.querySelector(
      "#event-action-info-value-endDate"
    );
    var eventNoteDOM = document.querySelector("#note");
    var img = baseImage.current;
    var id = (Math.random() + 1).toString(36).slice(2, 6);
    console.log('Type current', type.current);

    const eventName = eventNameDOM.value;
    const defaultEventName = eventNameDOM.defaultValue;

    const eventCode = eventCodeDOM.value;
    const defaultEventCode = eventCodeDOM.defaultValue;

    const startTime = startTimeDOM.value;
    const defaultStartTime = startTimeDOM.defaultValue;

    const endTime = endTimeDOM.value;
    const defaultEndTime = endTimeDOM.defaultValue;

    const eventNote = eventNoteDOM.value;
    const defaultEventNote = eventNoteDOM.defaultValue;
    if (
      (!eventName&&!defaultEventName) ||
      (!eventCode&&!defaultEventCode) ||
      (!startTime&&!defaultStartTime) ||
      (!endTime&&!defaultEndTime) ||
      (!eventNote&&!defaultEventNote) 
    )
    {
     return alert("Hãy điền đầy đủ thông tin sự kiện");}
    eventId.current = eventInfo?eventInfo['event_id']:listEvents.at(-1)['event_id'] + 1;
    const params = {
      // event_id: listEvents.length + 1,
      event_code: !eventCode?defaultEventCode:eventCode,
      event_name: !eventName?defaultEventName:eventName,
      is_active: 1,
      event_description: !eventNote?defaultEventNote:eventNote,
      start_date: !startTime?defaultStartTime:startTime,
      end_date: !endTime?defaultEndTime:endTime,
    };
    console.log('Type current', type.current);
    console.log("Post new event");
    if(type.current==="UPDATE"){
      const response = eventApi.updateEventInfo(
        {id:eventId.current,event:params},
        sessionStorage.getItem("accessToken")
      );
      response
        .then((response) => {
          alert("Cập nhật sự kiện thành công");
          setAddNewEvent(true);
        })
        .catch((err) => console.log(err));

    }
    else{
      const response = eventApi.addNew(
      params,
      sessionStorage.getItem("accessToken")
    );
    response
      .then((response) => {
        alert("Thêm mới sự kiện thành công");
        setAddNewEvent(true);
      })
      .catch((err) => console.log(err));
    }
    
  };

/* Handle create new POC for specific event */
  const handleAddNewPOC = () => {
    var event_id = document.querySelector(
      "#event-action-add-new-POC-event-id-value"
    );
    // var pocId = document.querySelector("#event-action-add-new-POC-id-value");
    var pocName = document.querySelector(
      "#event-action-add-new-POC-name-value"
    );

    eventId.current = event_id.value;
    
      if(!event_id.value||!pocName.value){
        return alert('Hãy điền đầy đủ thông tin')
      }

    var params = {
      // point_id: pocId.value,
      event_id: event_id.value,
      point_name: pocName.value,
    };

    console.log(params);
    console.log(eventId.current);

    const response = pocApi.addNew(
      params,
      sessionStorage.getItem("accessToken")
    );

    response
      .then((response) => {
        alert("Thêm mới điểm checkin thành công");
        setAddNewPOC(true);
      })
      .catch((err) => console.error(err));
  };

const handleRerender = ()=>{
  console.log("Rerender");
  setRerender(!rerender);
}

/* Format date to "YYYY-MM-DD" */
  const startDateFormatted = React.useRef();
  const endDateFormatted = React.useRef();
  if (eventInfo) {
    var tmpStartDate = new Date(eventInfo["start_date"]);
    var tmpEndDate = new Date(eventInfo["end_date"]);

    startDateFormatted.current =
      tmpStartDate.getFullYear().toString() +
      "-" +
      (tmpStartDate.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      tmpStartDate.getDate().toString().padStart(2, "0");
    endDateFormatted.current =
      tmpEndDate.getFullYear().toString() +
      "-" +
      (tmpEndDate.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      tmpEndDate.getDate().toString().padStart(2, "0");
  }

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
                  <button>
                    <a href="/login">Đăng nhập</a>
                  </button>
                  <button>
                    <a href="/register">Đăng ký</a>
                  </button>
                </div>
              </>
            )}
          </div>
          <div id="event-list">
            <h3>Danh sách sự kiện đã có</h3>
            <EventTable listEvents={listEvents} type="CRUD" rerender={handleRerender}></EventTable>
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
                    {!eventInfo ? (
                      <input
                        type="text"
                        id="event-action-info-value-event-name"
                      ></input>
                    ) : (
                      <input
                        type="text"
                        id="event-action-info-value-event-name"
                        defaultValue={eventInfo["event_name"]}
                      ></input>
                    )}
                  </div>
                </Grid>

                <Grid item xs={3}>
                  <div className="event-action-info-label">Mã sự kiện :</div>
                </Grid>
                <Grid item xs={3}>
                  <div className="event-action-info-value">
                    {!eventInfo ? (
                      <input
                        type="text"
                        id="event-action-info-value-id"
                      ></input>
                    ) : (
                      <input
                        type="text"
                        id="event-action-info-value-id"
                        defaultValue={eventInfo["event_code"]}
                      ></input>
                    )}
                  </div>
                </Grid>

                <Grid item xs={3}>
                  <div className="event-action-info-label">Bắt đầu :</div>
                </Grid>
                <Grid item xs={3}>
                  <div className="event-action-info-value">
                    {!eventInfo ? (
                      <input
                        type="date"
                        id="event-action-info-value-startDate"
                        name="startDate"
                      />
                    ) : (
                      <input
                        type="date"
                        id="event-action-info-value-startDate"
                        name="startDate"
                        defaultValue={startDateFormatted.current}
                      />
                    )}
                  </div>
                </Grid>

                <Grid item xs={3}>
                  <div className="event-action-info-label">Kết thúc :</div>
                </Grid>
                <Grid item xs={3}>
                  <div className="event-action-info-value">
                    {!eventInfo ? (
                      <input
                        type="date"
                        id="event-action-info-value-endDate"
                        name="endDate"
                      />
                    ) : (
                      <input
                        type="date"
                        id="event-action-info-value-endDate"
                        name="endDate"
                        defaultValue={endDateFormatted.current}
                      />
                    )}
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
                    {!eventInfo ? (
                      <textarea id="note" />
                    ) : (
                      <textarea
                        id="note"
                        defaultValue={eventInfo["event_description"]}
                      />
                    )}
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    id="event-action-add-new-event"
                    onClick={handleEventAction}
                  >
                    {!event_id ? "Thêm mới sự kiện" : "Sửa thông tin sự kiện"}
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  {event_id ? (
                    <Button component="label">
                      {" "}
                      <a
                        style={{ color: "#1976d2", textDecoration: "none" }}
                        href={"/event-action/"}
                      >
                        Thêm mới sự kiện
                      </a>
                    </Button>
                  ) : (
                    <></>
                  )}
                </Grid>
              </Grid>
              <Grid item width="500px">
                <div id="map-img-div">
                  <Button component="label">
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

                  {/* <Grid item xs={4}>
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
                  </Grid> */}

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
            <PocTable listPocs={listPOCs} rerender={handleRerender}></PocTable>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
