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
import Box from "@mui/material/Box";
import NormalTable from "../../../../../../components/tables/normal";
import {
  listCompany,
  listCompanyHeadNormal,
} from "../../../../../../assets/fakeData";
function createData(name, address, id) {
  return {
    name,
    address,
    id,
  };
}

const rows = [
  createData("Công ty TNHH A", "Cầu Giấy, Hà Nội, Việt Nam", "1"),
  createData("Công ty TNHH B", "Cầu Giấy, Hà Nội, Việt Nam", "2"),
  createData("Công ty TNHH c", "Cầu Giấy, Hà Nội, Việt Nam", "3"),
  createData("Công ty TNHH d", "Cầu Giấy, Hà Nội, Việt Nam", "4"),
  createData("Công ty TNHH e", "Cầu Giấy, Hà Nội, Việt Nam", "5"),
  createData("Công ty TNHH g", "Cầu Giấy, Hà Nội, Việt Nam", "6"),
  createData("Công ty TNHH f", "Cầu Giấy, Hà Nội, Việt Nam", "7"),
  createData("Công ty TNHH h", "Cầu Giấy, Hà Nội, Việt Nam", "8"),
  createData("Công ty TNHH k", "Cầu Giấy, Hà Nội, Việt Nam", "9"),
  createData("Công ty TNHH l", "Cầu Giấy, Hà Nội, Việt Nam", "10"),
];

const headCells = [
  {
    id: "name",
    label: "Công ty/Doanh nghiệp",
    sort: true,
  },
  {
    id: "address",
    label: "Địa chỉ",
    sort: false,
  },
  { id: "id" },
];

export default function ListCompany({ setActiveStep = (f) => f }) {
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
          <Typography variant="h6">Danh sách doanh nghiệp</Typography>
        </Grid>

        <Grid item xs={12}>
          <NormalTable rows={listCompany} headCells={listCompanyHeadNormal} />
        </Grid>
      </Grid>
    </div>
  );
}
