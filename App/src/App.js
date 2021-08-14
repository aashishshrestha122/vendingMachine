import React, { Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import Routes from "./routes/route";
import store from "./store";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Routes />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
