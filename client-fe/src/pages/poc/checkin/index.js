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
import { fetchListEventByUsername } from "../../../services/redux/actions/event/fetchListEvent";
import { fetchPocInfo } from "../../../services/redux/actions/poc/fetchListPoc";
import { newEventAction } from "../../../services/redux/actions/event/event";
import pocApi from "../../../api/PocApi";
import AlertResponse from "./components/alert";
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
  const [loadingPocInfo, setLoadingPocInfo] = React.useState(true);
  const [loadingCheckin, setLoadingCheckin] = React.useState(false);
  const childRef1 = React.useRef();
  const childRef2 = React.useRef();

  const eventInfo = useSelector((state) => state.eventState.event);
  const pocInfo = useSelector((state) => state.pocState.poc);
  const tenant = useSelector((state) => state.tenantState.tenant);
  const listEvent = useSelector((state) => state.eventState.listEvents);
  const loadingListEvent = useSelector((state) => state.eventState.loading);
  const successListEvent = useSelector((state) => state.eventState.success);
  const failureListEvent = useSelector((state) => state.eventState.failure);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(fetchListEventByUsername());
  }, []);

  // if (!loadingListEvent && successListEvent) {
  //   if (listEvent.length === 0) {
  //     alert("Không có sự kiện nào đang diễn ra 0001");
  //     navigate("/poc/event");
  //   } else {
  //     console.log("Fetch poc info");
  //     const compareTime = (startTime, endTime) => {
  //       const currentTime = new Date();
  //       if (
  //         Date.parse(startTime) <= Date.parse(currentTime) &&
  //         Date.parse(endTime) >= Date.parse(currentTime)
  //       ) {
  //         return true;
  //       }
  //       return false;
  //     };
  //     const currentEvent = listEvent.find((event) =>
  //       compareTime(event.startTime, event.endTime)
  //     );
  //     if (currentEvent) {
  //       dispatch(newEventAction(currentEvent));
  //       dispatch(fetchPocInfo(currentEvent.eventCode));
  //     } else {
  //       alert("Không có sự kiện nào đang diễn ra");
  //       navigate("/poc/event");
  //     }
  //   }
  // } else if (!loadingListEvent && failureListEvent) {
  //   alert("Không thể tải thông tin sự kiện");
  //   navigate("/poc/event");
  // }

  const handleImageWebCam = (image, camId) => {
    if (camId === 1) setImage1(image);
    else setImage2(image);
  };

  const handleSubmitForm = (e) => {
    const params = {
      pointCode: pocInfo.pointCode,
      guestCode: guestCode,
      createTime: moment().format(),
      note: note + name,
      enable: true,
      checkinImg1: enableImage === "on" ? image1 : "",
      checkinImg2: enableImage === "on" ? image2 : "",
      identityType: identityType,
    };
    console.log(params);

    const responseAddNewCheckin = checkinApi.addNewCheckin(
      params,
      sessionStorage.getItem("accessToken")
    );

    responseAddNewCheckin
      .then((response) => {
        alert("Khách checkin thành công");
        setImage1("");
        setImage2("");
      })
      .catch((error) => {
        console.log(error);
      });

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
                <div id="event-name-value">
                  {eventInfo ? eventInfo.eventName : "Tên sự kiện"}
                </div>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={4} lg={2}>
                <div id="poc-name-label">Tên quầy</div>{" "}
              </Grid>

              <Grid item xs={8} lg={8}>
                <div id="poc-name-value">
                  {pocInfo ? pocInfo.pointName : "Tên quầy"}
                </div>{" "}
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
                    <Grid item xs={12}>
                      <TextField
                        inputProps={{ autoFocus: true }}
                        id="identity_code"
                        label="Mã số định danh"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        // defaultValue={guestCode}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            console.log("Enter key pressed");
                            e.preventDefault();
                            childRef1.current.captureCamera();
                            childRef2.current.captureCamera();
                          }
                        }}
                        key={refresh}
                        onChange={(e) => setGuestCode(e.target.value)}
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
                        key={refresh}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <Autocomplete
                        disablePortal
                        noOptionsText={"Không tìm thấy tổ chức"}
                        id="combo-box-demo"
                        options={[
                          { label: "Thẻ sự kiện", id: "1" },
                          { label: "Khác", id: "0" },
                        ]}
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
                        onChange={(event, value) =>
                          setIdentityType(value.label)
                        }
                        key={refresh}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <Checkbox
                        color="primary"
                        onChange={(e) => setEnableImage(e.target.value)}
                        key={refresh}
                      />
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
                        onChange={(e) => setNote(e.target.value)}
                        key={refresh}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        onClick={handleSubmitForm}
                        style={{ textTransform: "none" }}
                        key={refresh}
                      >
                        Submit
                      </Button>{" "}
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>

      <AlertResponse />
    </div>
  );
}
