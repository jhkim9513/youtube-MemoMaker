import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Creator from "../creator/creator";
import Footer from "../footer/footer";
import Header from "../header/header";
import MemoList from "../memoList/memoList";
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
      <div className={styles.container}>
        <Creator />
        <MemoList />
      </div>
      <Footer />
    </section>
  );
};

export default MemoMaker;
