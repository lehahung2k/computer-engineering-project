import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  listCompany,
  listCompanyHeadNormal,
} from "../../../../assets/fakeData";
import {
  ListBtc,
  listBtcHeadNormal,
} from "../../../../assets/fakeData/fakeBtc";
import BreadCrumbs from "../../../../components/breadCrumbs";
import Header from "../../../../components/header";
import SideBar from "../../../../components/navigation";
import NormalTable from "../../../../components/tables/normal";
import style from "./style.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  pinTenantId,
  newTenantAction,
  resetApiState,
} from "../../../../services/redux/actions/tenant/tenant";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchListTenant } from "../../../../services/redux/actions/tenant/fetchListTenant";

const breadcrumbs = [
  { link: "/admin", label: "Trang chủ" },
  { link: "#", label: "Ban tổ chức" },
];

export default function ListCompany() {
  const [openSidebar, setOpenSidebar] = React.useState(true);
  const listTenant = useSelector((state) => state.tenantState.listTenant);
  const listCustomizedTenant = listTenant.map((tenant) => ({
    ...tenant,
    contact:
      tenant.contactName +
      " - " +
      tenant.contactPhone +
      " - " +
      tenant.contactEmail,
  }));
  const loading = useSelector((state) => state.tenantState.loading);
  const success = useSelector((state) => state.tenantState.success);
  const failure = useSelector((state) => state.tenantState.failure);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchListTenant());
  }, []);

  const handleClickAddNewCompany = () => {
    dispatch(resetApiState());
    navigate("/admin/tenant/create");
  };

  const handleClickButtonField = (field, row) => {
    if (field === "tenantName") {
      dispatch(pinTenantId(row.tenantId));
      const pinnedTenantInfo = listTenant.find(
        (tenant) => tenant.tenantId === row.tenantId
      );
      dispatch(newTenantAction(pinnedTenantInfo));
      navigate("/admin/tenant/detail");
    }
  };

  const handleClose = () => {
    navigate("/admin");
    dispatch(resetApiState);
  };
  return (
    <div className={style.body}>
      <Grid container spacing={0}>
        {openSidebar ? (
          <Grid xs="auto">
            <div>
              <SideBar id="1" />
            </div>
          </Grid>
        ) : (
          <></>
        )}
        <Grid xs>
          <Header
            openSidebar={openSidebar}
            handleOpenSidebar={setOpenSidebar}
          />
          <BreadCrumbs breadcrumbs={breadcrumbs} />
          <Grid container spacing={0}>
            <div className={style.main}>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Typography variant="h6" align="left">
                    Danh sách ban tổ chức
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Box display="flex" justifyContent="flex-end">
                    <Button
                      variant="contained"
                      sx={{ textTransform: "none" }}
                      onClick={() => handleClickAddNewCompany()}
                    >
                      Thêm mới
                    </Button>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <NormalTable
                    rows={listCustomizedTenant}
                    headCells={listBtcHeadNormal}
                    handleClickButtonField={handleClickButtonField}
                  />
                </Grid>
              </Grid>{" "}
            </div>
          </Grid>
        </Grid>
      </Grid>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog
        open={failure}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tải danh sách không thành công, xin hãy thử lại
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
