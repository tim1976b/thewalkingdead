import React from "react";
import { render } from "react-dom";
import App from "./components/severity-level";

render(<App />, document.getElementById("react-root"));  

if (module.hot) module.hot.accept();
