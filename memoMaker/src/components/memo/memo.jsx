import React from "react";
import styles from "./memo.module.css";

// const DEFAULT_IMAGE = "../../img/";

const Memo = ({ memo }) => {
  const { id, url, title, theme, content } = memo;
  return (
    <li className={`${styles.memo} ${getTheme(theme)}`}>
      {url !== "" ? (
        <iframe
          className={styles.youtube}
          title="youtube iframe"
          id="ytplayer"
          type="text/html"
          src="https://www.youtube.com/embed/NqIJv3jklwU"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <img
          className={styles.default_img}
          src="images/default_img.png"
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
