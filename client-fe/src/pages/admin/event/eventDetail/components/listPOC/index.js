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

function createData(name, account, note) {
  return {
    name,
    account,
    note,
  };
}

const rows = [
  createData("Quầy POC 01", "NVA01", "Quầy POC của Doanh nghiệp A"),
  createData("Quầy POC 02", "NVB01", "Quầy POC của Doanh nghiệp B"),
  createData("Quầy POC 03", "NVC01", "Quầy POC của Doanh nghiệp C"),
  createData("Quầy POC 04", "NVD01", "Quầy POC của Doanh nghiệp D"),
];

const headCells = [
  {
    id: "pointName",
    label: "Tên POC",

    sort: true,
  },
  {
    id: "username",
    label: "Tài khoản phụ trách",
    sort: false,
  },
  {
    id: "pointNote",
    label: "Ghi chú",
    sort: false,
  },
];

export default function ListPoc({ setActiveStep = (f) => f }) {
  const handleClickBack = () => {
    setActiveStep(0);
  };

  const listPoc = useSelector((state) => state.pocState.listPoc);
  const eventCode = useSelector((state) => state.eventState.event.eventCode);
  const loading = useSelector((state) => state.pocState.loading);

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchListPocByEventCode(eventCode));
  }, []);
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
          <NormalTable rows={listPoc} headCells={headCells} />
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
