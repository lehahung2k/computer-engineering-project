import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetApiState as tenantResetApiState } from "../../../../../services/redux/actions/tenant/tenant";
import { resetApiState as eventResetApiState } from "../../../../../services/redux/actions/event/event";
import { fetchPocInfo } from "../../../../../services/redux/actions/poc/fetchListPoc";
import { newEventAction } from "../../../../../services/redux/actions/event/event";

export default function AlertResponse() {
  const loadingEvent = useSelector((state) => state.eventState.loading);

  const loading = loadingEvent;

  const successEvent = useSelector((state) => state.eventState.success);
  const failureEvent = useSelector((state) => state.eventState.failure);
  const listEvent = useSelector((state) => state.eventState.listEvents);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (successEvent) {
      if (listEvent.length === 0) {
        alert("Không có sự kiện nào đang diễn ra");
        navigate("/poc/event");
      } else {
        console.log("Fetch poc info");
        const compareTime = (startTime, endTime) => {
          const currentTime = new Date();
          if (
            Date.parse(startTime) <= Date.parse(currentTime) &&
            Date.parse(endTime) >= Date.parse(currentTime)
          ) {
            return true;
          }
          return false;
        };
        const currentEvent = listEvent.find((event) =>
          compareTime(event.startTime, event.endTime)
        );
        if (currentEvent) {
          dispatch(newEventAction(currentEvent));
          dispatch(fetchPocInfo(currentEvent.eventCode));
        } else {
          alert("Không có sự kiện nào đang diễn ra");
          navigate("/poc/event");
        }
      }
    } else if (failureEvent) {
      alert("Không thể tải thông tin sự kiện");
      navigate("/poc/event");
    }
  }, [successEvent]);

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog
        open={failureEvent}
        onClose={() => {
          dispatch(tenantResetApiState());
          dispatch(eventResetApiState());
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Không thể tải danh sách sự kiện
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              dispatch(tenantResetApiState());
              dispatch(eventResetApiState());
            }}
            autoFocus
          >
            OK{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
