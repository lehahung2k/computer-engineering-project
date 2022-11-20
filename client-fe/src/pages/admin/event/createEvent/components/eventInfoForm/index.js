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
import Iconify from "../../../../../../components/iconify";
import Button from "@mui/material/Button";
import style from "./style.module.css";
import {
  newEvent,
  newNameEvent,
  newCodeEvent,
  newStartEvent,
  newEndEvent,
  newNoteEvent,
  newMapEvent,
} from "../../../../../../services/redux/actions/event/event.js";
import Autocomplete from "@mui/material/Autocomplete";
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
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const imgFile = React.useRef("");
  const baseImage = React.useRef("");
  const [mapImage, setMapImage] = React.useState("");

  const handleClickGenerateCode = () => {
    setCode("test");
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
      let src = URL.createObjectURL(mapImageFile);
      setMapImage(src);
      baseImage.current = await convertBase64(imgFile.current);
      console.log(baseImage);
    }
  };

  const handleRemoveMapImage = () => {
    setMapImage("");
  };

  const handleChange = (newValue) => {
    setValue(newValue);
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
            onChange={(e) => setName(e.target.value)}
            // onClick={() => setCheckName(0)}
            // error={name.length === 0 && checkName === 0 ? true : false}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            noOptionsText={"Không tìm thấy doanh nghiệp"}
            id="combo-box-demo"
            options={rowsCompany}
            // sx={{ width: 300 }}
            ListboxProps={{ style: { maxHeight: 150 } }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Doanh nghiệp phụ trách"
                variant="standard"
                InputLabelProps={{ shrink: true }}
                required
              />
            )}
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
              value={value}
              onChange={handleChange}
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
              value={value}
              onChange={handleChange}
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
          {mapImage === "" ? (
            <></>
          ) : (
            <img
              className={style.map__image}
              alt="Map preview"
              src={mapImage}
            />
          )}
        </div>
      </Grid>
    </React.Fragment>
  );
}
