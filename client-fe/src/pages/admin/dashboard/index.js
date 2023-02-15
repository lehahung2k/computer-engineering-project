import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import Header from "../../../components/header";
import SideBar from "../../../components/navigation";
import StatisticCard from "../dashboard/statisticCard";
import style from "./style.module.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS } from "chart.js/auto";
import FestivalIcon from "@mui/icons-material/Festival";
import BusinessIcon from "@mui/icons-material/Business";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleIcon from "@mui/icons-material/People";
import { headCellsListFakeEvents } from "../../../assets/fakeData/fakeEvent";
import NormalTable from "../../../components/tables/normal";
import { FakeChart } from "../../../assets/fakeData/fakeChart";
import { useDispatch, useSelector } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import BarChartYearFilter from "./components/filterBarChartYear";
import {
  getNumberOfEvent,
  getNumberOfGuestAll,
} from "../../../services/redux/actions/event/statisticEvent";
import { getNumberOfTenant } from "../../../services/redux/actions/tenant/statisticTenant";
import { getNumberOfPocAccount } from "../../../services/redux/actions/accounts/statisticAccount";
import { fetchListEvent } from "../../../services/redux/actions/event/fetchListEvent";
import { getNumberOfPoc } from "../../../services/redux/actions/poc/statisticPoc";
import moment from "moment";
import {
  pinEventId,
  newEventAction,
  resetApiState as resetEventApiState,
} from "../../../services/redux/actions/event/event";

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

export default function AdminDashBoard() {
  const [openSidebar, setOpenSidebar] = React.useState(true);

  // statistic state selector
  const statisticEvent = useSelector((state) => state.eventState.statistic);
  const statisticTenant = useSelector((state) => state.tenantState.statistic);
  const statisticAccount = useSelector((state) => state.accountState.statistic);
  const statisticPoc = useSelector((state) => state.pocState.statistic);
  const listEvent = useSelector((state) => state.eventState.listEvents);
  const [barChartYear, setBarChartYear] = React.useState(2023);

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

  const customListEvents = listEvent.map((event) => {
    let startTime = moment(event.startTime).format("YYYY-MM-DD HH:mm:ss");
    let endTime = moment(event.endTime).format("YYYY-MM-DD HH:mm:ss");
    return {
      ...event,
      startTime: startTime,
      endTime: endTime,
    };
  });

  console.log("filter event chart: ", listEventForChart);

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

  const handleChange = (event) => {
    setBarChartYear(event.target.value);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickAddNewEvent = () => {
    navigate("/admin/create-event");
  };

  React.useEffect(() => {
    dispatch(getNumberOfEvent());
    dispatch(getNumberOfGuestAll());

    dispatch(getNumberOfPocAccount());
    dispatch(fetchListEvent());
    sessionStorage.getItem("role") === "tenant"
      ? dispatch(getNumberOfPoc())
      : dispatch(getNumberOfTenant());
  }, []);

  const handleClickButtonField = (fieldName, row) => {
    if (fieldName === "eventName") {
      dispatch(pinEventId(row["eventId"]));
      const eventInfo = listEvent.find(
        (event) => event.eventId === row["eventId"]
      );
      console.log(eventInfo);
      dispatch(newEventAction(eventInfo));
      dispatch(resetEventApiState());
      sessionStorage.getItem("role") === "admin"
        ? navigate("/admin/event/detail")
        : navigate("/event-admin/event/detail");
    }
    if (fieldName === "checkin") console.log("checkin");
  };

  return (
    <>
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
                    <h4>Thống kê số sự kiện theo tháng năm {barChartYear}</h4>
                  </div>
                </Grid>

                <Grid
                  container
                  xs={5}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item xs>
                    <div className={style.statistic}>
                      <div className={style.statistic__card}>
                        <StatisticCard
                          title="Sự kiện đã được tổ chức"
                          total={statisticEvent.numberOfEvent}
                          icon={"akar-icons:check-in"}
                          color="warning"
                        />
                      </div>
                      {sessionStorage.getItem("role") === "tenant" ? (
                        <div className={style.statistic__card}>
                          <StatisticCard
                            title="Gian hàng đã đặt"
                            total={statisticPoc.numberOfPoc}
                            icon={"ion:business-sharp"}
                            color="secondary"
                          />
                        </div>
                      ) : (
                        <div className={style.statistic__card}>
                          <StatisticCard
                            title="Doanh nghiệp tham gia"
                            total={statisticTenant.numberOfTenant}
                            icon={"ion:business-sharp"}
                            color="secondary"
                          />
                        </div>
                      )}
                      <div className={style.statistic__card}>
                        <StatisticCard
                          title="Khách check-in"
                          total={statisticEvent.numberOfGuestAll}
                          icon={"fluent:guest-28-regular"}
                          color="info"
                        />
                      </div>
                      <div className={style.statistic__card}>
                        <StatisticCard
                          title="Cộng tác viên"
                          total={statisticAccount.numberOfPocAccount}
                          icon={
                            "material-symbols:supervisor-account-outline-sharp"
                          }
                          color="success"
                        />
                      </div>
                    </div>
                  </Grid>
                </Grid>

                <Grid item xs>
                  <div className={style.list__event}>
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <Typography variant="h6" align="left">
                          Danh sách sự kiện
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Box display="flex" justifyContent="flex-end">
                          <Button
                            variant="contained"
                            sx={{ textTransform: "none" }}
                            onClick={() => handleClickAddNewEvent()}
                          >
                            Thêm mới
                          </Button>
                        </Box>
                      </Grid>

                      <Grid item xs={12}>
                        <NormalTable
                          rows={customListEvents}
                          headCells={headCellsListFakeEvents}
                          numOfRowsPerPage={3}
                          handleClickButtonField={handleClickButtonField}
                        />
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
