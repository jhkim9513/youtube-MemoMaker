import React from "react";
import YoutubeItem from "../youtube_item/youtube_item";
import styles from "./youtube_list.module.css";

const YoutubeList = ({ videos, onVideoClick, display }) => (
  <ul className={styles.videos}>
    {videos.map((video) => (
      <YoutubeItem
        key={video.id}
        video={video}
        onVideoClick={onVideoClick}
        display={display}
      />
    ))}
  </ul>
);

export default YoutubeList;
