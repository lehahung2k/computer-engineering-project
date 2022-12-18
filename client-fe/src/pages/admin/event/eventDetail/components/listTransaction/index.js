import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import NormalTable from "../../../../../../components/tables/normal";
import { useSelector, useDispatch } from "react-redux";
import { fetchListPocByEventCode } from "../../../../../../services/redux/actions/poc/fetchListPoc";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

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
export default function ListTransaction({ setActiveStep = (f) => f }) {
  const handleClickBack = () => {
    setActiveStep(1);
  };

  const listPoc = useSelector((state) => state.pocState.listPoc);
  const eventCode = useSelector((state) => state.eventState.event.eventCode);
  const loading = useSelector((state) => state.pocState.loading);
  const filteredListPoc = listPoc.filter((poc) => poc.enable === true);
  const dispatch = useDispatch();
  const listTransaction = useSelector(
    (state) => state.transactionState.listTransaction
  );
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} align="left">
          <Button
            variant="contained"
            startIcon={<KeyboardArrowLeftIcon />}
            sx={{ textTransform: "none" }}
            onClick={() => handleClickBack()}
          >
            Quay lại
          </Button>
        </Grid>

        <Grid item xs={12} align="left">
          <Typography variant="h6">Danh sách POC</Typography>
        </Grid>

        <Grid item xs={12}>
          <NormalTable rows={listTransaction} headCells={headCells} />
        </Grid>
      </Grid>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
