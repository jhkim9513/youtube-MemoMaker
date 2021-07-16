import React from "react";
import Footer from "../footer/footer";
import Header from "../header/header";
import styles from "./login.module.css";

const Login = ({ auth }) => {
  const onLogin = (e) => {
    auth.login(e.currentTarget.textContent).then(console.log);
  };
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
        <li className={styles.listItem}>
          <button className={styles.button}>Non-member login</button>
        </li>
      </ul>
      <Footer />
    </section>
  );
};

export default Login;
