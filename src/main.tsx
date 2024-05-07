import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { AsyncProcess } from "./utils/async_process";
import { init as rxdbInit } from "./db";
import mountHybrid from "./@hybrid/hybrid";

const process = new AsyncProcess();

process.use(rxdbInit);
process.use(mountHybrid);
process.use(renderApp);
process.start();

function renderApp(next: AsyncProcessFn) {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <App />
  );
}
