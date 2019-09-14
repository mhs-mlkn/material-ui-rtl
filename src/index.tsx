import React from "react";
import ReactDOM from "react-dom";
import { setBasepath } from "hookrouter";
import App from "components/App";

import "assets/css/index.css";
setBasepath("/user");

ReactDOM.render(<App />, document.getElementById("root"));
