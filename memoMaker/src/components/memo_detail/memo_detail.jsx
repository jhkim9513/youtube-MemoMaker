import React, { useRef } from "react";
import Button from "../button/button";
import styles from "./memo_detail.module.css";

const MemoDetail = ({ selectedMemo, updateMemo, deleteMemo, goToMain }) => {
  const { title, url, content } = selectedMemo;
  const titleRef = useRef();
  const contentRef = useRef();

  const onChange = (e) => {
    if (e.currentTarget == null) {
      return;
    }
    e.preventDefault();
    updateMemo({
      ...selectedMemo,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  return (
    <div className={styles.detailBox}>
      {url && (
        <iframe
          className={styles.youtube}
          title="youtube iframe"
          id="ytplayer"
          type="text/html"
          src={url}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      )}

      <div className={styles.memoBox}>
        <input
          className={styles.title}
          ref={titleRef}
          name="title"
          type="text"
          value={title}
          onChange={onChange}
        />
        <textarea
          className={styles.content}
          ref={contentRef}
          name="content"
          value={content}
          onChange={onChange}
        ></textarea>
      </div>
      <div className={styles.btnBox}>
        <Button name="메모 삭제" onClick={() => deleteMemo(selectedMemo)} />
        <Button name="메인 화면" onClick={() => goToMain()} />
      </div>
    </div>
  );
};

export default MemoDetail;
