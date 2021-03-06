import React, { memo } from "react";
import styles from "./youtube_item.module.css";

const YoutubeItem = memo(
  (
    { video, video: { snippet }, selectVideo, display } //props.video.snippet
  ) => {
    const displayType = display === "list" ? styles.list : styles.grid;
    return (
      <li
        className={`${styles.container} ${displayType}`}
        onClick={() => selectVideo(video)}
      >
        <div className={styles.video}>
          <img
            className={`${styles.thumbnail} ${displayType}`}
            src={snippet.thumbnails.medium.url}
            alt="video thumbnail"
          />
          <div className={styles.metadata}>
            <p className={styles.title}>{snippet.title}</p>
          </div>
        </div>
      </li>
    );
  }
);

export default YoutubeItem;
