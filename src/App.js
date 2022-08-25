import Login from "./pages/Login";
import React from "react";
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import CreateClientV3 from "./components/CreateClientV3";
import CreateCardV3 from "./components/CreateCardV3";
import CreateContractV4 from "./components/CreateContractV4";
import Dashboard from "./pages/Dashboard";
import CardManage from "./pages/CardManage";
import CreateCard from "./pages/CreateCard";
import PrivateRoute from "./components/PrivateRoute";

function App() {

    return (
        <Router>
            <Routes>
                {/*<Route path="/login" element={<Login />} />*/}
                <Route path="/" element={<Login/>}/>
                <Route path="/createclientv3" element={<PrivateRoute><CreateClientV3/></PrivateRoute>}/>
                <Route path="/createcardv3" element={<PrivateRoute><CreateCardV3/></PrivateRoute>}/>
                <Route path="/createcontractv4" element={<PrivateRoute><CreateContractV4/></PrivateRoute>}/>
                <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
                <Route path="/cardmanage" element={<PrivateRoute><CardManage/></PrivateRoute>}/>
                <Route path="/createcard" element={<PrivateRoute><CreateCard/></PrivateRoute>}/>
            </Routes>

        </Router>
    );
}

export default App;
