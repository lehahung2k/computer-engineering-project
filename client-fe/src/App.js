import './App.css';
import Welcome from './pages/common/welcome';
// import BasicTable from './component/event/HomeEvent';
// import ViewEvent from './component/eventAdmin';
// import { WebcamCapture } from './component/Webcam';
// import SearchEvent from './component/search';
// import EventAction from './component/eventAction';
import {Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/common/login/Login';
import Register from './pages/common/register/Register';
import PrivateRoute from './components/routing';

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
        <Route exact path='/' element={<Welcome/>}/>

        <Route path='/admin' element={<PrivateRoute role={sessionStorage.getItem('role')} type={2}/>}>
          <Route path='/admin/*' element={<Navigate to='/'/>}></Route>
        </Route>

        <Route path='/check-in' element={<PrivateRoute role={sessionStorage.getItem('role')} type={2}/>}>
          <Route path='/check-in/*' element={<Navigate to='/'/>}></Route>
        </Route>

        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/*' element={<Navigate to='/'/>}/>
      </Routes>
    </div>
  );
}

export default App;
