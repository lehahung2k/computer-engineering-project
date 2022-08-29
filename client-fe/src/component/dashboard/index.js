import React, { useState } from "react";
import "./index.css";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import Grid from "@mui/material/Grid";

var fake_data = [
  {
    id: 1,
    noEvent: 10,
    month: "Tháng 1",
  },

  {
    id: 2,
    noEvent: 5,
    month: "Tháng 2",
  },

  {
    id: 3,
    noEvent: 7,
    month: "Tháng 3",
  },

  {
    id: 4,
    noEvent: 9,
    month: "Tháng 4",
  },

  {
    id: 5,
    noEvent: 12,
    month: "Tháng 5",
  },

  {
    id: 6,
    noEvent: 14,
    month: "Tháng 6",
  },

  {
    id: 7,
    noEvent: 7,
    month: "Tháng 7",
  },
];

export default function DashBoard() {
  const [fakeData, setFakeData] = useState({
    labels: fake_data.map((data) => data.month),
    datasets: [
      {
        label: "Thống kê số sự kiện trong năm",
        data: fake_data.map((data) => data.noEvent),
        backgroundColor: ["rgba(75,192,192,1)"],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div id="dashboard-overview-bar-chart">
            <Bar data={fakeData}></Bar>
          </div>
        </Grid>

        <Grid item xs={6}>
          <div id="dashboard-overview-info">
            <div className="dashboard-overview-card">
              <h1>100</h1><p>Sự kiện được tổ chức</p>
            </div>
            <div className="dashboard-overview-card">
              <h1>1000</h1><p>POC đăng ký tham gia</p>
            </div>
            <div className="dashboard-overview-card">
              <h1>10000</h1><p>Người tham dự</p>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
