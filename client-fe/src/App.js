import "./App.css";
import Welcome from "./pages/common/welcome";
// import BasicTable from './component/event/HomeEvent';
// import ViewEvent from './component/eventAdmin';
// import { WebcamCapture } from './component/Webcam';
// import SearchEvent from './component/search';
// import EventAction from './component/eventAction';
import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/routing";
import CreateNewCompany from "./pages/admin/company/create";
import CustomInfoCompany from "./pages/admin/company/customizeInfo";
import DetailInfoCompany from "./pages/admin/company/viewDetail";
import ListCompany from "./pages/admin/company/viewList";
import AdminDashBoard from "./pages/admin/dashboard";
import CreateEvent from "./pages/admin/event/createEvent";
import EditEvent from "./pages/admin/event/editEvent";
import DetailEvent from "./pages/admin/event/eventDetail";
import ListEvent from "./pages/admin/event/listEvent";
import PocAccount from "./pages/admin/pocAccount";
import Login from "./pages/common/login/Login";
import Register from "./pages/common/register/Register";
import Checkin from "./pages/poc/checkin";
import PocEventDetail from "./pages/poc/eventDetail";
import PocManageEvent from "./pages/poc/listEvents";
import PocListGuest from "./pages/poc/listGuests";
import PocDashBoard from "./pages/poc/dashboard";
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

        <Route path="/admin" element={<PrivateRoute type={"admin"} />}>
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
          <Route exact path="/admin/tenant" element={<ListCompany />}></Route>
          <Route
            exact
            path="/admin/tenant/create"
            element={<CreateNewCompany />}
          ></Route>

          <Route
            exact
            path="/admin/tenant/detail"
            element={<DetailInfoCompany />}
          ></Route>

          <Route
            exact
            path="/admin/tenant/custom"
            element={<CustomInfoCompany />}
          ></Route>

          <Route
            exact
            path="/admin/poc-account"
            element={<PocAccount />}
          ></Route>
          <Route path="/admin/*" element={<Navigate to="/" />}></Route>
        </Route>

        <Route path="/event-admin" element={<PrivateRoute type={"tenant"} />}>
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

        <Route path="/poc" element={<PrivateRoute type={"poc"} />}>
          <Route exact path="/poc" element={<PocDashBoard />}></Route>
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

        <Route path="/check-in" element={<PrivateRoute type={"poc"} />}>
          <Route
            path="/check-in"
            element={<Checkin />}
            render={() => <Checkin />}
          ></Route>
        </Route>

        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
