import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPocAccountInfo } from "../../../../../services/redux/actions/accounts/fetchListAccount";
export default function PocInfo() {
  const accountInfo = useSelector((state) => state.accountState.account);
  const tenantInfo = useSelector((state) => state.tenantState.tenant);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchPocAccountInfo());
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" align="left">
            Thông tin tài khoản
          </Typography>
        </Grid>
        <Grid item xs={4} align="right">
          <Typography variant="body" align="left">
            Tài khoản:&nbsp;
          </Typography>
        </Grid>
        <Grid item xs={8} align="left">
          {accountInfo.username}
        </Grid>

        <Grid item xs={4} align="right">
          <Typography variant="body" align="left">
            Họ và tên:&nbsp;
          </Typography>
        </Grid>
        <Grid item xs={8} align="left">
          {accountInfo.fullName}
        </Grid>

        <Grid item xs={4} align="right">
          <Typography variant="body" align="left">
            Số điện thoại:&nbsp;
          </Typography>
        </Grid>
        <Grid item xs={8} align="left">
          {accountInfo.phoneNumber}
        </Grid>

        <Grid item xs={4} align="right">
          <Typography variant="body" align="left">
            Email:&nbsp;
          </Typography>
        </Grid>
        <Grid item xs={8} align="left">
          {accountInfo.email ? accountInfo.email : "Không có email"}
        </Grid>
        <br />
        <br />
        <Grid item xs={12}>
          <Typography variant="h6" align="left">
            Thông tin ban tổ chức
          </Typography>
        </Grid>

        <Grid item xs={4} align="right">
          <Typography variant="body" align="left">
            Ban tổ chức:&nbsp;
          </Typography>
        </Grid>
        <Grid item xs={8} align="left">
          {tenantInfo.tenantName}
        </Grid>

        <Grid item xs={4} align="right">
          <Typography variant="body" align="left">
            Mã ban tổ chức:&nbsp;
          </Typography>
        </Grid>
        <Grid item xs={8} align="left">
          {accountInfo.tenantCode}
        </Grid>

        <Grid item xs={4} align="right">
          <Typography variant="body" align="left">
            Liên hệ:&nbsp;
          </Typography>
        </Grid>
        <Grid item xs={8} align="left">
          {tenantInfo.contactName +
            " - " +
            tenantInfo.contactPhone +
            " - " +
            tenantInfo.contactEmail}
        </Grid>
      </Grid>
    </>
  );
}
