import * as React from "react";
import Grid from "@mui/material/Grid";
import style from "./style.module.css";
import SideBar from "../../../../components/navigation";
import Header from "../../../../components/header";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import NormalTable from "../../../../components/tables/normal";
import BreadCrumbs from "../../../../components/breadCrumbs";
import { StepButton } from "@mui/material";
import EventFilter from "./components/filterEvent";
import SearchEvent from "./components/searchEvent";
import {
  listFakeEvents,
  headCellsListFakeEvents,
} from "../../../../assets/fakeData/fakeEvent";
import { useSelector, useDispatch } from "react-redux";
import {
  pinEventId,
  newEventAction,
} from "../../../../services/redux/actions/event/event";
import { fetchListEventAdmin } from "../../../../services/redux/actions/event/fetchListEvent";
import { fetchListTenant } from "../../../../services/redux/actions/tenant/fetchListTenant";
import moment from "moment";
import AlertResponse from "./components/alert";
const breadcrumbs =
  sessionStorage.getItem("role") === "admin"
    ? [
        { link: "/admin", label: "Trang chủ" },
        { link: "#", label: "Sự kiện" },
      ]
    : [
        { link: "/event-admin", label: "Trang chủ" },
        { link: "#", label: "Sự kiện" },
      ];

export default function ListEvent() {
  const [openSidebar, setOpenSidebar] = React.useState(true);
  const listEvents = useSelector((state) => state.eventState.listEvents);
  const listTenant = useSelector((state) => state.tenantState.listTenant);

  const customListEvents = listEvents.map((event) => {
    let startTime = moment(event.startTime).format("YYYY-MM-DD HH:mm:ss");
    let endTime = moment(event.endTime).format("YYYY-MM-DD HH:mm:ss");
    let tenant = listTenant.filter(
      (tenant) => tenant.tenantCode === event.tenantCode
    );

    if (tenant.length > 0) {
      return {
        ...event,
        startTime: startTime,
        endTime: endTime,
        tenantName: tenant[0].tenantName,
      };
    } else {
      return {
        ...event,
        startTime: startTime,
        endTime: endTime,
        tenantName: "",
      };
    }
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    // if (listEvents.length === 0)
    dispatch(fetchListEventAdmin());
    // if (listTenant.length === 0)
    dispatch(fetchListTenant());
  }, []);

  const handleClickAddNewEvent = () => {
    sessionStorage.getItem("role") === "admin"
      ? navigate("/admin/create-event")
      : navigate("/event-admin/create-event");
  };

  const handleClickButtonField = (fieldName, row) => {
    if (fieldName === "eventName") {
      dispatch(pinEventId(row["eventId"]));
      const eventInfo = listEvents.find(
        (event) => event.eventId === row["eventId"]
      );
      console.log(eventInfo);
      dispatch(newEventAction(eventInfo));
      navigate("/admin/event/detail");
    }
    if (fieldName === "checkin") console.log("checkin");
  };

  return (
    <div className={style.body}>
      <Grid container spacing={0}>
        {openSidebar ? (
          <Grid item xs="auto">
            <div>
              <SideBar id="1" />
            </div>
          </Grid>
        ) : (
          <></>
        )}
        <Grid item xs>
          <Header
            openSidebar={openSidebar}
            handleOpenSidebar={setOpenSidebar}
          />
          <BreadCrumbs breadcrumbs={breadcrumbs} />
          <Grid container spacing="0" id="container">
            <div className={style.main}>
              <div className={style.main__form}>
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <Typography variant="h6" align="left">
                      Danh sách sự kiện
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Box display="flex" justifyContent="flex-end">
                      <SearchEvent />
                      <EventFilter />
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
                      key={listEvents}
                      rows={customListEvents}
                      headCells={headCellsListFakeEvents}
                      handleClickButtonField={handleClickButtonField}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <AlertResponse />
    </div>
  );
}
