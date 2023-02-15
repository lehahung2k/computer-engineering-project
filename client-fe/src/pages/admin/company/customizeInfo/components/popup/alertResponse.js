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
import { checkDeleteCondition as checkDeleteTenantCondition } from "../../../../../../services/redux/actions/tenant/deleteTenant";
import { resetState } from "../../../../../../services/redux/actions/poc/poc";
import { useNavigate } from "react-router-dom";

export function AlertEditTenant({ open, message, setOpen = (f) => f }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.tenantState.loading);
  const success = useSelector((state) => state.tenantState.success);
  const failure = useSelector((state) => state.tenantState.failure);
  const tenantInfo = useSelector((state) => state.tenantState.tenant);

  const handleCloseSuccessAlert = () => {
    setOpen(false);
    if (sessionStorage.getItem("role") === "admin") {
      navigate("/admin/tenant/detail");
    }
  };

  const handleCloseErrorAlert = () => {
    setOpen(false);
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open && loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog
        open={open && failure}
        onClose={() => {}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Cập nhật thông tin ban tổ chức không thành công
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrorAlert} autoFocus>
            OK{" "}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open && success}
        onClose={() => {
          // dispatch(resetApiState())
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn đã cập nhật thành công thông tin ban tổ chức
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
