import React from "react";
import Memo from "../memo/memo";
import styles from "./memo_list.module.css";

const MemoList = ({
  memoList,
  goToDetail,
  selectedMemo,
  checkedMemoHandler,
  checkedMemo,
  openModal,
}) => {
  const isDetail = selectedMemo ? styles.detailList : null;
  return (
    <section className={`${styles.memoList} ${isDetail}`}>
      <div className={styles.listHeader}>
        <h1 className={`${styles.title} ${isDetail}`}>나의 메모리스트</h1>
        <div
          className={`${styles.deleteBtn} ${isDetail}`}
          onClick={() => {
            checkedMemo.size && openModal("deleteCheckedMemo");
          }}
        >
          <i className="fas fa-trash-alt"></i>
        </div>
      </div>
      <ul className={styles.listbox}>
        {Object.keys(memoList).map((key) => (
          <Memo
            memo={memoList[key]}
            key={key}
            goToDetail={goToDetail}
            selectedMemo={selectedMemo}
            checkedMemoHandler={checkedMemoHandler}
          />
        ))}
      </ul>
    </section>
  );
};

export default MemoList;
