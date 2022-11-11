import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Iconify from "../../../../../components/iconify";
import AddingListCompany from "../listCompany";
import NormalTable from "../../../../../components/tables/normal";

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
];

export default function EventCompanyForm() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedCompany, setSelectedCompany] = React.useState([]);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant="h6" align="left">
            Danh sách công ty, doanh nghiệp
          </Typography>
        </Grid>
        {/* <Grid item xs={6}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              sx={{ textTransform: "none" }}
              onClick={handleClickOpenDialog}
            >
              Thêm mới
            </Button>
          </Box>
        </Grid> */}
        <Grid item xs={12}>
          {/* <NormalTable rows={selectedCompany} headCells={headCells} /> */}
          <AddingListCompany setSelectedItem={setSelectedCompany} />
        </Grid>
      </Grid>

      {/* <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle>Danh sách doanh nghiệp</DialogTitle>
        <DialogContent>
          <AddingListCompany setSelectedItem={setSelectedCompany} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy bỏ</Button>
          <Button onClick={handleCloseDialog}>Thêm mới</Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
}
