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
const breadcrumbs = [
  { link: "/admin", label: "Trang chủ" },
  { link: "#", label: "Sự kiện" },
];

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
    link: "/admin/event/detail",
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
    link: "/admin/event/detail",
    time: false,
  },
];

export default function ListEvent() {
  const [openSidebar, setOpenSidebar] = React.useState(true);
  const navigate = useNavigate();

  const handleClickAddNewEvent = () => {
    navigate("/admin/create-event");
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
              <div className={style.main__form}>
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <Typography variant="h6" align="left">
                      Danh sách sự kiện
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Box display="flex" justifyContent="flex-end">
                      <SearchEvent mả />
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
                    <NormalTable key={rows} rows={rows} headCells={headCells} />
                  </Grid>
                </Grid>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
