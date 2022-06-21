import './App.css';
import Home from './component/home';
import BasicTable from './component/event/HomeEvent';
import ViewEvent from './component/eventAdmin';
import { WebcamCapture } from './component/Webcam';
import SearchEvent from './component/search';
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
      </Routes>
    </div>
  );
}

export default App;