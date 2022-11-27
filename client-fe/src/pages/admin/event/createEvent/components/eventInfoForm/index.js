import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import Iconify from "../../../../../../components/iconify";
import {
  newCodeEventAction,
  newEventAction,
  newNameEventAction,
  newNoteEventAction,
  newStartEventAction,
  newEndEventAction,
  newMapEventAction,
  newTenantEventAction,
} from "../../../../../../services/redux/actions/event/event";
import style from "./style.module.css";
import Autocomplete from "@mui/material/Autocomplete";
import { eventCodeGenerator } from "../../../../../../services/hashFunction";
const rowsCompany = [
  { label: "Doanh nghiệp 01", tenantCode: "bka" },
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
export default function EventInfoForm() {
  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));
  const [name, setName] = React.useState("");
  const [checkName, setCheckName] = React.useState(1);
  const [code, setCode] = React.useState("");

  const dispatch = useDispatch();
  let tenantName = "";
  // if (sessionStorage.getItem("role") === "0") {
  //   tenantName = "This is test";
  // }
  const listTenant = useSelector((state) => state.tenantState.listTenant);
  const listSelectTenant = listTenant.map((tenant) => ({
    label: tenant.name,
    id: tenant.id,
  }));
  const startTime = useSelector((state) => state.eventState.event.start);
  const endTime = useSelector((state) => state.eventState.event.end);
  const eventImage = useSelector((state) => state.eventState.event.map);
  const eventCode = useSelector((state) => state.eventState.event.code);
  const eventName = useSelector((state) => state.eventState.event.name);
  const handleClickGenerateCode = () => {
    const today = new Date();
    const time = today.getTime().toString();
    const newCode = eventCodeGenerator([tenantName, eventName, time]);
    dispatch(newCodeEventAction(newCode));
  };

  const handleMouseDownGenerateCode = (event) => {
    event.preventDefault();
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleUploadImage = async (e) => {
    if (e.target.files.length > 0) {
      let mapImageFile = e.target.files[0];
      const base64EventImage = await convertBase64(mapImageFile);
      dispatch(newMapEventAction(base64EventImage));
    }
  };

  const handleRemoveMapImage = () => {
    dispatch(newMapEventAction(""));
  };

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleChangeTenantEvent = (value) => {
    dispatch(newTenantEventAction({ name: value.label, id: value.id }));
  };
  return (
    <React.Fragment>
      <Typography variant="h6" align="left">
        Thông tin sự kiện
      </Typography>
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
            // helperText={
            //   name.length === 0 && checkName === 0
            //     ? "Tên không được để trống"
            //     : ""
            // }
            onChange={(e) => dispatch(newNameEventAction(e.target.value))}
            // onClick={() => setCheckName(0)}
            // error={name.length === 0 && checkName === 0 ? true : false}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {tenantName ? (
            <TextField
              required
              id="tenantName"
              name="tenantName"
              label="Ban tổ chức"
              fullWidth
              autoComplete="tenant-name"
              variant="standard"
              value={tenantName}
              InputLabelProps={{ shrink: true }}
            />
          ) : (
            <Autocomplete
              disablePortal
              noOptionsText={"Không tìm thấy tổ chức"}
              id="combo-box-demo"
              options={listSelectTenant}
              // sx={{ width: 300 }}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              ListboxProps={{ style: { maxHeight: 150 } }}
              onChange={(event, value) => handleChangeTenantEvent(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Ban tổ chức"
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                  required
                />
              )}
            />
          )}
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
            value={eventCode}
            // onChange={(e) => dispatch(newCodeEventAction(e.target.value))}
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
                    <Iconify icon={"carbon:operations-record"}></Iconify>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Thời gian bắt đầu"
              value={startTime}
              onChange={(newValue) => dispatch(newStartEventAction(newValue))}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Thời gian kết thúc"
              value={endTime}
              onChange={(newValue) => dispatch(newEndEventAction(newValue))}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </LocalizationProvider>
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
            onChange={(e) => dispatch(newNoteEventAction(e.target.value))}
          />
        </Grid>

        <div className={style.map}>
          <div className={style.map__upload_button}>
            <Button variant="contained" component="label">
              Chọn ảnh tải lên
              <input
                type="file"
                id="file-upload-img"
                accept="image/*"
                onChange={handleUploadImage}
                hidden
              />
            </Button>

            <Button
              variant="outlined"
              component="label"
              onClick={() => handleRemoveMapImage()}
            >
              Bỏ ảnh
            </Button>
          </div>
          {eventImage === "" ? (
            <></>
          ) : (
            <img
              className={style.map__image}
              alt="Map preview"
              src={eventImage}
            />
          )}
        </div>
      </Grid>
    </React.Fragment>
  );
}
