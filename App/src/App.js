import React, { Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./routes/route";

import "./App.css";

function App() {
  return (
    <Router>
      <Fragment>
        <Routes />
      </Fragment>
    </Router>
  );
}

export default App;
