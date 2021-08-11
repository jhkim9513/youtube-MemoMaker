import React, { memo, useState } from "react";
import styles from "./memo.module.css";

const DEFAULT_IMAGE = "images/default_img.png";

const Memo = memo(({ memo, goToDetail, selectedMemo, checkedMemoHandler }) => {
  const isDetail = selectedMemo ? styles.detailList : null;
  const { id, url, title, theme, content, thumbnail } = memo;
  const [checked, setChecked] = useState(false);
  const checkHandler = (target) => {
    setChecked(target.checked);
    checkedMemoHandler(id, target.checked);
  };
  return (
    <li className={`${styles.memo} ${getTheme(theme)} ${isDetail}`}>
      <div
        className={`${styles.youtube} ${isDetail}`}
        onClick={() => goToDetail(memo)}
      >
        {url !== "" ? (
          <img
            className={`${styles.default_img} ${isDetail}`}
            src={thumbnail}
            alt="youtube thumbnail"
          ></img>
        ) : (
          <img
            className={`${styles.default_img} ${isDetail}`}
            src={DEFAULT_IMAGE}
            alt="default img"
          ></img>
        )}
      </div>

      <div
        className={`${styles.memoBox} ${isDetail}`}
        onClick={() => goToDetail(memo)}
      >
        <h1 className={`${styles.title} ${isDetail}`}>{title}</h1>
        {!isDetail && <pre className={styles.content}>{content}</pre>}
      </div>

      <input
        type="checkbox"
        className={`${styles.checkbox} ${isDetail}`}
        checked={checked}
        onChange={(e) => checkHandler(e.target)}
      />
    </li>
  );
});

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

export default Memo;
