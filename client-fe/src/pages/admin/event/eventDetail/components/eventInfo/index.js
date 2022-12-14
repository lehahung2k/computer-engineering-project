import Button from "@mui/material/Button";
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

export default function EventInfo({ setActiveStep = (f) => f, event }) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const listEvents = useSelector((state) => state.eventState.listEvents);
  const pinnedEventId = useSelector((state) => state.eventState.pinnedEventId);

  React.useEffect(() => {
    if (pinnedEventId) {
      const eventInfo = listEvents.find(
        (event) => event.eventId === pinnedEventId
      );
      console.log(eventInfo);
      dispatch(newEventAction(eventInfo));
    }
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleShowListPoc = () => {
    setActiveStep(1);
  };

  const handleShowListCompany = () => {
    setActiveStep(2);
  };

  const handleEditEvent = () => {
    sessionStorage.getItem("role") === "admin"
      ? navigate("/admin/event/edit")
      : navigate("/event-admin/event/edit");
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

        <Grid item xs={6} align="right">
          <Button variant="contained" onClick={() => handleEditEvent()}>
            Sửa sự kiện
          </Button>
        </Grid>
        <Grid item xs={6} align="left">
          <Button variant="outlined" onClick={handleClickOpen} color="error">
            Xóa sự kiện
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Xác nhận xóa sự kiện"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có thực sự muốn xóa sự kiện này ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Xác nhận
          </Button>
          <Button onClick={handleClose} autoFocus>
            Hủy bỏ
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
