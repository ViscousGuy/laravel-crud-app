import "./bootstrap.js";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./routes";
import "../css/app.css";
import "../css/notFound.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Routes />);
