import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Footer from "../footer/footer";
import Header from "../header/header";
import styles from "./memoMaker.module.css";

const MemoMaker = ({ auth }) => {
  const history = useHistory();
  const onLogout = () => {
    auth.logout();
  };

  useEffect(() => {
    auth.onAuthChange((user) => {
      if (!user) {
        history.push("/");
      }
    });
  });
  return (
    <section className={styles.memoMaker}>
      <Header onLogout={onLogout} />
      <Footer />
    </section>
  );
};

export default MemoMaker;
