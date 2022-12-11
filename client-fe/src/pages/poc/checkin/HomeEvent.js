// import * as React from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import Grid from "@mui/material/Grid";
// import "./HomeEvent.css";
// import checkinApi from "../../api/CheckinAPI";
// import Divider from "@mui/material/Divider";
// import SideBar from "../navigation";
// import Webcam from "react-webcam";
// import moment from "moment";

// export default function BasicTable() {
//   const [capture, setCapture] = React.useState("hello");
//   const [image1, setImage1] = React.useState("");
//   const [image2, setImage2] = React.useState("");

//   const webcamRef1 = React.useRef(null);
//   const webcamRef2 = React.useRef(null);
//   const [deviceId, setDeviceId] = React.useState();
//   const [devices, setDevices] = React.useState([]);
//   const [captureState, setCaptureState] = React.useState(capture["capture"]);
//   const [clientId, setClientId] = React.useState();
//   const [clientDescription, setClientDescription] = React.useState();
//   const [checkinTime, setCheckinTime] = React.useState();
//   const [listClientCheckin, setListClientCheckin] = React.useState([]);
//   const [error, setError] = React.useState();
//   const [newCheckin, setNewCheckin] = React.useState(false);

//   React.useEffect(() => {
//     const response = checkinApi.getALLCheckinClient();
//     response
//       .then((response) => {
//         const newList = [];
//         console.log(response.data)
//         response.data.map((data) => {
//           const tmp = {};
//           tmp.note = data.note;
//           tmp.client_id = data.client_id;
//           tmp.create_time = moment(data.create_time).format('DD-MM-YYYY HH:mm:ss');
//           newList.push(tmp);
//         });
//         setListClientCheckin(newList);
//       })
//       .catch((error) => console.log(error));

//     setNewCheckin(false);
//   }, [newCheckin]);

//   console.log("capture state", capture);

//   const videoConstraints =
//     deviceId === ""
//       ? {
//           width: 220,
//           height: 200,
//           facingMode: "user",
//         }
//       : {
//           width: 220,
//           height: 200,
//           facingMode: "user",
//           deviceId: deviceId,
//         };

//   const handleDevices = React.useCallback(
//     (mediaDevices) =>
//       setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
//     [setDevices]
//   );

//   React.useEffect(() => {
//     navigator.mediaDevices.enumerateDevices().then(handleDevices);
//   }, [handleDevices]);

//   const captureCamera1 = React.useCallback(() => {
//     const imageSrc = webcamRef1.current.getScreenshot();
//     console.log(webcamRef1.current);
//     console.log(imageSrc);
//     setImage1(imageSrc);
//   });

//   const captureCamera2 = React.useCallback(() => {
//     const imageSrc = webcamRef2.current.getScreenshot();
//     console.log(webcamRef2.current);
//     console.log(imageSrc);
//     setImage2(imageSrc);
//   });

//   const handleSubmitForm = (e) => {
//     const clientId = document.querySelector("#student-id");
//     const clientDescription = document.querySelector("#check-in-note");

//     const params = {
//       event_id: 1,
//       client_id: clientId.value,
//       create_time: moment().format(),
//       note: clientDescription.value,
//     };

//     const responseAddNewCheckinClient = checkinApi.addNewCheckinClient(
//       params,
//       sessionStorage.getItem("accessToken")
//     );

