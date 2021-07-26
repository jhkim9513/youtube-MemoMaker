import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import Footer from "../../footer/footer";
import Header from "../../header/header";
import styles from "./youtube_list.module.css";

const YoutubeList = ({ auth, youtube }) => {
  const history = useHistory();
  const onLogout = useCallback(() => {
    auth.logout();
  }, [auth]);

  const goToMemoMaker = useCallback(() => {
    history.push("/memoMaker");
  }, [history]);

  return (
    <section className={styles.youtubeList}>
      <Header onLogout={onLogout} goToMemoMaker={goToMemoMaker} />
      <div className={styles.container}></div>
      <Footer />
    </section>
  );
};

export default YoutubeList;
