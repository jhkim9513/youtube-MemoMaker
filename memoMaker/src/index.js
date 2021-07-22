import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Auth from "./firebase/auth";
import App from "./app";
import MemoRepository from "./firebase/memo_repository";

const auth = new Auth();
const memoRepository = new MemoRepository();

ReactDOM.render(
  <React.StrictMode>
    <App auth={auth} memoRepository={memoRepository} />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
