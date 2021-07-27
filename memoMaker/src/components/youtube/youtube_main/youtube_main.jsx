import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Footer from "../../footer/footer";
import Header from "../../header/header";
import YoutubeDetail from "../youtube_detail/youtube_detail";
import YoutubeList from "../youtube_list/youtube_list";
import YoutubeSearch from "../youtube_search/youtube_search";
import styles from "./youtube_main.module.css";

const YoutubeMain = ({ auth, youtube }) => {
  const history = useHistory();
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    youtube
      .mostPopular() //
      .then((videos) => setVideos(videos));
    console.log(videos);
  }, [youtube]);

  const onLogout = useCallback(() => {
    auth.logout();
  }, [auth]);

  const goToMemoMaker = useCallback(() => {
    history.push("/memoMaker");
  }, [history]);

  const search = useCallback(
    (query) => {
      youtube
        .search(query) //
        .then((videos) => {
          setVideos(videos);
          setSelectedVideo(null);
        });

      setSelectedVideo(null);
    },
    [youtube]
  );

  const selectVideo = (video) => {
    setSelectedVideo(video);
  };

  return (
    <section className={styles.youtubeList}>
      <Header onLogout={onLogout} goToMemoMaker={goToMemoMaker} />
      <div className={styles.container}>
        <YoutubeSearch onSearch={search} />
        {selectedVideo && (
          <div className={styles.detail}>
            <YoutubeDetail video={selectedVideo} />
          </div>
        )}
        <div className={styles.list}>
          <YoutubeList
            videos={videos}
            onVideoClick={selectVideo}
            display={selectedVideo ? "list" : "grid"}
          />
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default YoutubeMain;
