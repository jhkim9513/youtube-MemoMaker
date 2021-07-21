import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Creator from "../creator/creator";
import Footer from "../footer/footer";
import Header from "../header/header";
import MemoList from "../memoList/memoList";
import MemoDetail from "../memo_detail/memo_detail";
import styles from "./memoMaker.module.css";

const MemoMaker = ({ auth }) => {
  const [selectedMemo, setSelectedMemo] = useState(null);
  const [memoList, setMemoList] = useState({
    1: {
      id: "1",
      url: "",
      title: "youtube title1",
      theme: "dark",
      content: "blablabla~",
    },
    2: {
      id: "2",
      url: "https://www.youtube.com/embed/NqIJv3jklwU",
      title: "youtube title2",
      theme: "light",
      content: "blablabla~",
    },
    3: {
      id: "3",
      url: "https://www.youtube.com/embed/NqIJv3jklwU",
      title: "youtube title3",
      theme: "dark",
      content: "blablabla~",
    },
  });

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
    setMemoList((memoList) => {
      const updated = { ...memoList };
      updated[memo.id] = memo;
      return updated;
    });
  };

  const updateMemo = (selectedMemo) => {
    setMemoList((memoList) => {
      const updated = { ...memoList };
      updated[selectedMemo.id] = selectedMemo;
      return updated;
    });
    setSelectedMemo(selectedMemo);
  };

  const deleteMemo = (selectedMemo) => {
    setMemoList((memoList) => {
      const updated = { ...memoList };
      delete updated[selectedMemo.id];
      return updated;
    });
    setSelectedMemo(null);
  };

  const goToDetail = (memo) => {
    setSelectedMemo(memo);
  };

  return (
    <section className={styles.memoMaker}>
      <Header onLogout={onLogout} />
      {selectedMemo !== null ? (
        <div className={styles.selectedScreen}>
          <div className={styles.detail}>
            <MemoDetail
              selectedMemo={selectedMemo}
              updateMemo={updateMemo}
              deleteMemo={deleteMemo}
            />
          </div>
          <div className={styles.list}>
            <MemoList memoList={memoList} goToDetail={goToDetail} />
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <Creator createMemo={createMemo} />
          <MemoList memoList={memoList} goToDetail={goToDetail} />
        </div>
      )}

      <Footer />
    </section>
  );
};

export default MemoMaker;