//     responseAddNewCheckinClient
//       .then((response) => {
//         alert("Khách checkin thành công");
//         setNewCheckin(true);
//         setImage1('');
//         setImage2('');
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   return (
//     <div>
//       <Grid container spacing={0}>
//         <Grid xs="auto">
//           <div>
//             <SideBar id="1"></SideBar>
//           </div>
//         </Grid>
//         <Grid xs>
//           <div id="header" color="blue">
//             <h3>Trang quản lý sự kiện </h3>
//             {!sessionStorage.getItem("accessToken") && (
//               <>
//                 <div>
//                   <button>
//                     <a href="/login">Đăng nhập</a>
//                   </button>
//                   <button>
//                     <a href="/register">Đăng ký</a>
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>

//           <div id="poc-info">
//             <Grid container spacing={2}>
//               <Grid item xs={3}>
//                 <div id="event-name-label">Tên sự kiện</div>
//               </Grid>

//               <Grid item xs={4}>
//                 <div id="event-name-value">Tên sự kiện</div>
//               </Grid>
//             </Grid>

//             <Grid container spacing={2}>
//               <Grid item xs={3}>
//                 <div id="poc-name-label">Tên quầy</div>{" "}
//               </Grid>

//               <Grid item xs={4}>
//                 <div id="poc-name-value">Tên quầy</div>{" "}
//               </Grid>
//             </Grid>
//           </div>

//           <div id="check-in">
//             <Grid container spacing={2}>
//               <Grid item xs={4}>
//                 <div className="poc-cam">
//                   <div className="webcam-container">
//                     <div className="webcam-img">
//                       {image1 == "" ? (
//                         <Webcam
//                           audio={false}
//                           height={200}
//                           ref={webcamRef1}
//                           screenshotFormat="image/jpeg"
//                           width={220}
//                           videoConstraints={videoConstraints}
//                         />
//                       ) : (
//                         <img src={image1} />
//                       )}
//                       {image1 == "" ? <div></div> : console.log(image1)}
//                     </div>
//                     <div>
//                       {image1 != "" ? (
//                         <button
//                           onClick={(e) => {
//                             e.preventDefault();
//                             setImage1("");
//                           }}
//                           className="webcam-btn"
//                         >
//                           Retake Image
//                         </button>
//                       ) : (
//                         <button
//                           onClick={(e) => {
//                             e.preventDefault();
//                             captureCamera1();
//                           }}
//                           className="webcam-btn"
//                         >
//                           Capture
//                         </button>
//                       )}
//                     </div>
//                     <div>
//                       <select
//                         id="device-selection"
//                         onChange={(e) => setDeviceId(e.target.value)}
//                       >
//                         {devices.map((device, key) => (
//                           <option>
//                             {/* <Webcam audio={false} videoConstraints={{ deviceId: device.deviceId }} /> */}
//                             {device.label || `Device ${key + 1}`}
//                           </option>
//                         ))}
//                       </select>

//                       {/* <p id="demo">Hello 'device-selection'</p>
// {deviceId===null?console.log('empty device'):(<p>{deviceId}</p>)} */}
//                     </div>
//                   </div>
//                 </div>
//               </Grid>

//               <Grid item xs={4}>
//                 <div className="poc-cam">
//                   <div className="webcam-container">
//                     <div className="webcam-img">
//                       {image2 == "" ? (
//                         <Webcam
//                           audio={false}
//                           height={200}
//                           ref={webcamRef2}
//                           screenshotFormat="image/jpeg"
//                           width={220}
//                           videoConstraints={videoConstraints}
//                         />
//                       ) : (
//                         <img src={image2} />
//                       )}
//                       {image2 == "" ? <div></div> : console.log(image2)}
//                     </div>
//                     <div>
//                       {image2 != "" ? (
//                         <button
//                           onClick={(e) => {
//                             e.preventDefault();
//                             setImage2("");
//                           }}
//                           className="webcam-btn"
//                         >
//                           Retake Image
//                         </button>
//                       ) : (
//                         <button
//                           onClick={(e) => {
//                             e.preventDefault();
//                             captureCamera2();
//                           }}
//                           className="webcam-btn"
//                         >
//                           Capture
//                         </button>
//                       )}
//                     </div>
//                     <div>
//                       <select
//                         id="device-selection"
//                         onChange={(e) => setDeviceId(e.target.value)}
//                       >
//                         {devices.map((device, key) => (
//                           <option>
//                             {/* <Webcam audio={false} videoConstraints={{ deviceId: device.deviceId }} /> */}
//                             {device.label || `Device ${key + 1}`}
//                           </option>
//                         ))}
//                       </select>

//                       {/* <p id="demo">Hello 'device-selection'</p>
// {deviceId===null?console.log('empty device'):(<p>{deviceId}</p>)} */}
//                     </div>
//                   </div>
//                 </div>
//               </Grid>

//               <Grid item xs={4} id="check-in-info">
//                 <div id="check-in-info-div">
//                   <form id="check-in-info-form">
//                     <label>Mã số sinh viên</label>
//                     <br />
//                     <input
//                       type="text"
//                       id="student-id"
//                       name="student-id"
//                       autofocus="true"
//                       onKeyPress={(e) => {
//                         if (e.key === "Enter") {
//                           console.log("Enter");
//                           e.preventDefault();
//                           captureCamera1();
//                           captureCamera2();
//                         }
//                       }}
//                     ></input>
//                     <br />

//                     <label>Ghi chú</label>
//                     <br />
//                     <textarea
//                       type="text"
//                       id="check-in-note"
//                       name="check-in-note"
//                     ></textarea>
//                     <br />
//                   </form>
//                   <button onClick={handleSubmitForm}>Submit</button>
//                 </div>
//               </Grid>
//             </Grid>
//           </div>
//           <Divider />
//           <div id="check-in-table-label">
//             <h3>Xem danh sách check-in</h3>
//           </div>

//           <div id="check-in-list">
//             <TableContainer
//               component={Paper}
//               id="check-in-table"
//               style={{ height: 200 }}
//             >
//               <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                 <TableHead id="check-in-TableHead">
//                   <TableRow>
//                     <TableCell>Thời điểm</TableCell>
//                     <TableCell>Mã số sinh viên</TableCell>
//                     <TableCell>Ghi chú</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {listClientCheckin.map((client) => (
//                     <TableRow
//                       key={client.create_time}
//                       sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                     >
//                       <TableCell component="th" scope="row">
//                         {client.create_time}
//                       </TableCell>
//                       <TableCell>{client.client_id}</TableCell>
//                       <TableCell>{client.note}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </div>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }
