import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useHistory } from "react-router-dom";
import Footer from "../../footer/footer";
import Header from "../../header/header";
import YoutubeDetail from "../youtube_detail/youtube_detail";
import YoutubeList from "../youtube_list/youtube_list";
import YoutubeSearch from "../youtube_search/youtube_search";
import styles from "./youtube_main.module.css";

const YoutubeMain = memo(({ auth, youtube, createMemo, setSelectedMemo }) => {
  const history = useHistory();
  const detailRef = useRef();
  const listRef = useRef();
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const [loadRef, loadInView] = useInView();
  const [nextPageToken, setNextPageToken] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const [nowQuery, setNowQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    setIsSearch(false);
    setNowQuery("");

    youtube
      .mostPopular() //
      .then((data) => {
        setNextPageToken(data.nextPageToken);
        return data.items;
      })
      .then((videos) => {
        setVideos(videos);
        console.log("start videos : ", videos);
      })
      .then(() => {
        setLoading(false);
      });
  }, [youtube]);

  useEffect(() => {
    if (loadInView) {
      if (!isSearch) {
        console.log("popular");
        console.log("nextPageToken : ", nextPageToken);
        youtube
          .morePopular(nextPageToken) //
          .then((data) => {
            setNextPageToken(data.nextPageToken);
            setVideos((prev) => [...prev, ...data.items]);
          });
      } else if (isSearch) {
        console.log("searching nowQuery : ", nowQuery);
        console.log("nextPageToken : ", nextPageToken);
        youtube
          .moreSearch(nowQuery, nextPageToken) //
          .then((data) => {
            setNextPageToken(data.nextPageToken);
            setVideos((prev) => [...prev, ...data.items]);
          });
      }
    } else if (!loadInView) {
      console.log("bye");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadInView, youtube]);

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
      setLoading(true);
      setIsSearch(true);
      youtube
        .search(query) //
        .then((data) => {
          setNowQuery(query);
          setNextPageToken(data.nextPageToken);
          return data.items;
        })
        .then((videos) => {
          setVideos(videos);
          setSelectedVideo(null);
          setLoading(false);
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
      <div className={containerClass} ref={containerRef}>
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
              loadRef={loadRef}
            />
            <div ref={loadRef}>&nbsp;</div>
          </div>
        )}
        {loading && <div className={styles.loading}></div>}
      </div>
      <Footer />
    </section>
  );
});

export default YoutubeMain;
