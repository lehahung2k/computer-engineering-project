import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import style from "./style.module.css";
import SideBar from "../../../components/navigation";
import Header from "../../../components/header";
import EventFilter from "./components/filterEvents";
import SearchEvent from "./components/search";
import EventTable from "./components/eventTable";
import Box from "@mui/material/Box";
import BreadCrumbs from "../../../components/breadCrumbs";
import NormalTable from "../../../components/tables/normal";
import { fetchListEventByUsername } from "../../../services/redux/actions/event/fetchListEvent";
import { useSelector, useDispatch } from "react-redux";
import {
  listFakeEvents,
  headCellsListFakeEvents,
} from "../../../assets/fakeData/fakeEvent";
import moment from "moment";
import {
  pinEventId,
  newEventAction,
} from "../../../services/redux/actions/event/event";
import { useNavigate } from "react-router-dom";
import { fetchPocInfo } from "../../../services/redux/actions/poc/fetchListPoc";
import { fetchPocAccountInfo } from "../../../services/redux/actions/accounts/fetchListAccount";
import AlertResponse from "./components/alert";

const filterEventByTime = (listEvent, time) => {
  console.log("filterEventByTime function, time: " + time);
  switch (time) {
    case "all": {
      return listEvent;
    }
    case "upcoming": {
      console.log("Current time: ", moment());
      const listUpcoming = listEvent
        .map((event) => {
          console.log("Event time: ", moment(event.startTime));
          console.log(
            "Compare time: ",
            moment().isBefore(moment(event.startTime))
          );
          return event;
        })
        .filter((event) => moment().isBefore(moment(event.startTime)));
      return listUpcoming;
    }

    case "ongoing": {
      const listOngoing = listEvent.filter(
        (event) =>
          moment().isBefore(moment(event.endTime)) &&
          moment(event.startTime).isBefore(moment())
      );
      return listOngoing;
    }

    case "done": {
      const listDone = listEvent.filter((event) =>
        moment(event.endTime).isBefore(moment())
      );
      return listDone;
    }

    default: {
      return listEvent;
    }
  }
};

export default function PocManageEvent() {
  const [filterName, setFilterName] = useState("");
  const [openSidebar, setOpenSidebar] = useState(true);
  const [filterTime, setFilterTime] = React.useState("");
  const listEvent = useSelector((state) => state.eventState.listEvents);
  const tenantName = useSelector(
    (state) => state.tenantState.tenant.tenantName
  );

  const breadcrumbs = [{ link: "#", label: "Danh sách sự kiện" }];

  const formatListEvent = listEvent.map((event) => {
    let startTime = moment(event.startTime).format("YYYY-MM-DD HH:mm:ss");
    let endTime = moment(event.endTime).format("YYYY-MM-DD HH:mm:ss");

    return {
      ...event,
      startTime: startTime,
      endTime: endTime,
      tenantName: tenantName,
    };
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(fetchListEventByUsername());
    if (!tenantName) {
      dispatch(fetchPocAccountInfo());
    }
  }, []);

  const filteredEvents = formatListEvent.filter((event) => {
    return (
      event.eventName.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
      event.eventDescription.toLowerCase().indexOf(filterName.toLowerCase()) !==
        -1
    );
  });

  const filteredEventByTime = filterEventByTime(filteredEvents, filterTime);

  console.log(filteredEvents);
  const handleFilterByName = (e) => {
    setFilterName(e.target.value);
  };

  const handleClickButtonField = (fieldName, row) => {
    if (fieldName === "eventName") {
      dispatch(pinEventId(row["eventId"]));
      const eventInfo = filteredEvents.find(
        (event) => event.eventId === row["eventId"]
      );
      dispatch(newEventAction(eventInfo));
      dispatch(fetchPocInfo(eventInfo.eventCode));
      navigate("/poc/event/detail");
    }
    if (fieldName === "checkin") console.log("checkin");
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
            {/* <BreadCrumbs breadcrumbs={breadcrumbs} /> */}

            <Grid container spacing="0" id="container">
              <div className={style.main}>
                <div className={style.main__head}>
                  <h3>Danh sách sự kiện</h3>
                  <div className={style.main__head__utils}>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <SearchEvent
                        filterName={filterName}
                        onFilterName={handleFilterByName}
                      />
                      <EventFilter setFilterEvent={setFilterTime} />
                    </Box>
                  </div>
                </div>

                <div>
                  {/* <EventTable key={filteredEvents} rows={filteredEvents} /> */}
                  <NormalTable
                    key={filteredEvents}
                    rows={filteredEventByTime}
                    headCells={headCellsListFakeEvents}
                    handleClickButtonField={handleClickButtonField}
                  />
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <AlertResponse />
    </div>
  );
}
