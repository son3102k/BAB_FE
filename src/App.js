import Login from "./page/Login";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import CreateClientV3 from "./page/CreateClientV3";
import CreateCardV3 from "./page/CreateCardV3";
import CreateContractV4 from "./page/CreateContractV4";
import Dashboard from "./page/Dashboard";
import CardManage from "./page/CardManage";

function App() {

  return (
      <Router>
        <Routes>
            {/*<Route path="/login" element={<Login />} />*/}
            <Route path="/" element={<Login />} />
            <Route path="/createclientv3" element={<CreateClientV3 />}/>
            <Route path="/createcardv3" element={<CreateCardV3 />}/>
            <Route path="/createcontractv4" element={<CreateContractV4 />}/>
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/cardmanage" element={<CardManage />}/>
        </Routes>

      </Router>
  );
}

export default App;
