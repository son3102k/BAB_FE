import Login from "./page/Login";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import CreateClientV3 from "./page/CreateClientV3";
import CreateCardV3 from "./page/CreateCardV3";

function App() {
  return (
      <Router>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="/createclientv3" element={<CreateClientV3 />}/>
            <Route path="/createcardv3" element={<CreateCardV3 />}/>
        </Routes>

      </Router>
  );
}

export default App;
