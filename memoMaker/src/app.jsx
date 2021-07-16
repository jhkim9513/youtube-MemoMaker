import Login from "./components/login/login";
import styles from "./app.module.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MemoMaker from "./components/memoMaker/memoMaker";

function App({ auth }) {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login auth={auth} />
          </Route>
          <Route path="/memoMaker">
            <MemoMaker />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
