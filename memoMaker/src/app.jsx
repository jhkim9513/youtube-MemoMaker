import Login from "./components/login/login";
import styles from "./app.module.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MemoMaker from "./components/memo_maker/memo_maker";
import YoutubeList from "./components/youtube/youtube_list/youtube_list";

function App({ auth, memoRepository, youtube }) {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login auth={auth} />
          </Route>
          <Route path="/memoMaker">
            <MemoMaker auth={auth} memoRepository={memoRepository} />
          </Route>
          <Route exact path="/searchYoutube">
            <YoutubeList auth={auth} youtube={youtube} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
