import './App.css';
import Home from './component/home';
import BasicTable from './component/event/HomeEvent';
import ViewEvent from './component/eventAdmin';
import { WebcamCapture } from './component/Webcam';
import SearchEvent from './component/search';
import EventAction from './component/eventAction';
import {Routes, Route} from 'react-router-dom';
import Login from './component/login/Login';
import Register from './component/register/Register';

// import Footer from './components/Footer'
function App() {
  return (
    <div className="App">
      <Routes>
      {sessionStorage.getItem("accessToken") && (
        <>
          <Route path='/search' element={<SearchEvent />} />
          <Route path='/event' element={<BasicTable />} />
          <Route path='/view-event' element={<ViewEvent />} />
          <Route path='/view-event/:event_id' element={<ViewEvent />} />
          <Route path='/event-action' element={<EventAction />} />
          <Route path='/event-action/:event_id' element={<EventAction />} />
        </>
      )}
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>

        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;