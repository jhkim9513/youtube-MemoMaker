import React from "react";
import styles from "./memo.module.css";

const DEFAULT_IMAGE = "images/default_img.png";

const Memo = ({ memo, goToDetail }) => {
  const { url, title, theme, content } = memo;
  return (
    <li
      className={`${styles.memo} ${getTheme(theme)}`}
      onClick={() => goToDetail(memo)}
    >
      {url !== "" ? (
        <iframe
          className={styles.youtube}
          title="youtube iframe"
          id="ytplayer"
          type="text/html"
          src={url}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <img
          className={styles.default_img}
          src={DEFAULT_IMAGE}
          alt="default img"
        ></img>
      )}

      <div className={styles.memoBox}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.content}>{content}</p>
      </div>
    </li>
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

export default Memo;
