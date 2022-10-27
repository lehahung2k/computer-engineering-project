import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "./index.css";
import { Link, useParams } from 'react-router-dom'
import { WebcamCapture } from "../Webcam";
import Divider from "@mui/material/Divider";
import SideBar from "../navigation";
import { useEffect } from "react";
import ViewEventInfo from "./viewEventInfo";
import eventApi from "../../api/eventAPI.js";
import pocApi from "../../api/PocApi.js";
import EventTable from "../eventTable";


export default function ViewEvent() {
  const [listEvents, setListEvents] = React.useState([]);
  const [rerender, setRerender] = React.useState(false);
  
  useEffect(() => {
    const responseGetListEvents = eventApi.getAll(sessionStorage.getItem('accessToken'));
    responseGetListEvents
      .then((listEvents) => {
        console.log(listEvents);
        setListEvents(listEvents.data);
      })
      .catch((error) => console.error(error));
  
  }, []);


  const handleRerender = ()=>{
    setRerender(!rerender);
  }

  let {event_id} = useParams();
  if(event_id === undefined)
  event_id = '';
  console.log(event_id);

  return (
    <div>
      <Grid container spacing={0}>
        <Grid xs="auto">
          <div>
            <SideBar id="admin"></SideBar>
          </div>
        </Grid>
        <Grid xs>
          <div id="header" color="blue">
            <h3>Trang theo dõi sự kiện</h3>
            {!sessionStorage.getItem("accessToken") && (
              <>
                <div>
                  <button><a href='/login'>Đăng nhập</a></button>
                  <button><a href="/register">Đăng ký</a></button>
                </div>
              </>
            )}
          </div>
          <div id="event-list">
            <h3>Chọn sự kiện</h3>
            <EventTable listEvents={listEvents} type='CRUD'></EventTable>
          </div>

          <Divider />
<ViewEventInfo eventId={event_id} rerender={handleRerender}/>
        </Grid>
      </Grid>
    </div>
  );
}
