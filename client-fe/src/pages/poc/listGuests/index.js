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
import BreadCrumbs from "../../../components/breadCrumbs";
import checkinApi from "../../../api/CheckinAPI";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import NormalTable from "../../../components/tables/normal";

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
    id: "guestCode",
    label: "Mã định danh",
    sort: false,
  },
  {
    id: "createTime",
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
  const [listTransactions, setListTransactions] = React.useState([]);
  const [failure, setFailure] = React.useState(false);
  const pocInfo = useSelector((state) => state.pocState.poc);

  const breadcrumbs = [
    { link: "/poc/event", label: "Danh sách sự kiện" },
    { link: "/poc/event/detail", label: "Chi tiết sự kiện" },
    { link: "#", label: "Khách check-in" },
  ];

  const dispatch = useDispatch();

  React.useEffect(() => {
    const params = { pointCode: pocInfo.pointCode };
    const responseFetchListTransaction =
      checkinApi.getAllTransactionByPointCode(params);

    responseFetchListTransaction
      .then((res) => {
        setListTransactions((listTransactions) => [...res.data]);
        console.log(res.data);
      })
      .catch((err) => {
        setFailure(true);
      });
  }, []);
  console.log(listTransactions);
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
              <div className={style.main__head}>
                <div className={style.main__head__breadcrumb}></div>
                <h3>Danh sách khách check-in</h3>
              </div>

              <div>
                <NormalTable rows={listTransactions} headCells={headCells} />
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>

      <Dialog
        open={failure}
        onClose={() => setFailure(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tải danh sách check-in không thành công, xin thử lại.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setFailure(false);
            }}
            autoFocus
          >
            OK{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
