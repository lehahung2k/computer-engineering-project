import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
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
import { getNumberOfGuestPoc } from "../../../services/redux/actions/event/statisticEvent";
import { fetchListEvent } from "../../../services/redux/actions/event/fetchListEvent";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import BarChartYearFilter from "./components/filterBarChartYear";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);
const filterNumberOfEventEachMonth = (year, listEvent) => {
  const filterYear = listEvent.filter(
    (event) => moment(event.startTime).year() === year
  );
  const filterMonth = [];
  for (let i = 0; i < 12; i++) {
    let tmpFilter = filterYear.filter(
      (event) => moment(event.startTime).month() === i
    );
    let currentMonth = i + 1;
    let tmpInfo = {
      id: i,
      noEvent: tmpFilter.length,
      month: "Tháng " + currentMonth,
    };
    filterMonth.push(tmpInfo);
  }
  return filterMonth;
};

export default function PocDashBoard() {
  const [openSidebar, setOpenSidebar] = React.useState(true);
  const [barChartYear, setBarChartYear] = React.useState(2023);
  const numberOfGuest = useSelector(
    (state) => state.eventState.statistic.numberOfGuest
  );
  const listEvent = useSelector((state) => state.eventState.listEvents);

  const listEventForChart = filterNumberOfEventEachMonth(
    barChartYear,
    listEvent
  );
  const chartData = {
    labels: listEventForChart.map((event) => event.month),
    datasets: [
      {
        label: "Số sự kiện diễn ra",
        data: listEventForChart.map((data) => data.noEvent),
        backgroundColor: ["rgba(75,192,192,1)"],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };
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

  const upcomingEvent = listEvent.filter((event) =>
    moment().isBefore(moment(event.startTime))
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickAddNewEvent = () => {
    navigate("/admin/create-event");
  };

  useEffect(() => {
    dispatch(getNumberOfGuestPoc());
    dispatch(fetchListEvent());
  }, []);

  console.log("Number of guest: ", numberOfGuest);
  console.log("List event: ", listEvent);

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
                          total={listEvent.length - upcomingEvent.length}
                          icon={"akar-icons:check-in"}
                          color="warning"
                        />
                      </div>

                      <div className={style.statistic__card}>
                        <StatisticCard
                          title="Khách check-in"
                          total={numberOfGuest}
                          icon={"fluent:guest-28-regular"}
                          color="info"
                        />
                      </div>

                      <div className={style.statistic__card}>
                        <StatisticCard
                          title="Sự kiện sắp diễn ra"
                          total={upcomingEvent.length}
                          icon={"fluent:guest-28-regular"}
                          color="info"
                        />
                      </div>
                    </div>
                  </Grid>
                </Grid>
                <Grid item xs={7}>
                  <div className={style.barchart}>
                    <BarChartYearFilter setBarChartYear={setBarChartYear} />

                    <Bar
                      data={chartData}
                      options={{
                        scales: {
                          yAxes: {
                            ticks: { stepSize: 1 },
                          },
                        },
                      }}
                    ></Bar>
                    <h4>Thống kê số sự kiện theo tháng {barChartYear}</h4>
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
