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
import {
  fetchListTenant,
  fetchTenantInfo,
} from "../../../../../../services/redux/actions/tenant/fetchListTenant";

export default function EventInfoForm() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchListTenant());
  }, []);
  const tenantInfo = useSelector((state) => state.tenantState.tenant);
  const listTenant = useSelector((state) => state.tenantState.listTenant);
  const listSelectTenant = listTenant.map((tenant) => ({
    label: tenant.tenantName,
    id: tenant.id,
    tenantCode: tenant.tenantCode,
  }));
  const tenantCode = useSelector((state) => state.eventState.event.tenantCode);

  let selectedTenant = null;
  if (tenantCode) {
    selectedTenant = listSelectTenant.filter(
      (tenant) => tenant.tenantCode === tenantCode
    )[0];
  }

  const startTime = useSelector((state) => state.eventState.event.startTime);
  const endTime = useSelector((state) => state.eventState.event.endTime);
  const eventImage = useSelector((state) => state.eventState.event.eventImg);
  const eventCode = useSelector((state) => state.eventState.event.eventCode);
  const eventName = useSelector((state) => state.eventState.event.eventName);
  const eventNote = useSelector(
    (state) => state.eventState.event.eventDescription
  );
  const eventInfo = useSelector((state) => state.eventState.event);
  const handleClickGenerateCode = () => {
    const today = new Date();
    const time = today.getTime().toString();
    const newCode = selectedTenant
      ? eventCodeGenerator([selectedTenant, eventName, time])
      : eventCodeGenerator(["", eventName, time]);
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

  const handleChangeTenantEvent = (value) => {
    dispatch(
      newTenantEventAction(
        //   {
        //   name: value.label,
        //   id: value.id,
        //   tenantCode: value.tenantCode,
        // }
        value.tenantCode
      )
    );
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
            defaultValue={eventName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            noOptionsText={"Không tìm thấy tổ chức"}
            id="combo-box-demo"
            options={listSelectTenant}
            // sx={{ width: 300 }}
            // isOptionEqualToValue={(option, value) => option.id === value.id}
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
            defaultValue={
              selectedTenant
                ? {
                    label: selectedTenant.label,
                    id: selectedTenant.id,
                    tenantCode: selectedTenant.tenantCode,
                  }
                : null
            }
          />
          {/* )} */}
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
              onChange={(newValue) => {
                // console.log("new start", newValue);
                dispatch(newStartEventAction(newValue));
              }}
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
            defaultValue={eventNote}
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
