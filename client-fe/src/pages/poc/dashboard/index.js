import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { ListEvent, ListEventHeadNormal } from "../../../assets/fakeData";
import { FakeChart } from "../../../assets/fakeData/fakeChart";
import Header from "../../../components/header";
import SideBar from "../../../components/navigation";
import NormalTable from "../../../components/tables/normal";
import StatisticCard from "./components/statisticCard";
import style from "./style.module.css";
import PocInfo from "./components/accountInfo";
export default function PocDashBoard() {
  const [openSidebar, setOpenSidebar] = React.useState(true);

  const [fakeData, setFakeData] = useState({
    labels: FakeChart.map((data) => data.month),
    datasets: [
      {
        label: "Số sự kiện diễn ra",
        data: FakeChart.map((data) => data.noEvent),
        backgroundColor: ["rgba(75,192,192,1)"],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });
  const navigate = useNavigate();

  const handleClickAddNewEvent = () => {
    navigate("/admin/create-event");
  };

  return (
    <div className={style.wrapper}>
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
            <Grid container spacing="0" id="container">
              <Grid container spacing={2}>
                <Grid
                  container
                  xs={12}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item xs>
                    <div className={style.statistic}>
                      <div className={style.statistic__card}>
                        <StatisticCard
                          title="Sự kiện đã được tổ chức"
                          total={100}
                          icon={"akar-icons:check-in"}
                          color="warning"
                        />
                      </div>

                      <div className={style.statistic__card}>
                        <StatisticCard
                          title="Khách check-in"
                          total={100}
                          icon={"fluent:guest-28-regular"}
                          color="info"
                        />
                      </div>

                      <div className={style.statistic__card}>
                        <StatisticCard
                          title="Sự kiện sắp diễn ra"
                          total={100}
                          icon={"fluent:guest-28-regular"}
                          color="info"
                        />
                      </div>
                    </div>
                  </Grid>
                </Grid>
                <Grid item xs={7}>
                  <div className={style.barchart}>
                    <Bar data={fakeData}></Bar>
                    <h4>Thống kê số sự kiện theo tháng</h4>
                  </div>
                </Grid>

                <Grid item xs={5}>
                  <div className={style.poc_info}>
                    <PocInfo />
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
