import React from "react";
import Memo from "../memo/memo";
import styles from "./memoList.module.css";

const MemoList = ({ memoList }) => {
  return (
    <section className={styles.memoList}>
      <h1 className={styles.title}>MemoList</h1>
      <ul className={styles.listbox}>
        {memoList.map((memo) => (
          <Memo memo={memo} key={memo.id} />
        ))}
      </ul>
    </section>
  );
};

export default MemoList;
