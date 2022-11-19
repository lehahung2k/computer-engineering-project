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
import { ListEvent, ListEventHeadNormal } from "../../../assets/fakeData";
import NormalTable from "../../../components/tables/normal";
import { FakeChart } from "../../../assets/fakeData/fakeChart";

export default function AdminDashBoard() {
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
                    <Bar data={fakeData}></Bar>
                    <h4>Thống kê số sự kiện theo tháng</h4>
                  </div>
                </Grid>

                <Grid
                  container
                  xs={5}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item xs>
                    {/* <div className={style.statistic}>
                      <div className={style.statistic__card}>
                        <div className={style.statistic__card__icon}>
                          <FestivalIcon
                            sx={{ color: "#27258b", fontSize: "20px" }}
                          />
                        </div>
                        <h2>100</h2>
                        <div className={style.statistic__card__text}>
                          Sự kiện được tổ chức
                        </div>
                      </div>
                      <div className={style.statistic__card}>
                        <div className={style.statistic__card__icon}>
                          <BusinessIcon
                            sx={{ color: "#27258b", fontSize: "20px" }}
                          />
                        </div>
                        <h2>1000</h2>
                        <div className={style.statistic__card__text}>
                          POC đăng ký tham gia
                        </div>
                      </div>
                      <div className={style.statistic__card}>
                        <div className={style.statistic__card__icon}>
                          <PeopleIcon
                            sx={{ color: "#27258b", fontSize: "20px" }}
                          />
                        </div>
                        <h2>10000</h2>
                        <div className={style.statistic__card__text}>
                          Lượt khách check-in
                        </div>
                      </div>
                      <div className={style.statistic__card}>
                        <div className={style.statistic__card__icon}>
                          <AccountCircleIcon
                            sx={{ color: "#27258b", fontSize: "20px" }}
                          />
                        </div>
                        <h2>10000</h2>
                        <div className={style.statistic__card__text}>
                          Tài khoản người dùng
                        </div>
                      </div>
                    </div> */}
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
                          title="Doanh nghiệp tham gia"
                          total={100}
                          icon={"ion:business-sharp"}
                          color="secondary"
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
                          title="Người dùng"
                          total={100}
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
                          rows={ListEvent}
                          headCells={ListEventHeadNormal}
                          numOfRowsPerPage={3}
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
