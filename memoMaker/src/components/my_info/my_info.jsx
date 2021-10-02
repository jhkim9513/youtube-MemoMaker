import React, { memo, useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Footer from "../footer/footer";
import Header from "../header/header";
import styles from "./my_info.module.css";

const MyInfo = memo(
  ({ auth, setSelectedMemo, userId, setUserId, memoRepository }) => {
    const history = useHistory();
    const [userName, setUserName] = useState("");
    const [numberOfTheme, setNumberOfTheme] = useState({
      light: 0,
      dark: 0,
      red: 0,
      blue: 0,
    });
    console.log("hi");

    /* Lifecycle */
    useEffect(() => {
      auth.onAuthChange((user) => {
        if (user) {
          setUserName(user.displayName);
          setUserId(user.uid);
        } else {
          history.push("/");
        }
      });
    }, [auth, history, setUserId]);

    useEffect(() => {
      memoRepository.countTheme(userId, (number) => {
        setNumberOfTheme(number);
      });
    }, [memoRepository, userId]);

    /* Function */
    const onLogout = useCallback(() => {
      auth.logout();
    }, [auth]);

    const goToMemoMaker = useCallback(
      (memo = null) => {
        history.push("/memoMaker");
        setSelectedMemo(memo);
      },
      [history, setSelectedMemo]
    );

    /* Render */
    return (
      <section className={styles.myInfo}>
        <Header onLogout={onLogout} goToMemoMaker={goToMemoMaker} />
        <div className={styles.container}>
          <div>{`${userName}`}</div>
          <div>{`light : ${numberOfTheme.light}`}</div>
          <div>{`dark : ${numberOfTheme.dark}`}</div>
          <div>{`red : ${numberOfTheme.red}`}</div>
          <div>{`blue : ${numberOfTheme.blue}`}</div>
        </div>
        <Footer />
      </section>
    );
  }
);

export default MyInfo;
