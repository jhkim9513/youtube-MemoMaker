import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Creator from "../creator/creator";
import Footer from "../footer/footer";
import Header from "../header/header";
import MemoList from "../memoList/memoList";
import styles from "./memoMaker.module.css";

const MemoMaker = ({ auth }) => {
  const [memoList, setMemoList] = useState([
    {
      id: "1",
      url: "",
      title: "youtube title1",
      theme: "dark",
      content: "blablabla~",
    },
    {
      id: "2",
      url: "https://www.youtube.com/embed/NqIJv3jklwU",
      title: "youtube title2",
      theme: "light",
      content: "blablabla~",
    },
    {
      id: "3",
      url: "https://www.youtube.com/embed/NqIJv3jklwU",
      title: "youtube title3",
      theme: "dark",
      content: "blablabla~",
    },
  ]);
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

  const createMemo = (memo) => {
    const updated = [...memoList, memo];
    setMemoList(updated);
  };
  return (
    <section className={styles.memoMaker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Creator createMemo={createMemo} />
        <MemoList memoList={memoList} />
      </div>
      <Footer />
    </section>
  );
};

export default MemoMaker;
