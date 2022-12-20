import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  pinEventId,
  newEventAction,
} from "../../../../../../services/redux/actions/event/event";
import dayjs from "dayjs";
import { fetchListPocByEventCode } from "../../../../../../services/redux/actions/poc/fetchListPoc";
import { AlertDeleteEvent } from "../popup/alertEvent";

export default function EventInfo({ setActiveStep = (f) => f, event }) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const listEvents = useSelector((state) => state.eventState.listEvents);
  const pinnedEventId = useSelector((state) => state.eventState.pinnedEventId);
  const eventInfo = useSelector((state) => state.eventState.event);

  const enableEdit = dayjs(eventInfo.startTime) <= dayjs();
  console.log(enableEdit, dayjs(eventInfo.startTime), dayjs());

  const handleShowListPoc = () => {
    setActiveStep(1);
  };

  const handleShowListCompany = () => {
    setActiveStep(2);
  };

  const handleEditEvent = () => {
    dispatch(fetchListPocByEventCode(eventInfo.eventCode));

    sessionStorage.getItem("role") === "admin"
      ? navigate("/admin/event/edit")
      : navigate("/event-admin/event/edit");
  };

  const handleDeleteEvent = () => {
    setMessage("Bạn có muốn xóa sự kiện không ?");
    setOpenDialog(true);
  };
  return (
    <div>
      <Typography variant="h6" align="left" sx={{ marginBottom: "10px" }}>
        Chi tiết sự kiện
      </Typography>

      <Grid container spacing="20">
        <Grid item xs={2} align="right">
          <Typography variant="body1" align="right">
            Tên sự kiện:&nbsp;
          </Typography>
        </Grid>

        <Grid item xs={4} align="left">
          {event.eventName}
        </Grid>

        <Grid item xs={2} align="right">
          <Typography variant="body1" align="right">
            Mã sự kiện:&nbsp;
          </Typography>
        </Grid>

        <Grid item xs={4} align="left">
          {event.eventCode}
        </Grid>

        <Grid item xs={2} align="right">
          <Typography variant="body1" align="right">
            Thời gian bắt đầu:&nbsp;
          </Typography>
        </Grid>

        <Grid item xs={4} align="left">
          {event.startTime}
        </Grid>

        <Grid item xs={2} align="right">
          <Typography variant="body1" align="right">
            Thời gian kết thúc:&nbsp;
          </Typography>
        </Grid>

        <Grid item xs={4} align="left">
          {event.endTime}{" "}
        </Grid>

        <Grid item xs={2} align="right">
          <Typography variant="body1" align="right">
            Ghi chú:&nbsp;
          </Typography>
        </Grid>

        <Grid item xs={8} align="left">
          {event.eventDescription}
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={2}>
          <Typography variant="body1" align="right">
            Sơ đồ sự kiện:&nbsp;
          </Typography>
        </Grid>

        <Grid item xs={10}>
          <div className={style.map}>
            {event.eventImg === "" ? (
              <></>
            ) : (
              <img
                className={style.map__image}
                alt="Map preview"
                src={event.eventImg}
              />
            )}
          </div>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="body1" align="right">
            Tham gia:&nbsp;
          </Typography>
        </Grid>

        <Grid item xs={10} align="left">
          {/* <Button variant="outlined" onClick={() => handleShowListCompany()}>
            Danh sách doanh nghiệp
          </Button> */}
          &nbsp;
          <Button variant="outlined" onClick={() => handleShowListPoc()}>
            Danh sách POC
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1" align="right">
            Thống kê:&nbsp;
          </Typography>
        </Grid>

        <Grid item xs={10} align="left">
          <ul style={{ paddingTop: 0, marginTop: 0 }}>
            <li>100 Doanh nghiệp tham gia</li>
            <li>120 Quầy POC</li>
            <li>2000 Khách tham dự</li>
          </ul>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: enableEdit ? "block" : "none" }}>
            <Grid container spacing={3}>
              <Grid item xs={6} align="right">
                <Button variant="contained" onClick={() => handleEditEvent()}>
                  Sửa sự kiện
                </Button>
              </Grid>
              <Grid item xs={6} align="left">
                <Button
                  variant="outlined"
                  onClick={handleDeleteEvent}
                  color="error"
                >
                  Xóa sự kiện
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <AlertDeleteEvent
        open={openDialog}
        setOpen={setOpenDialog}
        message={message}
        key={openDialog}
      />
    </div>
  );
}
