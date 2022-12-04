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
import { resetApiState } from "../../../../../services/redux/actions/tenant/tenant";

export default function AlertResponseCreateTenant() {
  const loadingTenant = useSelector((state) => state.tenantState.loading);
  const loadingAccount = useSelector((state) => state.accountState.loading);

  const loading = loadingTenant || loadingAccount;

  const successTenant = useSelector((state) => state.tenantState.success);
  const failureTenant = useSelector((state) => state.tenantState.failure);

  const successAccount = useSelector((state) => state.accountState.success);
  const failureAccount = useSelector((state) => state.accountState.failure);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog
        open={failureTenant}
        onClose={() => dispatch(resetApiState())}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tạo mới tenant không thành công, xin hãy thử lại
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              dispatch(resetApiState());
              navigate("/admin/tenant");
            }}
            autoFocus
          >
            OK{" "}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={successTenant && failureAccount === true}
        onClose={() => dispatch(resetApiState())}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tạo mới tenant thành công nhưng chưa thể tạo tài khoản đăng nhập,
            xin hãy thêm tài khoản đăng nhập sau.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              dispatch(resetApiState());
              navigate("/admin/tenant");
            }}
            autoFocus
          >
            OK{" "}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={successTenant && successAccount === true}
        onClose={() => dispatch(resetApiState())}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tạo mới tenant thành công.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              dispatch(resetApiState());
              navigate("/admin/tenant/detail");
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
