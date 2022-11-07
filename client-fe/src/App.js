import "./App.css";
import Welcome from "./pages/common/welcome";
// import BasicTable from './component/event/HomeEvent';
// import ViewEvent from './component/eventAdmin';
// import { WebcamCapture } from './component/Webcam';
// import SearchEvent from './component/search';
// import EventAction from './component/eventAction';
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/common/login/Login";
import Register from "./pages/common/register/Register";
import PrivateRoute from "./components/routing";
import Checkin from "./pages/poc/checkin";
import PocManageEvent from "./pages/poc/listEvents";
import PocEventDetail from "./pages/poc/eventDetail";
import PocListGuest from "./pages/poc/listGuests";
import AdminDashBoard from "./pages/admin/dashboard";
import CreateEvent from "./pages/admin/createEvent";

// import Footer from './components/Footer'
function App() {
  return (
    <div className="App">
      <Routes>
        {/* {sessionStorage.getItem("accessToken") && (
        <>
          <Route path='/search' element={<SearchEvent />} />
          <Route path='/event' element={<BasicTable />} />
          <Route path='/view-event' element={<ViewEvent />} />
          <Route path='/view-event/:event_id' element={<ViewEvent />} />
          <Route path='/event-action' element={<EventAction />} />
          <Route path='/event-action/:event_id' element={<EventAction />} />
        </>
      )} */}
        <Route exact path="/" element={<Welcome />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute role={sessionStorage.getItem("role")} type={2} />
          }
        >
          <Route exact path="/admin" element={<AdminDashBoard />}></Route>
          <Route
            exact
            path="/admin/create-event"
            element={<CreateEvent />}
          ></Route>
          <Route path="/admin/*" element={<Navigate to="/" />}></Route>
        </Route>

        <Route
          path="/poc"
          element={
            <PrivateRoute role={sessionStorage.getItem("role")} type={2} />
          }
        >
          <Route exact path="/poc/event" element={<PocManageEvent />}></Route>
          <Route
            exact
            path="/poc/event/detail"
            element={<PocEventDetail />}
          ></Route>
          <Route
            exact
            path="/poc/event/detail/guests"
            element={<PocListGuest />}
          ></Route>
          <Route path="/poc/*" element={<Navigate to="/" />}></Route>
        </Route>

        <Route
          path="/check-in"
          element={
            <PrivateRoute role={sessionStorage.getItem("role")} type={2} />
          }
        >
          <Route path="/check-in" element={<Checkin />}></Route>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
