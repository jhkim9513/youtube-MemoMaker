import React from "react";
import YoutubeItem from "../youtube_item/youtube_item";
import styles from "./youtube_list.module.css";

const YoutubeList = ({ videos, selectVideo, display }) => {
  return (
    <ul className={styles.videos}>
      {videos.map((video, index) => (
        <YoutubeItem
          key={video.id + index}
          video={video}
          selectVideo={selectVideo}
          display={display}
        />
      ))}
    </ul>
  );
};

export default YoutubeList;
