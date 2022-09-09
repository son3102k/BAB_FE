import Login from "./pages/Login";
import React from "react";
import "./static/css/style.css";
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import CardManage from "./pages/CardManage";
import CreateCard from "./pages/CreateCard";
import PrivateRoute from "./components/PrivateRoute";
import ClearPinAttempts from "./pages/ClearPinAttempts";
import {Details} from "./components/UserPurchase/Details";
import {Cart} from "./components/UserPurchase/Cart/Cart";
import {Default} from "./components/UserPurchase/Default";
import UserHomepage from "./pages/UserHomepage";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";


function App() {

    return (
        <Router>
            <Routes>
                {/*<Route path="/login" element={<Login />} />*/}
                <Route path="/" element={<Login/>}/>
                <Route path="/dashboard" element={<PrivateRoute admin={1}><Dashboard/></PrivateRoute>}/>
                <Route path="/cardmanage" element={<PrivateRoute admin={1}><CardManage/></PrivateRoute>}/>
                <Route path="/createcard" element={<PrivateRoute admin={1}><CreateCard/></PrivateRoute>}/>
                <Route path="/clearpinattempt" element={<PrivateRoute admin={1}><ClearPinAttempts/></PrivateRoute>}/>
                <Route exact path="/buy" element={<UserHomepage></UserHomepage>}/>
                <Route path="/details" element={<Details></Details>}/>
                <Route path="/cart" element={<Cart></Cart>}/>
                <Route element={<Default></Default>}/>
            </Routes>
        </Router>
    );
}

export default App;
