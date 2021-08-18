import React, { useEffect, useState } from "react";
import Button from "../../button/button";
import styles from "./youtube_detail.module.css";

const YoutubeDetail = ({
  video,
  video: { snippet, id },
  createMemo,
  goToMemoMaker,
  isMoreDescription,
  setIsMoreDescription,
  youtube,
}) => {
  const [description, setDescription] = useState("");
  const { title } = snippet;
  const memo = {
    id: id,
    url: `https://www.youtube.com/embed/${id}`,
    title: title,
    theme: "light",
    content: description,
    thumbnail: `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
  };

  /* Lifecycle */
  useEffect(() => {
    // search로 얻어오는 description은 생략된 내용을 가져오기 때문에 전체 내용을 가져오기 위해서 id검색으로 다시 불러옴
    youtube
      .getFullDescription(id)
      .then((description) => setDescription(description));
  }, [id, youtube]);

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
      <div className={styles.memoButton}>
        <Button
          name="메모하기"
          onClick={() => {
            createMemo(memo);
            goToMemoMaker(memo);
          }}
        />
      </div>

      <h2 className={styles.title}>{title}</h2>
      <h3>{snippet.channelTitle}</h3>
      <pre className={moreDescription}>{description}</pre>
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
