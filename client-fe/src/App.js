import './App.css';
import Home from './component/home';
import BasicTable from './component/event/HomeEvent';
import ViewEvent from './component/eventAdmin';
import { WebcamCapture } from './component/Webcam';
import SearchEvent from './component/search';
import EventAction from './component/eventAction';
import {Routes, Route} from 'react-router-dom';

// import Footer from './components/Footer'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/search' element={<SearchEvent/>}/>
        <Route path='/event' element={<BasicTable/>}/>
        <Route path='/view-event' element={<ViewEvent/>}/>
        <Route path='/view-event/:event_id' element={<ViewEvent/>}/>
        <Route path='/event-action' element={<EventAction/>}/>
        <Route path='/event-action/:event_id' element={<EventAction/>}/>
      </Routes>
    </div>
  );
}

export default App;