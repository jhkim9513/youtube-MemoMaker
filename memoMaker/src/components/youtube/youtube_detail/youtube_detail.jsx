import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../../button/button";
import styles from "./youtube_detail.module.css";

const YoutubeDetail = ({ video, video: { snippet } }) => {
  const history = useHistory();
  return (
    <section className={styles.detail}>
      <iframe
        className={styles.video}
        type="text/html"
        title="youtube video player"
        width="100%"
        height="500px"
        src={`https://www.youtube.com/embed/${video.id}`}
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <Button name="메모하기" onClick={() => {}} />
      <h2>{snippet.title}</h2>
      <h3>{snippet.channelTitle}</h3>
      <pre className={styles.pre}>{snippet.description}</pre>
    </section>
  );
};

export default YoutubeDetail;
