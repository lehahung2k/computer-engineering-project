import * as React from "react";
import Grid from "@mui/material/Grid";
import style from "./style.module.css";
import SideBar from "../../../components/navigation";
import Header from "../../../components/header";
import GuestsTable from "./components/guestsTable";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const breadcrumbs = [
  <Link underline="hover" key="1" color="inherit" href="/poc/event">
    Danh sách sự kiện
  </Link>,
  <Link underline="hover" key="2" color="inherit" href="/poc/event/detail">
    Chi tiết sự kiện
  </Link>,
  <Typography key="3" color="text.primary">
    Khách check-in
  </Typography>,
];

function createData(name, id, time, note, image) {
  return {
    name,
    id,
    time,
    note,
    image,
  };
}

const rows = [
  createData(
    "Nguyễn Văn A",
    "0123456",
    "09:00 12/12/2022",
    "Khách checkin không chụp ảnh",
    ""
  ),
  createData(
    "Nguyễn Văn B",
    "0123456",
    "09:00 12/12/2022",
    "Khách checkin không chụp ảnh",
    ""
  ),
  createData(
    "Nguyễn Văn C",
    "0123456",
    "09:00 12/12/2022",
    "Khách checkin không chụp ảnh",
    ""
  ),
  createData(
    "Nguyễn Văn D",
    "0123456",
    "09:00 12/12/2022",
    "Khách checkin không chụp ảnh",
    ""
  ),
  createData(
    "Nguyễn Văn A",
    "0123456",
    "09:00 12/12/2022",
    "Khách checkin không chụp ảnh",
    ""
  ),
  createData(
    "Nguyễn Văn A",
    "0123456",
    "09:00 12/12/2022",
    "Khách checkin không chụp ảnh",
    ""
  ),
  createData(
    "Nguyễn Văn A",
    "0123456",
    "09:00 12/12/2022",
    "Khách checkin không chụp ảnh",
    ""
  ),
  createData(
    "Nguyễn Văn A",
    "0123456",
    "09:00 12/12/2022",
    "Khách checkin không chụp ảnh",
    ""
  ),
  createData(
    "Nguyễn Văn A",
    "0123456",
    "09:00 12/12/2022",
    "Khách checkin không chụp ảnh",
    ""
  ),
  createData(
    "Nguyễn Văn A",
    "0123456",
    "09:00 12/12/2022",
    "Khách checkin không chụp ảnh",
    ""
  ),
  createData(
    "Nguyễn Văn A",
    "0123456",
    "09:00 12/12/2022",
    "Khách checkin không chụp ảnh",
    ""
  ),
  createData(
    "Nguyễn Văn A",
    "0123456",
    "09:00 12/12/2022",
    "Khách checkin không chụp ảnh",
    ""
  ),
  createData(
    "Nguyễn Văn A",
    "0123456",
    "09:00 12/12/2022",
    "Khách checkin không chụp ảnh",
    ""
  ),
  createData(
    "Nguyễn Văn A",
    "0123456",
    "09:00 12/12/2022",
    "Khách checkin không chụp ảnh",
    ""
  ),
  createData(
    "Nguyễn Văn A",
    "0123456",
    "09:00 12/12/2022",
    "Khách checkin không chụp ảnh",
    ""
  ),
  createData(
    "Nguyễn Văn A",
    "0123456",
    "09:00 12/12/2022",
    "Khách checkin không chụp ảnh",
    ""
  ),
  createData(
    "Nguyễn Văn A",
    "0123456",
    "09:00 12/12/2022",
    "Khách checkin không chụp ảnh",
    ""
  ),
];

const headCells = [
  {
    id: "name",
    label: "Họ và tên",

    sort: true,
  },
  {
    id: "id",
    label: "Mã định danh",
    sort: false,
  },
  {
    id: "time",
    label: "Thời điểm check-in",
    sort: true,
  },
  {
    id: "note",
    label: "Ghi chú",
    sort: false,
  },
  {
    id: "image",
    label: "Hình ảnh check-in",
    sort: false,
  },
];

export default function PocListGuest() {
  const [openSidebar, setOpenSidebar] = React.useState(true);

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
                <div className={style.main__head__breadcrumb}>
                  <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                    sx={{ display: "block" }}
                  >
                    {breadcrumbs}
                  </Breadcrumbs>
                </div>
                <h3>Danh sách khách check-in</h3>
              </div>

              <div>
                <GuestsTable rows={rows} headCells={headCells} />
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
