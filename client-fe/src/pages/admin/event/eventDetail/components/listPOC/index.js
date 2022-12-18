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
import CheckTable from "../../../../../../components/tables/check";
import CustomField from "../customField";

const headCells = [
  {
    id: "pointName",
    label: "Tên POC",

    sort: true,
    width: "20%",
  },
  {
    id: "username",
    label: "Tài khoản phụ trách",
    sort: false,
    width: "25%",
  },
  {
    id: "pointNote",
    label: "Ghi chú",
    sort: false,
    width: "30%",
  },
  { id: "transaction", label: "Thông tin check-in", sort: false },
  { id: "delete", label: "Xóa", sort: false },
];

export default function ListPoc({ setActiveStep = (f) => f }) {
  const handleClickBack = () => {
    setActiveStep(0);
  };
  const [selectedPoc, setSelectedPoc] = React.useState([]);

  const listPoc = useSelector((state) => state.pocState.listPoc);
  const eventCode = useSelector((state) => state.eventState.event.eventCode);
  const loading = useSelector((state) => state.pocState.loading);
  const filteredListPoc = listPoc.filter((poc) => poc.enable === true);
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
          {/* <NormalTable rows={filteredListPoc} headCells={headCells} /> */}
          <CheckTable
            id={"pointCode"}
            rows={filteredListPoc}
            headCells={headCells}
            setSelectedItem={setSelectedPoc}
            customField={[
              {
                id: "delete",
                component(row, index) {
                  return (
                    <CustomField
                      width="10%"
                      field="delete"
                      row={row}
                      key={index}
                    />
                  );
                },
              },
              {
                id: "transaction",
                component(row, index) {
                  return (
                    <CustomField
                      width="10%"
                      field="transaction"
                      row={row}
                      key={index}
                      clickHandler={setActiveStep}
                    />
                  );
                },
              },
            ]}
          />
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
