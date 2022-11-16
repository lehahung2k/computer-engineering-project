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
    id: "name",
    label: "Tên POC",

    sort: true,
  },
  {
    id: "account",
    label: "Tài khoản phụ trách",
    sort: false,
  },
  {
    id: "note",
    label: "Ghi chú",
    sort: false,
  },
];

export default function ListPoc({ setActiveStep = (f) => f }) {
  const handleClickBack = () => {
    setActiveStep(0);
  };
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
          <NormalTable rows={rows} headCells={headCells} />
        </Grid>
      </Grid>
    </div>
  );
}
