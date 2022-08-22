import Login from "./pages/Login";
import React from "react";
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import CreateClientV3 from "./components/CreateClientV3";
import CreateCardV3 from "./components/CreateCardV3";
import CreateContractV4 from "./components/CreateContractV4";
import Dashboard from "./pages/Dashboard";
import CardManage from "./pages/CardManage";
import CreateCard from "./pages/CreateCard";

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
                <Route path="/createcard" element={<CreateCard/>}/>
            </Routes>

        </Router>
    );
}

export default App;
