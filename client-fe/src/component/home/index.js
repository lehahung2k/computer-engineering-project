import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import SideBar from "../navigation";
import DashBoard from "../dashboard";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import './index.css';
import EventTable from "../eventTable";
import { useEffect } from "react";
import eventApi from "../../api/eventAPI.js";


export default function Home() {
  const [listEvents, setListEvents] = React.useState([]);

  useEffect(() => {
    const responseGetListEvents = eventApi.getAll(sessionStorage.getItem('accessToken'));
    responseGetListEvents
      .then((listEvents) => {
        console.log(listEvents);
        setListEvents(listEvents.data);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div>
      <Grid container spacing={0}>
        <Grid xs="auto">
          <div>
            <SideBar id="admin" />
          </div>
        </Grid>
        <Grid xs>
          <div id="header">
            <h3>Trang chủ</h3>
            {!sessionStorage.getItem("accessToken") && (
              <>
                <div>
                  <button><a href='/login'>Đăng nhập</a></button>
                  <button><a href="/register">Đăng ký</a></button>
                </div>
              </>
            )}
          </div>
<div><h3>Danh sách tổng hợp các sự kiện</h3> 
<EventTable listEvents={listEvents} type='View'></EventTable>
</div>
<Divider />
          <div>
  <h3>Số liệu thống kê các sự kiện</h3>
  <br />
            <DashBoard></DashBoard>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
