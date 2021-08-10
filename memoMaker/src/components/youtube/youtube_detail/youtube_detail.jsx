import React from "react";
import Button from "../../button/button";
import styles from "./youtube_detail.module.css";

const YoutubeDetail = ({
  video,
  video: { snippet, id },
  createMemo,
  goToMemoMaker,
  isMoreDescription,
  setIsMoreDescription,
}) => {
  const { title, description } = snippet;
  const memo = {
    id: id,
    url: `https://www.youtube.com/embed/${id}`,
    title: title,
    theme: "light",
    content: description,
    thumbnail: `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
  };

  /* Render */
  const moreDescription = isMoreDescription
    ? `${styles.description} ${styles.moreDescription}`
    : styles.description;
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
      <Button
        name="메모하기"
        onClick={() => {
          createMemo(memo);
          goToMemoMaker(memo);
        }}
      />
      <h2 className={styles.title}>{snippet.title}</h2>
      <h3>{snippet.channelTitle}</h3>
      <pre className={moreDescription}>{snippet.description}</pre>
      <p
        className={styles.moreDescriptionButton}
        onClick={() => {
          isMoreDescription && setIsMoreDescription(false);
          !isMoreDescription && setIsMoreDescription(true);
        }}
      >
        {!isMoreDescription && "더보기"}
        {isMoreDescription && "간략히"}
      </p>
    </section>
  );
};

export default YoutubeDetail;
