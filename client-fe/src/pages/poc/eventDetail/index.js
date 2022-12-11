import * as React from "react";
import Grid from "@mui/material/Grid";
import style from "./style.module.css";
import SideBar from "../../../components/navigation";
import Header from "../../../components/header";
// import EventTable from "./components/eventTable";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import BreadCrumbs from "../../../components/breadCrumbs";
import { useSelector, useDispatch } from "react-redux";

const breadcrumbs = [
  { link: "/poc/event", label: "Danh sách sự kiện" },
  { link: "#", label: "Chi tiết sự kiện" },
];

export default function PocEventDetail() {
  const [openSidebar, setOpenSidebar] = React.useState(true);
  const eventInfo = useSelector((state) => state.eventState.event);
  const pocInfo = useSelector((state) => state.pocState.poc);
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
          <BreadCrumbs breadcrumbs={breadcrumbs} />
          <Grid container spacing="0" id="container">
            <div className={style.main}>
              <div className={style.main__info}>
                <div className={style.info}>
                  <h3> Thông tin sự kiện </h3>
                  <div className={style.event__name__label}>Tên sự kiện:</div>

                  <div className={style.event__name__value}>
                    <div className={style.info__value}>
                      {" "}
                      {eventInfo.eventName}
                    </div>
                  </div>

                  <div className={style.event__start__label}>
                    Thời gian bắt đầu:
                  </div>

                  <div className={style.event__start__value}>
                    <div className={style.info__value}>
                      {eventInfo.startTime}
                    </div>
                  </div>

                  <div className={style.event__end__label}>
                    Thời gian kết thúc:
                  </div>

                  <div className={style.event__end__value}>
                    {" "}
                    <div className={style.info__value}>
                      {" "}
                      {eventInfo.endTime}
                    </div>
                  </div>

                  <h3> Thông tin POC </h3>

                  <div className={style.poc__name__label}>Tên POC:</div>

                  <div className={style.poc__name__value}>
                    <div className={style.info__value}>{pocInfo.name}</div>
                  </div>

                  <div className={style.poc__code__label}>Mã POC:</div>

                  <div className={style.poc__code__value}>
                    {" "}
                    <div className={style.info__value}>{pocInfo.code}</div>
                  </div>

                  <div className={style.poc__account__label}>
                    Tài khoản phụ trách:
                  </div>

                  <div className={style.poc__account__value}>
                    {" "}
                    <div className={style.info__value}>{pocInfo.account}</div>
                  </div>
                </div>

                <div className={style.map}>
                  <div className={style.map__label}>Ảnh sơ đồ sự kiện</div>
                  {eventInfo.eventImg === "" ? (
                    <></>
                  ) : (
                    <img
                      className={style.map__image}
                      alt="Map preview"
                      src={eventInfo.eventImg}
                    />
                  )}
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
