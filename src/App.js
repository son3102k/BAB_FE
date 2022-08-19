import Login from "./pages/Login";
import React from "react";
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import CreateClientV3 from "./pages/CreateClientV3";
import CreateCardV3 from "./pages/CreateCardV3";
import CreateContractV4 from "./pages/CreateContractV4";
import Dashboard from "./pages/Dashboard";
import CardManage from "./pages/CardManage";

function App() {

    return (
        <Router>
            <Routes>
                {/*<Route path="/login" element={<Login />} />*/}
                <Route path="/" element={<Login/>}/>
                <Route path="/createclientv3" element={<CreateClientV3/>}/>
                <Route path="/createcardv3" element={<CreateCardV3/>}/>
                <Route path="/createcontractv4" element={<CreateContractV4/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/cardmanage" element={<CardManage/>}/>
            </Routes>

        </Router>
    );
}

export default App;
