import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import Home from './component/Home';
import Login from './component/Login';
import Dashboard from './component/Dashboard';
import Users from './component/User';
import Items from './component/Item';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/dashboard/user" element={<Users/>} />
          <Route path="/dashboard/item" element={<Items/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
