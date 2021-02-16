import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Main from "./main";
import "./index.css";

ReactDOM.render(
    <React.StrictMode>
        <Main />
    </React.StrictMode>,
    document.getElementById("root")
);