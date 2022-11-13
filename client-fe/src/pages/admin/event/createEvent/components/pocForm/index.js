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
import Iconify from "../../../../../../components/iconify";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  NewPocAction,
  NewNotePocAction,
  NewPocEventCodeAction,
  NewAccountAction,
  NewCodePocAction,
  NewNamePocAction,
  AddNewPocAction,
} from "../../../../../../services/redux/actions/poc/poc";
import NormalTable from "../../../../../../components/tables/normal";

const rowsAccount = [
  { label: "NVA01" },
  { label: "NVA02" },
  { label: "NVB01" },
  { label: "NVC01" },
  { label: "NVD01" },
  { label: "NVG01" },
  { label: "NVG03" },
  { label: "NVH01" },
  { label: "NVY01" },
  { label: "NVki01" },
  { label: "sNVA01" },
  { label: "sNVA02" },
  { label: "sNVB01" },
  { label: "sNVC01" },
  { label: "sNVD01" },
  { label: "sNVG01" },
  { label: "sNVG03" },
  { label: "sNVH01" },
  { label: "sNVY01" },
  { label: "sNVki01" },
];

const rowsCompany = [
  { label: "Doanh nghiệp 01" },
  { label: "Doanh nghiệp 02" },
  { label: "Doanh nghiệp 03" },
  { label: "Doanh nghiệp 04" },
  { label: "Doanh nghiệp 06" },
  { label: "Doanh nghiệp 05" },
  { label: "Doanh nghiệp 07" },
  { label: "Doanh nghiệp 08" },
  { label: "Doanh nghiệp 09" },
  { label: "Doanh nghiệp 10" },
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

export default function EventPocInfoForm() {
  const [open, setOpen] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [name, setName] = React.useState("");
  const [openListAccount, setOpenListAccount] = React.useState(false);

  const listNewPoc = useSelector((state) => state.listPoc);
  const newPoc = useSelector((state) => state.poc);

  const dispatch = useDispatch();

  const handleClickGenerateCode = () => {
    setCode("test");
  };

  const handleMouseDownGenerateCode = (event) => {
    event.preventDefault();
  };

  const handleClickOpen = () => {
    setOpen(true);
    console.log("Handle click open: open state: ", open);
    console.log("Hanlde click open: Open list account", openListAccount);
  };

  const handleClose = () => {
    setOpen(false);
    console.log("Handle close: open state: ", open);
    console.log("Hanlde close: Open list account", openListAccount);
  };

  const handleAddNewPOC = () => {
    const actionAddNewPoc = AddNewPocAction(newPoc);
    dispatch(actionAddNewPoc);
    setOpen(false);
  };

  const handleChangePocName = (e) => {
    const newNamePocAction = NewNamePocAction(e.target.value);
    dispatch(newNamePocAction);
  };

  const handleChangeAccount = (e, value) => {
    console.log(e.target.value);
    console.log(value);

    const newAccountAction = NewAccountAction(value ? value.label : "");
    dispatch(newAccountAction);
  };

  const handleChangeCompany = () => {};

  const handleChangeNote = (e) => {
    const newNotePocAction = NewNotePocAction(e.target.value);
    dispatch(newNotePocAction);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant="h6" align="left">
            Danh sách POC sự kiện
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              sx={{ textTransform: "none" }}
              onClick={handleClickOpen}
            >
              Thêm mới
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <NormalTable rows={listNewPoc} headCells={headCells} />
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle>Thông tin POC</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="eventName"
                name="eventName"
                label="Tên sự kiện"
                fullWidth
                autoComplete="event-name"
                variant="standard"
                onChange={(e) => setName(e.target.value)}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  readOnly: true,
                }}
                value="Test name event"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="pocName"
                name="pocName"
                label="Tên POC"
                fullWidth
                autoComplete="poc-name"
                variant="standard"
                onChange={handleChangePocName}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="pocCode"
                name="pocCode"
                label="Mã POC"
                fullWidth
                autoComplete="poc-code"
                variant="standard"
                helperText="Chọn để tạo mã ngẫu nhiên"
                value={code}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        aria-label="generator code"
                        onClick={handleClickGenerateCode}
                        onMouseDown={handleMouseDownGenerateCode}
                        edge="end"
                        sx={{ marginRight: "0" }}
                      >
                        <Iconify icon={"carbon:operations-record"}></Iconify>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                disablePortal
                noOptionsText={"Không tìm thấy doanh nghiệp"}
                id="combo-box-demo"
                options={rowsCompany}
                sx={{ width: 300 }}
                ListboxProps={{ style: { maxHeight: 150 } }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Doanh nghiệp phụ trách"
                    variant="standard"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Autocomplete
                disablePortal
                noOptionsText={"Không tìm thấy tài khoản"}
                id="combo-box-demo"
                options={rowsAccount}
                sx={{ width: 300 }}
                ListboxProps={{ style: { maxHeight: 150 } }}
                onChange={handleChangeAccount}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tài khoản phụ trách"
                    variant="standard"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="note"
                name="note"
                label="Ghi chú"
                fullWidth
                autoComplete="event-note"
                multiline
                variant="standard"
                InputLabelProps={{ shrink: true }}
                onChange={handleChangeNote}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy bỏ</Button>
          <Button onClick={handleAddNewPOC}>Thêm mới</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
