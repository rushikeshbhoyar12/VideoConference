import { useState } from 'react'
import Landing from './pages/landing'
import Authentication from './pages/Authentication';
import './App.css'
import {Route,BrowserRouter as Router,Routes} from "react-router-dom";
import {Authprovider} from './contexts/AuthContext'
import VideoMeetComponent from './pages/VideoMeet';
function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    <Router>
      <Authprovider>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/auth" element={<Authentication/>}/>
        <Route path="/:url" element={<VideoMeetComponent/>}></Route>
      </Routes>
      </Authprovider>
       </Router>
    </>
  )
}

export default App
