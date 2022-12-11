import * as React from "react";
import Grid from "@mui/material/Grid";
import "./HomeEvent.css";
import checkinApi from "../../../api/CheckinAPI";
import Webcam from "react-webcam";
import moment from "moment";
import WebCam from "./components/webcam";
import Button from "@mui/material/Button";
import style from "./style.module.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

export default function Checkin() {
  const [capture, setCapture] = React.useState("hello");
  const [image1, setImage1] = React.useState("");
  const [image2, setImage2] = React.useState("");
  const [guestCode, setGuestCode] = React.useState("");
  const [refresh, setRefresh] = React.useState(0);
  const [name, setName] = React.useState("");
  const [identityType, setIdentityType] = React.useState("");
  const [enableImage, setEnableImage] = React.useState(false);
  const [note, setNote] = React.useState("");

  const childRef1 = React.useRef();
  const childRef2 = React.useRef();

  const tenant = useSelector((state) => state.tenantState.tenant);

  // const webcamRef1 = React.useRef(null);
  // const webcamRef2 = React.useRef(null);
  // const [deviceId, setDeviceId] = React.useState();
  // const [devices, setDevices] = React.useState([]);
  // const [captureState, setCaptureState] = React.useState(capture["capture"]);
  // const [clientId, setClientId] = React.useState();
  // const [clientDescription, setClientDescription] = React.useState();
  // const [checkinTime, setCheckinTime] = React.useState();
  // const [error, setError] = React.useState();
  // const [newCheckin, setNewCheckin] = React.useState(false);

  const handleImageWebCam = (image, camId) => {
    if (camId === 1) setImage1(image);
    else setImage2(image);
  };

  const handleSubmitForm = (e) => {
    // const clientId = document.querySelector("#student-id");
    // const clientDescription = document.querySelector("#check-in-note");
    // const params = {
    //   pointCode: "nT8q",
    //   guestCode: 1,
    //   createTime: moment().format(),
    //   note: clientDescription.value,
    // };
    // console.log(params);

    // const responseAddNewCheckinClient = checkinApi.addNewCheckinClient(
    //   params,
    //   sessionStorage.getItem("accessToken")
    // );

    // responseAddNewCheckinClient
    //   .then((response) => {
    //     alert("Khách checkin thành công");
    // setImage1("");
    // setImage2("");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // navigate(0);
    setRefresh((refresh) => refresh + 1);
  };
  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs>
          <div id="header" color="blue">
            <h3>Checkin sự kiện </h3>
          </div>

          <div id="poc-info">
            <Grid container spacing={2}>
              <Grid item xs={4} lg={2}>
                <div id="event-name-label">Tên sự kiện</div>
              </Grid>

              <Grid item xs={8} lg={8}>
                <div id="event-name-value">Tên sự kiện</div>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={4} lg={2}>
                <div id="poc-name-label">Tên quầy</div>{" "}
              </Grid>

              <Grid item xs={8} lg={8}>
                <div id="poc-name-value">Tên quầy</div>{" "}
              </Grid>
            </Grid>
          </div>

          <div id="check-in">
            <Grid container spacing={2}>
              <Grid item xs={6} md={6} lg={4}>
                <WebCam
                  image={image1}
                  camId={1}
                  captureImage={handleImageWebCam}
                  ref={childRef1}
                />
              </Grid>

              <Grid item xs={6} md={6} lg={4}>
                <WebCam
                  image={image2}
                  camId={2}
                  captureImage={handleImageWebCam}
                  ref={childRef2}
                />
              </Grid>

              <Grid item xs={12} md={12} lg={4}>
                <div className={style.check_in_info}>
                  <Grid container spacing={2}>
                    {/* <div id="check-in-info-div">
                  <form id="check-in-info-form">
                    <br /> */}
                    {/* <input
                      type="text"
                      id="student-id"
                      name="student-id"
                      autofocus="true"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          console.log("Enter");
                          e.preventDefault();
                          childRef1.current.captureCamera();
                          childRef2.current.captureCamera();
                        }
                      }}
                      key={refresh}
                    ></input> */}
                    <Grid item xs={12}>
                      <TextField
                        inputProps={{ autoFocus: true }}
                        id="identity_code"
                        label="Mã số định danh"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        defaultValue={guestCode}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            console.log("Enter key pressed");
                            e.preventDefault();
                            childRef1.current.captureCamera();
                            childRef2.current.captureCamera();
                          }
                        }}
                        key={refresh}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <br />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="full_name"
                        label="Họ và tên"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <Autocomplete
                        disablePortal
                        noOptionsText={"Không tìm thấy tổ chức"}
                        id="combo-box-demo"
                        options={[
                          { label: "Thẻ sinh viên" },
                          { label: "CMND/CCCD" },
                          { label: "Khác" },
                        ]}
                        // sx={{ width: 300 }}
                        // isOptionEqualToValue={(option, value) => option.id === value.id}
                        ListboxProps={{ style: { maxHeight: 150 } }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Loại thẻ định danh"
                            variant="standard"
                            InputLabelProps={{ shrink: true }}
                            required
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <Checkbox color="primary" />
                      Cho phép ảnh
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
                    {/* <label>Họ và tên</label>
                    <br />
                    <input type="text" id="name" name="name"></input>
                    <br />
                    <div className={style.checkin_form_option}>
                      <div class="custom-select">
                        <label for="identity_type">
                          Chọn loại thẻ định danh:
                        </label>
                        <select id="identity_type">
                          <option value="0">Thẻ sinh viên</option>
                          <option value="1">CMND/CCCD</option>
                          <option value="2">Khác</option>
                        </select>
                      </div>

                      <div class="enable_image-check">
                        <input
                          type="checkbox"
                          name="enable_image"
                          value="enable"
                          id="enable_image"
                          style={{ width: "20px", height: "20spx" }}
                        />
                        <label for="enable_image">Cho phép ảnh</label>
                        <br />
                      </div>
                    </div>
                    <br />
                    <label>Ghi chú</label>
                    <br />
                    <textarea
                      type="text"
                      id="check-in-note"
                      name="check-in-note"
                    ></textarea>
                    <br /> */}
                    {/* </form> */}
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        onClick={handleSubmitForm}
                        style={{ textTransform: "none" }}
                      >
                        Submit
                      </Button>{" "}
                    </Grid>
                    {/* </div> */}
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
