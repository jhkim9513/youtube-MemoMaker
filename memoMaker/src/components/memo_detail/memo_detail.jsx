import React, { useRef } from "react";
import Button from "../button/button";
import styles from "./memo_detail.module.css";

const MemoDetail = ({ selectedMemo, updateMemo, goToMain, openModal }) => {
  const { title, url, content, theme } = selectedMemo;
  const titleRef = useRef();
  const contentRef = useRef();
  const themeRef = useRef();

  /* Function */
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

  /* Render */
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
        <div className={styles.inputAndSelectBox}>
          <input
            className={`${styles.title} ${getTheme(theme)}`}
            ref={titleRef}
            name="title"
            type="text"
            value={title || ""}
            onChange={onChange}
          />
          <select
            ref={themeRef}
            className={`${styles.select} ${getTheme(theme)}`}
            name="theme"
            onChange={onChange}
            value={theme || ""}
          >
            <option value="light">light</option>
            <option value="dark">dark</option>
          </select>
        </div>

        <textarea
          spellCheck="false"
          className={`${styles.content} ${getTheme(theme)}`}
          ref={contentRef}
          name="content"
          value={content || ""}
          onChange={onChange}
        ></textarea>
      </div>
      <div className={styles.btnBox}>
        <Button name="메모 삭제" onClick={() => openModal("deleteMemo")} />
        <Button name="URL 변경" onClick={() => openModal("urlChange")} />
        <Button name="메인 화면" onClick={() => goToMain()} />
      </div>
    </div>
  );
};

function getTheme(theme) {
  switch (theme) {
    case "light":
      return styles.light;
    case "dark":
      return styles.dark;
    default:
      throw new Error(`unknown theme: ${theme}`);
  }
}

export default MemoDetail;
