import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";

export default function PocInfo() {

  
  return (
    <>
      <Grid container>
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
          Test
        </Grid>

        <Grid item xs={4} align="right">
          <Typography variant="body" align="left">
            Họ và tên:&nbsp;
          </Typography>
        </Grid>
        <Grid item xs={8} align="left"></Grid>

        <Grid item xs={4} align="right">
          <Typography variant="body" align="left">
            Số điện thoại:&nbsp;
          </Typography>
        </Grid>
        <Grid item xs={8} align="left"></Grid>

        <Grid item xs={4} align="right">
          <Typography variant="body" align="left">
            Email:&nbsp;
          </Typography>
        </Grid>
        <Grid item xs={8} align="left"></Grid>
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
        <Grid item xs={8} align="left"></Grid>

        <Grid item xs={4} align="right">
          <Typography variant="body" align="left">
            Mã ban tổ chức:&nbsp;
          </Typography>
        </Grid>
        <Grid item xs={8} align="left"></Grid>

        <Grid item xs={4} align="right">
          <Typography variant="body" align="left">
            Liên hệ:&nbsp;
          </Typography>
        </Grid>
        <Grid item xs={8} align="left"></Grid>
      </Grid>
    </>
  );
}
