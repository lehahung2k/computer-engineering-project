import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "./HomeEvent.css";
// import { WebcamCapture } from "../Webcam";

// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import CssBaseline from "@mui/material/CssBaseline";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import HomeIcon from "@mui/icons-material/Home";
// import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
// import FactCheckIcon from "@mui/icons-material/FactCheck";
import SideBar from "../navigation";
import Webcam from "react-webcam";


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
  const [capture, setCapture] = React.useState("hello");
  const [image,setImage]=React.useState('');
  const webcamRef = React.useRef(null);
  const [deviceId, setDeviceId] = React.useState();
  const [devices, setDevices] = React.useState([]);
  const [captureState, setCaptureState] = React.useState(capture['capture']);
  const [clientId, setClientId] = React.useState();
  const [clientDescription, setClientDescription] = React.useState();
  const [checkinTime, setCheckinTime] = React.useState();
  const [listClientCheckin, setListClientCheckin] = React.useState({clients:[]});
  const [error, setError] = React.useState();


  console.log('capture state',capture);

  const videoConstraints = (deviceId==="")?{
      width: 220,
      height: 200,
      facingMode: "user"
  }:{
      width: 220,
      height: 200,
      facingMode: "user",
      deviceId: deviceId
  };

  const handleDevices = React.useCallback(
      mediaDevices =>
        setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
      [setDevices]
    );
  
  React.useEffect(
      () => {
        navigator.mediaDevices.enumerateDevices().then(handleDevices);
      },
      [handleDevices]
    );


  
  fetch(`http://localhost:4000/client_checkin`)
    .then((data) => data.json())
    .then(setListClientCheckin)
    .then(console.log("List client checkin"))
    .then(console.log(listClientCheckin))
    .catch(console.error);
  
  
  const captureCamera = React.useCallback(
      () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc)
      });
  
  const handleSubmitForm = (e)=>{
    const clientId = '';
    const clientDescription = '';

  }

  return (
    <div>
      <Grid container spacing={0}>
        <Grid xs="auto">
          <div>
            <SideBar id="1"></SideBar>
          </div>
        </Grid>
        <Grid xs>
          <div id="header" color="blue">
            <h3>Trang quản lý sự kiện {capture}</h3>
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
                <div className="poc-cam">
                  <div className="webcam-container">
                    <div className="webcam-img">
                      {image == "" ? (
                        <Webcam
                          audio={false}
                          height={200}
                          ref={webcamRef}
                          screenshotFormat="image/jpeg"
                          width={220}
                          videoConstraints={videoConstraints}
                        />
                      ) : (
                        <img src={image} />
                      )}
                      {image == "" ? <div></div> : console.log(image)}
                    </div>
                    <div>
                      {image != "" ? (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setImage("");
                          }}
                          className="webcam-btn"
                        >
                          Retake Image
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            captureCamera();
                          }}
                          className="webcam-btn"
                        >
                          Capture
                        </button>
                      )}
                    </div>
                    <div>
                      <select
                        id="device-selection"
                        onChange={(e) => setDeviceId(e.target.value)}
                      >
                        {devices.map((device, key) => (
                          <option>
                            {/* <Webcam audio={false} videoConstraints={{ deviceId: device.deviceId }} /> */}
                            {device.label || `Device ${key + 1}`}
                          </option>
                        ))}
                      </select>

                      {/* <p id="demo">Hello 'device-selection'</p>
{deviceId===null?console.log('empty device'):(<p>{deviceId}</p>)} */}
                    </div>
                  </div>
                </div>
              </Grid>

              <Grid item xs={4}>
                <div className="poc-cam">
                  <div className="webcam-container">
                    <div className="webcam-img">
                      {image == "" ? (
                        <Webcam
                          audio={false}
                          height={200}
                          ref={webcamRef}
                          screenshotFormat="image/jpeg"
                          width={220}
                          videoConstraints={videoConstraints}
                        />
                      ) : (
                        <img src={image} />
                      )}
                      {image == "" ? <div></div> : console.log(image)}
                    </div>
                    <div>
                      {image != "" ? (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setImage("");
                          }}
                          className="webcam-btn"
                        >
                          Retake Image
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            captureCamera();
                          }}
                          className="webcam-btn"
                        >
                          Capture
                        </button>
                      )}
                    </div>
                    <div>
                      <select
                        id="device-selection"
                        onChange={(e) => setDeviceId(e.target.value)}
                      >
                        {devices.map((device, key) => (
                          <option>
                            {/* <Webcam audio={false} videoConstraints={{ deviceId: device.deviceId }} /> */}
                            {device.label || `Device ${key + 1}`}
                          </option>
                        ))}
                      </select>

                      {/* <p id="demo">Hello 'device-selection'</p>
{deviceId===null?console.log('empty device'):(<p>{deviceId}</p>)} */}
                    </div>
                  </div>
                </div>
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
                          captureCamera();
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
                  <button
                    type="submit"
                    form="check-in-info-form"
                    value="Submit"
                  >
                    Submit
                  </button>
                </div>
              </Grid>
            </Grid>
          </div>
          <Divider />
          <div id="check-in-table-label">
            <h3>Xem danh sách check-in</h3>
          </div>

          <div id="check-in-list">
            <TableContainer
              component={Paper}
              id="check-in-table"
              style={{ height: 200 }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead id="check-in-TableHead">
                  <TableRow>
                    <TableCell>Thời điểm</TableCell>
                    <TableCell>Mã số sinh viên</TableCell>
                    <TableCell>Ghi chú</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listClientCheckin.clients.map((client) => (
                    <TableRow
                      key={client.client_id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {client.client_id}
                      </TableCell>
                      <TableCell>{client.client_code}</TableCell>
                      <TableCell>{client.client_description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
