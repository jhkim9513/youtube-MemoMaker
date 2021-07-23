import React, { memo } from "react";
import styles from "./memo.module.css";

const DEFAULT_IMAGE = "images/default_img.png";

const Memo = memo(({ memo, goToDetail, selectedMemo }) => {
  const isDetail = selectedMemo ? styles.detailList : null;
  const { url, title, theme, content } = memo;
  return (
    <li
      className={`${styles.memo} ${getTheme(theme)} ${isDetail}`}
      onClick={() => goToDetail(memo)}
    >
      <div className={`${styles.youtube} ${isDetail}`}>
        {url !== "" ? (
          <iframe
            // className={`${styles.youtube} ${isDetail}`}
            title="youtube iframe"
            id="ytplayer"
            width="100%"
            height="100%"
            type="text/html"
            src={url}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        ) : (
          <img
            className={`${styles.default_img} ${isDetail}`}
            src={DEFAULT_IMAGE}
            alt="default img"
          ></img>
        )}
      </div>

      <div className={`${styles.memoBox} ${isDetail}`}>
        <h1 className={`${styles.title} ${isDetail}`}>{title}</h1>
        {!isDetail && <pre className={styles.content}>{content}</pre>}
      </div>
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
