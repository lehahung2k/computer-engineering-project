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
import { resetApiState as tenantResetApiState } from "../../../../../../services/redux/actions/tenant/tenant";
import { resetApiState as eventResetApiState } from "../../../../../../services/redux/actions/event/event";

export default function AlertResponse() {
  const loadingTenant = useSelector((state) => state.tenantState.loading);
  const loadingEvent = useSelector((state) => state.eventState.loading);

  const loading = loadingTenant || loadingEvent;

  const successTenant = useSelector((state) => state.tenantState.success);
  const failureTenant = useSelector((state) => state.tenantState.failure);

  const successEvent = useSelector((state) => state.eventState.success);
  const failureEvent = useSelector((state) => state.eventState.failure);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (successTenant && successEvent) {
      dispatch(tenantResetApiState());
      dispatch(eventResetApiState());
    }
  }, [successTenant, successEvent]);

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog
        open={failureTenant && failureEvent}
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

      <Dialog
        open={failureTenant && successEvent}
        onClose={() => {
          dispatch(tenantResetApiState());
          dispatch(eventResetApiState());
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Không thể tải ban tổ chức
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
