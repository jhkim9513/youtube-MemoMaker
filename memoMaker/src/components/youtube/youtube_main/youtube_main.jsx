import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useHistory } from "react-router-dom";
import Footer from "../../footer/footer";
import Header from "../../header/header";
import YoutubeDetail from "../youtube_detail/youtube_detail";
import YoutubeList from "../youtube_list/youtube_list";
import YoutubeSearch from "../youtube_search/youtube_search";
import styles from "./youtube_main.module.css";

const YoutubeMain = memo(
  ({ auth, youtube, createMemo, setSelectedMemo, setUserId }) => {
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
    const [isMoreDescription, setIsMoreDescription] = useState(false);

    /* Lifecycle */
    // 유저가 로그인한 상태인지 체크
    useEffect(() => {
      auth.onAuthChange((user) => {
        if (user) {
          setUserId(user.uid);
        } else {
          history.push("/");
        }
      });
    }, [auth, history, setUserId]);

    // 한국에서 가장 인기있는 유튜브 영상 데이터를 가져와 세팅
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
        })
        .then(() => setLoading(false));
    }, [youtube]);

    // 스크롤을 모두 내렸을 시 검색여부를 파악한 뒤 추가 데이터를 받아와 세팅
    useEffect(() => {
      if (loadInView) {
        if (isSearch) {
          youtube
            .moreSearch(nowQuery, nextPageToken) //
            .then((data) => {
              setNextPageToken(data.nextPageToken);
              setVideos((prev) => [...prev, ...data.items]);
            });
        } else {
          youtube
            .morePopular(nextPageToken) //
            .then((data) => {
              setNextPageToken(data.nextPageToken);
              setVideos((prev) => [...prev, ...data.items]);
            });
        }
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadInView, youtube]);

    /* Function */
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
        if (query) {
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
            })
            .then(() => setLoading(false));
        } else {
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
            })
            .then(() => setLoading(false));
        }

        setSelectedVideo(null);
        listRef?.current?.scrollIntoView({ behavior: "auto" });
      },
      [youtube]
    );

    const selectVideo = useCallback((video) => {
      setSelectedVideo(video);
      detailRef.current
        ? detailRef?.current?.scrollIntoView({ behavior: "auto" })
        : listRef?.current?.scrollIntoView({ behavior: "auto" });
    }, []);

    /* Render */
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
                isMoreDescription={isMoreDescription}
                setIsMoreDescription={setIsMoreDescription}
                youtube={youtube}
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
                selectVideo={selectVideo}
                display={selectedVideo ? "list" : "grid"}
              />
              <div ref={loadRef}>&nbsp;</div>
            </div>
          )}
          {loading && <div className={styles.loading}></div>}
        </div>
        <Footer />
      </section>
    );
  }
);

export default YoutubeMain;
