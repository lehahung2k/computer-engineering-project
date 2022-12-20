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
import { checkDeleteCondition } from "../../../../../../services/redux/actions/poc/deletePoc";
import { resetState } from "../../../../../../services/redux/actions/poc/poc";

export function AlertDeletePoc({ open, message, setOpen = (f) => f }) {
  const [confirmQuestion, setConfirmQuestion] = React.useState(true);

  const dispatch = useDispatch();

  const loading = useSelector((state) => state.pocState.loading);
  const success = useSelector((state) => state.pocState.success);
  const failure = useSelector((state) => state.pocState.failure);
  const enableDelete = useSelector((state) => state.pocState.enableDelete);
  const pocInfo = useSelector((state) => state.pocState.poc);

  const handleConfirmDeletePoc = () => {
    // Kiểm tra điều kiện xóa và gửi api xóa lên server
    console.log("Delete list poc", [pocInfo]);
    dispatch(checkDeleteCondition([pocInfo]));
    setConfirmQuestion(false);
  };

  return (
    <>
      <Dialog
        open={open && confirmQuestion}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDeletePoc} autoFocus>
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
            Thay đổi trạng thái xác minh của tài khoản không thành công
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              //   dispatch(resetApiState());
              setOpen(false);
              setConfirmQuestion(true);
            }}
            autoFocus
          >
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
          <Button
            onClick={() => {
              //   dispatch(resetApiState());
              setOpen(false);
              setConfirmQuestion(true);
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
