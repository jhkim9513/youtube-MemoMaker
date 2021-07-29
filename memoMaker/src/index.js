import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Auth from "./firebase/auth";
import App from "./app";
import MemoRepository from "./firebase/memo_repository";
import Youtube from "./components/youtube/service/youtube";
import "@fortawesome/fontawesome-free/js/all.js";

const auth = new Auth();
const memoRepository = new MemoRepository();
const youtube = new Youtube(process.env.REACT_APP_YOUTUBE_API_KEY);

ReactDOM.render(
  <React.StrictMode>
    <App auth={auth} memoRepository={memoRepository} youtube={youtube} />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
