import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import IconButton from "@mui/material/IconButton";
import Iconify from "../../../../../components/iconify";
import Button from "@mui/material/Button";
import style from "./style.module.css";
import Box from "@mui/material/Box";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function PocInfoForm() {
  const [open, setOpen] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [name, setName] = React.useState("");
  const [openListAccount, setOpenListAccount] = React.useState(false);
  const handleClickGenerateCode = () => {
    setCode("test");
  };

  const handleMouseDownGenerateCode = (event) => {
    event.preventDefault();
  };

  const handleOpenListAccount = () => {
    setOpenListAccount(true);
  };

  const handleCloseListAccount = () => {
    setOpenListAccount(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Thông tin POC</DialogTitle>
              <DialogContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="eventName"
                      name="eventName"
                      label="Tên sự kiện"
                      fullWidth
                      autoComplete="event-name"
                      variant="standard"
                      // helperText={
                      //   name.length === 0 && checkName === 0
                      //     ? "Tên không được để trống"
                      //     : ""
                      // }
                      onChange={(e) => setName(e.target.value)}
                      // onClick={() => setCheckName(0)}
                      // error={name.length === 0 && checkName === 0 ? true : false}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="eventCode"
                      name="eventCode"
                      label="Mã sự kiện"
                      fullWidth
                      autoComplete="event-code"
                      variant="standard"
                      helperText="Chọn để tạo mã ngẫu nhiên"
                      value={code}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickGenerateCode}
                              onMouseDown={handleMouseDownGenerateCode}
                              edge="end"
                              sx={{ marginRight: "0" }}
                            >
                              <Iconify
                                icon={"carbon:operations-record"}
                              ></Iconify>
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="eventName"
                      name="eventName"
                      label="Tên sự kiện"
                      fullWidth
                      autoComplete="event-name"
                      variant="standard"
                      // helperText={
                      //   name.length === 0 && checkName === 0
                      //     ? "Tên không được để trống"
                      //     : ""
                      // }
                      onChange={(e) => setName(e.target.value)}
                      // onClick={() => setCheckName(0)}
                      // error={name.length === 0 && checkName === 0 ? true : false}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <TextField
                      required
                      id="account"
                      name="account"
                      label="Tài khoản phụ trách"
                      fullWidth
                      autoComplete="event-code"
                      variant="standard"
                      helperText="Chọn để tạo mã ngẫu nhiên"
                      value={code}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickGenerateCode}
                              onMouseDown={handleMouseDownGenerateCode}
                              edge="end"
                              sx={{ marginRight: "0" }}
                            >
                              <Iconify
                                icon={"carbon:operations-record"}
                              ></Iconify>
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    /> */}
                    <Typography variant="body">Tài khoản phụ trách</Typography>
                    <Button variant="outlined" onClick={handleOpenListAccount}>
                      Chọn tài khoản
                    </Button>
                    <Dialog
                      open={openListAccount}
                      onClose={handleCloseListAccount}
                      fullWidth={true}
                      maxWidth={"sm"}
                    >
                      <DialogTitle>Thông tin POC</DialogTitle>
                      <DialogContent></DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Subscribe</Button>
                      </DialogActions>
                    </Dialog>
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
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Subscribe</Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
