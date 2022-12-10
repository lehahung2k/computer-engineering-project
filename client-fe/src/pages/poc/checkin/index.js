import * as React from "react";
import Grid from "@mui/material/Grid";
import "./HomeEvent.css";
import checkinApi from "../../../api/CheckinAPI";
import Webcam from "react-webcam";
import moment from "moment";
import WebCam from "./components/webcam";
import Button from "@mui/material/Button";

export default function Checkin() {
  const [capture, setCapture] = React.useState("hello");
  const [image1, setImage1] = React.useState("");
  const [image2, setImage2] = React.useState("");
  const childRef1 = React.useRef();
  const childRef2 = React.useRef();

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
    const clientId = document.querySelector("#student-id");
    const clientDescription = document.querySelector("#check-in-note");
    const params = {
      pointCode: "nT8q",
      guestCode: 1,
      createTime: moment().format(),
      note: clientDescription.value,
    };
    console.log(params);

    const responseAddNewCheckinClient = checkinApi.addNewCheckinClient(
      params,
      sessionStorage.getItem("accessToken")
    );

    responseAddNewCheckinClient
      .then((response) => {
        alert("Khách checkin thành công");
        setImage1("");
        setImage2("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Grid container spacing={0}>
        <Grid xs>
          <div id="header" color="blue">
            <h3>Checkin sự kiện </h3>
          </div>

          <div id="poc-info">
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <div id="event-name-label">Tên sự kiện</div>
              </Grid>

              <Grid item xs={4}>
                <div id="event-name-value">Tên sự kiện</div>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={3}>
                <div id="poc-name-label">Tên quầy</div>{" "}
              </Grid>

              <Grid item xs={4}>
                <div id="poc-name-value">Tên quầy</div>{" "}
              </Grid>
            </Grid>
          </div>

          <div id="check-in">
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <WebCam
                  image={image1}
                  camId={1}
                  captureImage={handleImageWebCam}
                  ref={childRef1}
                />
              </Grid>

              <Grid item xs={4}>
                <WebCam
                  image={image2}
                  camId={2}
                  captureImage={handleImageWebCam}
                  ref={childRef2}
                />
              </Grid>

              <Grid item xs={4} id="check-in-info">
                <div id="check-in-info-div">
                  <form id="check-in-info-form">
                    <label>Mã số sinh viên</label>
                    <br />
                    <input
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
                    ></input>
                    <br />

                    <label>Ghi chú</label>
                    <br />
                    <textarea
                      type="text"
                      id="check-in-note"
                      name="check-in-note"
                    ></textarea>
                    <br />
                  </form>
                  <Button variant="contained" onClick={handleSubmitForm}>
                    Submit
                  </Button>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
