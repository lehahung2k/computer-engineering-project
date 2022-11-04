import * as React from "react";
import Grid from "@mui/material/Grid";
import style from "./style.module.css";
import SideBar from "../../../components/navigation";
import Header from "../../../components/header";
// import EventTable from "./components/eventTable";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const eventInfo = {
  name: "JobFair",
  start: "08:00 12/12/2022",
  end: "10:00 12/12/2022",
  note: "Ngày hôi việc làm 2022",
};

const poc = {
  name: "Soict POC",
  code: "12345",
  account: "adminPOC01",
};

export default function PocEventDetail() {
  const [openSidebar, setOpenSidebar] = React.useState(true);

  const navigate = useNavigate();
  const handleShowListGuest = () => {
    navigate("/poc/event/detail/guests");
  };

  return (
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
            <div className={style.main}>
              <div className={style.main__info}>
                <div className={style.info}>
                  <h3> Thông tin sự kiện </h3>
                  <div className={style.event__name__label}>Tên sự kiện:</div>

                  <div className={style.event__name__value}>
                    <div className={style.info__value}> {eventInfo.name}</div>
                  </div>

                  <div className={style.event__start__label}>
                    Thời gian bắt đầu:
                  </div>

                  <div className={style.event__start__value}>
                    <div className={style.info__value}>{eventInfo.start}</div>
                  </div>

                  <div className={style.event__end__label}>
                    Thời gian kết thúc:
                  </div>

                  <div className={style.event__end__value}>
                    {" "}
                    <div className={style.info__value}> {eventInfo.end}</div>
                  </div>

                  <h3> Thông tin POC </h3>

                  <div className={style.poc__name__label}>Tên POC:</div>

                  <div className={style.poc__name__value}>
                    <div className={style.info__value}>{poc.name}</div>
                  </div>

                  <div className={style.poc__code__label}>Mã POC:</div>

                  <div className={style.poc__code__value}>
                    {" "}
                    <div className={style.info__value}>{poc.code}</div>
                  </div>

                  <div className={style.poc__account__label}>
                    Tài khoản phụ trách:
                  </div>

                  <div className={style.poc__account__value}>
                    {" "}
                    <div className={style.info__value}>{poc.account}</div>
                  </div>
                  {/* <Button>Xem danh sách check-in</Button> */}
                </div>

                <div className={style.map}>
                  <div className={style.map__label}>Ảnh sơ đồ sự kiện</div>
                  <div className={style.map__image}>
                    <img src="/image/map_example.jpg"></img>
                  </div>
                </div>
              </div>

              <Button variant="contained" onClick={() => handleShowListGuest()}>
                Xem danh sách check-in
              </Button>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
