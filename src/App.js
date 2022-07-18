import Login from "./page/Login";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import CreateClientV3 from "./page/CreateClientV3";

function App() {
  return (
      <Router>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="/createclientv3" element={<CreateClientV3 />}/>
        </Routes>

      </Router>
  );
}

export default App;
