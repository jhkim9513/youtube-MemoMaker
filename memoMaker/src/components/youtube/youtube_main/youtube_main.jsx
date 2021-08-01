import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Footer from "../../footer/footer";
import Header from "../../header/header";
import YoutubeDetail from "../youtube_detail/youtube_detail";
import YoutubeList from "../youtube_list/youtube_list";
import YoutubeSearch from "../youtube_search/youtube_search";
import styles from "./youtube_main.module.css";

const YoutubeMain = ({ auth, youtube, createMemo, setSelectedMemo }) => {
  const history = useHistory();
  const detailRef = useRef();
  const listRef = useRef();
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    youtube
      .mostPopular() //
      .then((videos) => setVideos(videos))
      .then((videos) => {
        setLoading(false);
        console.log(videos);
      });
  }, [youtube]);

  const onLogout = useCallback(() => {
    auth.logout();
  }, [auth]);

  const goToMemoMaker = useCallback(
    (memo = null) => {
      history.push("/memoMaker");
      setSelectedMemo(memo);
    },
    [history, setSelectedMemo]
  );

  const search = useCallback(
    (query) => {
      youtube
        .search(query) //
        .then((videos) => {
          setVideos(videos);
          setSelectedVideo(null);
        });

      setSelectedVideo(null);
      listRef?.current?.scrollIntoView({ behavior: "auto" });
    },
    [youtube]
  );

  const selectVideo = (video) => {
    setSelectedVideo(video);
    detailRef.current
      ? detailRef?.current?.scrollIntoView({ behavior: "auto" })
      : listRef?.current?.scrollIntoView({ behavior: "auto" });
  };

  const containerClass = loading ? styles.containerLoading : styles.container;
  return (
    <section className={styles.youtubeMain}>
      <Header onLogout={onLogout} goToMemoMaker={goToMemoMaker} />
      <YoutubeSearch onSearch={search} />
      <div className={containerClass}>
        {selectedVideo && (
          <div className={styles.detail} ref={detailRef}>
            <YoutubeDetail
              video={selectedVideo}
              createMemo={createMemo}
              goToMemoMaker={goToMemoMaker}
            />
          </div>
        )}
        {!loading && (
          <div
            className={selectedVideo ? styles.list : styles.selectList}
            ref={listRef}
          >
            <YoutubeList
              videos={videos}
              onVideoClick={selectVideo}
              display={selectedVideo ? "list" : "grid"}
            />
          </div>
        )}
        {loading && <div className={styles.loading}></div>}
      </div>
      <Footer />
    </section>
  );
};

export default YoutubeMain;
