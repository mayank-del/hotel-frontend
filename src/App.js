
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import Login from './pages/Login';
import Signup from './pages/Signup';
import ManagerLogin from './pages/ManagerLogin';
import ManagerPage from './pages/ManagerPage';
import Hotels from './pages/Hotels';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
          
          <Route exact path="/signup" element={<Signup/>}/>
          <Route exact path="/" element={<Signup/>}/>
          <Route exact path="/login" element={<Login/>}/>

          <Route exact path="/managerlogin" element={<ManagerLogin/>}/>
          <Route exact path="/managerpage" element={<ManagerPage/>}/>
          <Route exact path="/hotels" element={<Hotels/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
