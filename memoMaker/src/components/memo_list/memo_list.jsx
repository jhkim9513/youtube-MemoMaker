import React from "react";
import Memo from "../memo/memo";
import styles from "./memo_list.module.css";

const MemoList = ({ memoList, goToDetail, selectedMemo }) => {
  const isDetail = selectedMemo ? styles.detailList : null;
  return (
    <section className={`${styles.memoList} ${isDetail}`}>
      <h1 className={styles.title}>MemoList</h1>
      <ul className={styles.listbox}>
        {Object.keys(memoList).map((key) => (
          <Memo
            memo={memoList[key]}
            key={key}
            goToDetail={goToDetail}
            selectedMemo={selectedMemo}
          />
        ))}
      </ul>
    </section>
  );
};

export default MemoList;
