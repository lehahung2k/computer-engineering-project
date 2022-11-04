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

function createData(name, start, end, note, checkin) {
  return {
    name,
    start,
    end,
    note,
    checkin,
  };
}

const rows = [
  createData(
    "JobFair",
    "08:00 12/12/2022",
    "08:00 12/12/2022",
    "Ngày hội việc làm 2022",
    4.3
  ),
  createData(
    "Inovation Day",
    "08:00 12/12/2022",
    "08:00 12/12/2022",
    "Ngày hội việc làm 2022",
    4.3
  ),
  createData(
    "JobFair",
    "08:00 12/12/2022",
    "08:00 12/12/2022",
    "Ngày hội việc làm 2022",
    4.3
  ),
  createData(
    "JobFair",
    "08:00 12/12/2022",
    "08:00 12/12/2022",
    "Ngày hội việc làm 2022",
    4.3
  ),
  createData(
    "JobFair",
    "08:00 12/12/2022",
    "08:00 12/12/2022",
    "Ngày hội việc làm 2022",
    4.3
  ),
  createData(
    "JobFair",
    "08:00 12/12/2022",
    "08:00 12/12/2022",
    "Ngày hội việc làm 2022",
    4.3
  ),
  createData(
    "JobFair",
    "08:00 12/12/2022",
    "08:00 12/12/2022",
    "Ngày hội việc làm 2022",
    4.3
  ),
  createData(
    "JobFair",
    "08:00 12/12/2022",
    "08:00 12/12/2022",
    "Ngày hội việc làm 2022",
    4.3
  ),
  createData(
    "JobFair",
    "08:00 12/12/2022",
    "08:00 12/12/2022",
    "Ngày hội việc làm 2022",
    4.3
  ),
  createData(
    "JobFair",
    "08:00 12/12/2022",
    "08:00 12/12/2022",
    "Ngày hội việc làm 2022",
    4.3
  ),
  createData(
    "JobFair",
    "08:00 12/12/2022",
    "08:00 12/12/2022",
    "Ngày hội việc làm 2022",
    4.3
  ),
  createData(
    "JobFair",
    "08:00 12/12/2022",
    "08:00 12/12/2022",
    "Ngày hội việc làm 2022",
    4.3
  ),
  createData(
    "JobFair",
    "08:00 12/12/2022",
    "08:00 12/12/2022",
    "Ngày hội việc làm 2022",
    4.3
  ),
  createData(
    "JobFair",
    "08:00 12/12/2022",
    "08:00 12/12/2022",
    "Ngày hội việc làm 2022",
    4.3
  ),
];

export default function PocManageEvent() {
  const [filterName, setFilterName] = useState("");
  const [openSidebar, setOpenSidebar] = useState(true);

  const filteredEvents = rows.filter(
    (event) => event.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
  );
  console.log(filteredEvents);
  const handleFilterByName = (e) => {
    setFilterName(e.target.value);
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
              <div className={style.main__head}>
                <h3>Danh sách sự kiện</h3>
                <div className={style.main__head__utils}>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <SearchEvent
                      filterName={filterName}
                      onFilterName={handleFilterByName}
                    />
                    <EventFilter />
                  </Box>
                </div>
              </div>

              <div>
                <EventTable key={filteredEvents} rows={filteredEvents} />
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
