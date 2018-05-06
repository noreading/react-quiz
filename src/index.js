import React from "react";
import { render } from "react-dom";
import App from "./components/App";
// import Prism from "prismjs";

import "font-awesome/css/font-awesome.css";
import "prismjs/themes/prism.css";
import "./css/style.css";

// Prism.highlightAll();

render(<App />, document.querySelector("#main"));
