import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { useDispatch, useSelector } from "react-redux";
import {
  resetApiState as eventResetApiState,
  resetState as eventResetState,
} from "../../../../../../services/redux/actions/event/event";
import { useNavigate } from "react-router-dom";

export function AlertResultUpdateEvent() {
  const loadingCreateEvent = useSelector((state) => state.eventState.loading);
  const loadingCreateListPoc = useSelector((state) => state.pocState.loading);

  const loading = loadingCreateEvent || loadingCreateListPoc;

  const successEvent = useSelector((state) => state.eventState.success);
  const successPoc = useSelector((state) => state.pocState.success);

  const failureEvent = useSelector((state) => state.eventState.failure);
  const failurePoc = useSelector((state) => state.pocState.failure);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog
        open={failureEvent}
        onClose={() => dispatch(eventResetApiState())}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Không thể cập nhật sự kiện, xin hãy thử lại
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              dispatch(eventResetApiState());
              // navigate("/admin/event");
            }}
            autoFocus
          >
            OK{" "}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={successEvent && failurePoc === true}
        onClose={() => dispatch(eventResetApiState())}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Cập nhật sự kiện thành công nhưng chưa thể cập nhật danh sách Poc,
            xin hãy cập nhật danh sách Poc sau.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              dispatch(eventResetApiState());
              navigate("/admin/event");
            }}
            autoFocus
          >
            OK{" "}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={successEvent && successPoc === true}
        onClose={() => dispatch(eventResetApiState())}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Cập nhật sự kiện thành công.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              dispatch(eventResetApiState());
              navigate("/admin/event/detail");
            }}
            autoFocus
          >
            OK{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
