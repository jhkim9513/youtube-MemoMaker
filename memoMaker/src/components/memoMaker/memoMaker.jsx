import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Creator from "../creator/creator";
import Footer from "../footer/footer";
import Header from "../header/header";
import MemoList from "../memoList/memoList";
import MemoDetail from "../memo_detail/memo_detail";
import Modal from "../modal/modal";
import styles from "./memoMaker.module.css";

const MemoMaker = ({ auth, memoRepository }) => {
  const history = useHistory();
  const historyState = history?.location?.state;
  const [userId, setUserId] = useState(historyState && historyState.id);
  const [selectedMemo, setSelectedMemo] = useState(null);
  const [isModal, setIsModal] = useState({
    isOpen: false,
    urlChange: false,
    deleteMemo: false,
  });
  const [memoList, setMemoList] = useState({
    // 1: {
    //   id: "1",
    //   url: "https://www.youtube.com/embed/NqIJv3jklwU",
    //   title: "youtube title2",
    //   theme: "light",
    //   content: "blablabla~",
    //   thumbnail: "https://img.youtube.com/vi/NqIJv3jklwU/mqdefault.jpg"
    // },
  });

  // 캐시로 등록하여 onLogout이 호출 될 때마다 재생성되는것을 방지
  const onLogout = useCallback(() => {
    auth.logout();
  }, [auth]);

  useEffect(() => {
    if (!userId) return;

    const stopSync = memoRepository.syncMemo(userId, (memoList) => {
      setMemoList(memoList);
    });
    // unmount할 때 firebase통신을 꺼준다
    return () => stopSync();
  }, [memoRepository, userId]);

  useEffect(() => {
    auth.onAuthChange((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        history.push("/");
      }
    });
  }, [auth, history, userId]);

  const createMemo = (memo) => {
    setMemoList((memoList) => {
      const updated = { ...memoList };
      updated[memo.id] = memo;
      return updated;
    });
    memoRepository.saveMemo(userId, memo);
  };

  const updateMemo = (selectedMemo) => {
    setMemoList((memoList) => {
      const updated = { ...memoList };
      updated[selectedMemo.id] = selectedMemo;
      return updated;
    });
    setSelectedMemo(selectedMemo);
    memoRepository.saveMemo(userId, selectedMemo);
  };

  const deleteMemo = (selectedMemo) => {
    setMemoList((memoList) => {
      const updated = { ...memoList };
      delete updated[selectedMemo.id];
      return updated;
    });
    setSelectedMemo(null);
    memoRepository.removeMemo(userId, selectedMemo);
  };

  const goToDetail = (memo) => {
    setSelectedMemo(memo);
  };

  const goToMain = () => {
    setSelectedMemo(null);
  };

  const convertToEmbeddedURL = (url, isThumbnail = false) => {
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
    // 전달한 정규표현식에 맞게 배열로 반환해주는 match()
    const match = url.match(regExp);

    const videoId = match ? match[1] || match[2] : undefined;
    if (isThumbnail && videoId) {
      return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    } else if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  const changeURL = (url) => {
    setSelectedMemo((selectedMemo) => {
      const updated = selectedMemo;
      updated.url = convertToEmbeddedURL(url);
      updated.thumbnail = convertToEmbeddedURL(url, true);
      updateMemo(updated);
      return updated;
    });
  };

  //
  const openModal = (whatOpen) => {
    switch (whatOpen) {
      case "urlChange": {
        setIsModal({ isOpen: true, urlChange: true, deleteMemo: false });
        return;
      }
      case "deleteMemo": {
        setIsModal({ isOpen: true, urlChange: false, deleteMemo: true });
        return;
      }
      default:
        throw new Error(`unknown whatOpen: ${whatOpen}`);
    }
  };
  const closeModal = () => {
    setIsModal({ isOpen: false, urlChange: false, deleteMemo: false });
  };
  //

  return (
    <section className={styles.memoMaker}>
      <Header onLogout={onLogout} />
      {selectedMemo !== null ? (
        <div className={styles.selectedScreen}>
          <div className={styles.detail}>
            <MemoDetail
              selectedMemo={selectedMemo}
              updateMemo={updateMemo}
              goToMain={goToMain}
              openModal={openModal}
            />
          </div>
          <div className={styles.selectModeList}>
            <MemoList
              memoList={memoList}
              goToDetail={goToDetail}
              selectedMemo={selectedMemo}
            />
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <Creator
            createMemo={createMemo}
            convertToEmbeddedURL={convertToEmbeddedURL}
          />
          <div className={styles.list}>
            <MemoList memoList={memoList} goToDetail={goToDetail} />
          </div>
        </div>
      )}

      <Footer />

      {/* 메모 삭제, url변경 모달창 */}
      <Modal
        isModal={isModal}
        close={closeModal}
        changeURL={changeURL}
        selectedMemo={selectedMemo}
        deleteMemo={deleteMemo}
      ></Modal>
    </section>
  );
};

export default MemoMaker;
