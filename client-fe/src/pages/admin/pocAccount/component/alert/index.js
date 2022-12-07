import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import * as React from "react";
import { updatePocAccount } from "../../../../../services/redux/actions/accounts/updateAccount";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { resetApiState } from "../../../../../services/redux/actions/accounts/account";

export default function AlertPocAccount({
  open,
  message,
  setOpen = (f) => f,
  usernameSelected,
  selected,
}) {
  console.log("usernameSelected", usernameSelected);
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.accountState.loading);
  const success = useSelector((state) => state.accountState.success);
  const failure = useSelector((state) => state.accountState.failure);

  return (
    <>
      <Dialog
        open={open}
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
          <Button
            onClick={() => {
              setOpen(false);
              dispatch(updatePocAccount(usernameSelected));
            }}
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={selected && loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog
        open={selected && failure}
        onClose={() => {}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Kích hoạt tài khoản không thành công
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              dispatch(resetApiState());
            }}
            autoFocus
          >
            OK{" "}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={selected && success}
        onClose={() => dispatch(resetApiState())}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Kích hoạt tài khoản thành công
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              dispatch(resetApiState());
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
