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
import CreateEvent from "./pages/admin/event/createEvent";
import ListEvent from "./pages/admin/event/listEvent";
import DetailEvent from "./pages/admin/event/eventDetail";
import CreateNewCompany from "./pages/admin/company/create";
import DetailInfoCompany from "./pages/admin/company/viewDetail";
import ListCompany from "./pages/admin/company/viewList";
import CustomInfoCompany from "./pages/admin/company/customizeInfo";
import PocAccount from "./pages/admin/pocAccount";
import EditEvent from "./pages/admin/event/editEvent";
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
          <Route exact path="/admin/event" element={<ListEvent />}></Route>
          <Route
            exact
            path="/admin/event/detail"
            element={<DetailEvent />}
          ></Route>
          <Route exact path="/admin/event/edit" element={<EditEvent />}></Route>
          <Route exact path="/admin/company" element={<ListCompany />}></Route>
          <Route
            exact
            path="/admin/company/create"
            element={<CreateNewCompany />}
          ></Route>

          <Route
            exact
            path="/admin/company/detail"
            element={<DetailInfoCompany />}
          ></Route>

          <Route
            exact
            path="/admin/company/custom"
            element={<CustomInfoCompany />}
          ></Route>

          <Route
            exact
            path="/admin/poc-account"
            element={<PocAccount />}
          ></Route>
          <Route path="/admin/*" element={<Navigate to="/" />}></Route>
        </Route>

        <Route
          path="/event-admin"
          element={
            <PrivateRoute role={sessionStorage.getItem("role")} type={2} />
          }
        >
          <Route exact path="/event-admin" element={<AdminDashBoard />}></Route>
          <Route
            exact
            path="/event-admin/create-event"
            element={<CreateEvent />}
          ></Route>
          <Route
            exact
            path="/event-admin/event"
            element={<ListEvent />}
          ></Route>
          <Route
            exact
            path="/event-admin/event/detail"
            element={<DetailEvent />}
          ></Route>

          <Route
            exact
            path="/event-admin/event/edit"
            element={<EditEvent />}
          ></Route>

          <Route
            exact
            path="/event-admin/detail-info"
            element={<DetailInfoCompany />}
          ></Route>

          <Route
            exact
            path="/event-admin/poc-account"
            element={<PocAccount />}
          ></Route>
          <Route path="/event-admin/*" element={<Navigate to="/" />}></Route>
        </Route>

        <Route
          path="/poc"
          element={
            <PrivateRoute role={sessionStorage.getItem("role")} type={2} />
          }
        >
          <Route exact path="/poc" element={<PocManageEvent />}></Route>
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
