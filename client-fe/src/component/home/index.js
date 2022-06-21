import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import SideBar from "../navigation";

export default function Home() {
  return (
    <div>
      <Grid container spacing={0}>
        <Grid xs="auto">
          <div>
            <SideBar id='1' />
          </div>
        </Grid>
        <Grid xs>
          <div id="header">
            <h3>Trang chủ</h3>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
