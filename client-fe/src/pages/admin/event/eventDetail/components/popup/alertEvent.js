import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import * as React from "react";
import { updatePocAccount } from "../../../../../../services/redux/actions/accounts/updateAccount";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { checkDeleteCondition as checkDeleteEventCondition } from "../../../../../../services/redux/actions/event/deleteEvent";
import { resetState } from "../../../../../../services/redux/actions/poc/poc";
import { useNavigate } from "react-router-dom";

export function AlertDeleteEvent({ open, message, setOpen = (f) => f }) {
  const [confirmQuestion, setConfirmQuestion] = React.useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.eventState.loading);
  const success = useSelector((state) => state.eventState.success);
  const failure = useSelector((state) => state.eventState.failure);
  const enableDelete = useSelector((state) => state.eventState.enableDelete);
  const eventInfo = useSelector((state) => state.eventState.event);

  const handleCloseSuccessAlert = () => {
    setOpen(false);
    setConfirmQuestion(true);
    navigate("/admin/event");
  };

  const handleCloseErrorAlert = () => {
    setOpen(false);
    setConfirmQuestion(true);
  };

  const handleConfirmDeleteEvent = () => {
    dispatch(checkDeleteEventCondition(eventInfo));
    setConfirmQuestion(false);
  };
  return (
    <>
      <Dialog
        open={open && confirmQuestion}
        onClose={() => setConfirmQuestion(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDeleteEvent} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open && !confirmQuestion && loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog
        open={open && !confirmQuestion && failure}
        onClose={() => {}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Xóa sự kiện không thành công
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrorAlert} autoFocus>
            OK{" "}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open && !confirmQuestion && success}
        onClose={() => {
          // dispatch(resetApiState())
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {enableDelete
              ? "Bạn đã xóa thành công gian hàng"
              : "Bạn không thể xóa gian hàng vì còn thông tin check-in chưa được xóa"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccessAlert} autoFocus>
            OK{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
