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
import { listCompanyHeadNormal } from "../../../../../../assets/fakeData";

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
          {/* <NormalTable rows={listCompany} headCells={listCompanyHeadNormal} /> */}
        </Grid>
      </Grid>
    </div>
  );
}
