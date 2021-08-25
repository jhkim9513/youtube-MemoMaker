import React, { memo, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Footer from "../footer/footer";
import Header from "../header/header";
import styles from "./login.module.css";

const Login = memo(({ auth }) => {
  const history = useHistory();

  /* Function */
  const goToMemoMaker = (uid) => {
    history.push({
      pathname: "/memoMaker",
      state: { id: uid },
    });
  };

  const onLogin = (e) => {
    auth //
      .login(e.currentTarget.textContent)
      .then((data) => goToMemoMaker(data.user.uid));
  };

  /* Lifecycle */
  useEffect(() => {
    auth.onAuthChange((user) => {
      user && goToMemoMaker(user.uid);
    });
  });

  return (
    <section className={styles.section}>
      <Header />
      <h1 className={styles.title}>Login</h1>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <button className={styles.button} onClick={onLogin}>
            Google
          </button>
        </li>
        <li className={styles.listItem}>
          <button className={styles.button} onClick={onLogin}>
            Github
          </button>
        </li>
      </ul>
      <Footer />
    </section>
  );
});

export default Login;
