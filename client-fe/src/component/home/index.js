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


export default function Home() {
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
          </div>
<div><h3>Danh sách tổng hợp các sự kiện</h3> 

<TableContainer
              component={Paper}
              id="event-list-table"
              style={{ height: 200 }}
            >
              <Table stickyHeader sx={{ minWidth: 650 }}>
                <TableHead id="event-list-TableHead">
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Tên sự kiện</TableCell>
                    <TableCell>Bắt đầu</TableCell>
                    <TableCell>Kết thúc</TableCell>
                    <TableCell>POC</TableCell>
                    <TableCell>Xem chi tiết thống kê</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                </TableBody>
              </Table>
            </TableContainer></div>
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
