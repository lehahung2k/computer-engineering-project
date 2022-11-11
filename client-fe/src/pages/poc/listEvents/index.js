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

const breadcrumbs = [{ link: "#", label: "Danh sách sự kiện" }];

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
    "2022-12-12T09:30:00",
    "2022-12-12T09:00:00",
    "Ngày hội việc làm 2022",
    "Xem"
  ),
  createData(
    "Inovation Day",
    "2022-12-12T08:00:00",
    "2022-12-12T09:00:00",
    "Ngày hội đổi mới sáng tạo 2022",
    "Xem"
  ),
  createData(
    "Đây là tên sự kiện dài để kiểm thử chức năng hiển thị",
    "2022-12-12T07:30:00",
    "2022-12-12T09:00:00",
    "Đây là note dài để kiểm thử chức năng hiển thị. Nếu note được xuống dòng tức chức năng đã ổn định. Đây là note dài để kiểm thử chức năng hiển thị. Nếu note được xuống dòng tức chức năng đã ổn định",
    "Xem"
  ),
  createData(
    "JobFair",
    "2022-12-21T09:00:00",
    "2022-12-12T09:00:00",
    "Ngày hội việc làm 2022",
    "Xem"
  ),
  createData(
    "JobFair",
    "2022-12-01T09:00:00",
    "2022-12-12T09:00:00",
    "Ngày hội việc làm 2022",
    "Xem"
  ),
  createData(
    "JobFair",
    "2022-12-12T09:00:00",
    "2022-12-12T09:00:00",
    "Ngày hội việc làm 2022",
    "Xem"
  ),
  createData(
    "JobFair",
    "2022-12-12T09:00:00",
    "2022-12-12T09:00:00",
    "Ngày hội việc làm 2022",
    "Xem"
  ),
  createData(
    "JobFair",
    "2022-12-12T09:00:00",
    "2022-12-12T09:00:00",
    "Ngày hội việc làm 2022",
    "Xem"
  ),
  createData(
    "JobFair",
    "2022-12-12T09:00:00",
    "2022-12-12T09:00:00",
    "Ngày hội việc làm 2022",
    "Xem"
  ),
  createData(
    "JobFair",
    "2022-12-12T09:00:00",
    "2022-12-12T09:00:00",
    "Ngày hội việc làm 2022",
    "Xem"
  ),
  createData(
    "JobFair",
    "2022-12-12T09:00:00",
    "2022-12-12T09:00:00",
    "Ngày hội việc làm 2022",
    "Xem"
  ),
  createData(
    "JobFair",
    "2022-12-12T09:00:00",
    "2022-12-12T09:00:00",
    "Ngày hội việc làm 2022",
    "Xem"
  ),
  createData(
    "JobFair",
    "2022-12-12T09:00:00",
    "2022-12-12T09:00:00",
    "Ngày hội việc làm 2022",
    "Xem"
  ),
  createData(
    "JobFair",
    "2022-12-12T09:00:00",
    "2022-12-12T09:00:00",
    "Ngày hội việc làm 2022",
    "Xem"
  ),
];

const headCells = [
  {
    id: "name",
    label: "Tên sự kiện",
    sort: true,
    width: "25%",
    button: true,
    link: "/poc/event/detail",
    time: false,
  },
  {
    id: "start",
    label: "Thời gian bắt đầu",
    sort: true,
    width: "15%",
    button: false,
    link: "#",
    time: true,
  },
  {
    id: "end",
    label: "Thời gian kết thúc",
    sort: false,
    width: "15%",
    button: false,
    link: "#",
    time: false,
  },
  {
    id: "note",
    label: "Ghi chú",
    sort: true,
    with: "35%",
    button: false,
    link: "#",
    time: false,
  },
  {
    id: "checkin",
    label: "Thông tin check-in",
    sort: false,
    width: "10%",
    button: true,
    link: "/poc/event/detail",
    time: false,
  },
];

export default function PocManageEvent() {
  const [filterName, setFilterName] = useState("");
  const [openSidebar, setOpenSidebar] = useState(true);

  const filteredEvents = rows.filter((event) => {
    return (
      event.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
      event.note.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  });
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
                    <EventFilter />
                  </Box>
                </div>
              </div>

              <div>
                {/* <EventTable key={filteredEvents} rows={filteredEvents} /> */}
                <NormalTable
                  key={filteredEvents}
                  rows={filteredEvents}
                  headCells={headCells}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
