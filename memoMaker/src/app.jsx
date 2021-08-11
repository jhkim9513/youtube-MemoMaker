import Login from "./components/login/login";
import styles from "./app.module.css";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import MemoMaker from "./components/memo_maker/memo_maker";
import YoutubeMain from "./components/youtube/youtube_main/youtube_main";
import { useState } from "react";

function App({ auth, memoRepository, youtube }) {
  const history = useHistory();
  const historyState = history?.location?.state;
  const [userId, setUserId] = useState(historyState && historyState.id);
  const [selectedMemo, setSelectedMemo] = useState(null);
  const [checkedMemo, setCheckedMemo] = useState(new Set());
  const [isModal, setIsModal] = useState({
    isOpen: false,
    urlChange: false,
    deleteMemo: false,
    invalidUrl: false,
    emptyTitle: false,
    deleteCheckedMemo: false,
  });
  const [memoList, setMemoList] = useState({
    // 1: {
    //   id: "1",
    //   url: "https://www.youtube.com/embed/videoID",
    //   title: "youtube title",
    //   theme: "light",
    //   content: "blablabla~",
    //   thumbnail: "https://img.youtube.com/vi/videoID/mqdefault.jpg"
    // },
  });

  /* Function */
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

  const deleteCheckedMemo = (...checkedMemoIds) => {
    setCheckedMemo(new Set());
    checkedMemoIds.forEach((id) => {
      setMemoList((memoList) => {
        const updated = { ...memoList };
        delete updated[id];
        return updated;
      });
      memoRepository.removeCheckedMemo(userId, id);
    });
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
      // return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
      return `//img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    } else if (videoId) {
      // return `https://www.youtube.com/embed/${videoId}`;
      return `//www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  const changeURL = (url) => {
    const validUrl = validateURL(url);
    if (validUrl === "" || validUrl) {
      setSelectedMemo((selectedMemo) => {
        const updated = selectedMemo;
        updated.url = convertToEmbeddedURL(url);
        updated.thumbnail = convertToEmbeddedURL(url, true);
        updateMemo(updated);
        return updated;
      });
    } else {
      openModal("invalidUrl");
    }
  };

  const validateURL = (url) => {
    if (url === "") {
      return url;
    } else {
      const regExp =
        /(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu.be\/)([a-zA-Z0-9-]+)(\?[a-zA-Z0-9-=]+)?/;
      // 전달한 정규표현식에 맞게 배열로 반환해주는 match()
      const match = url.match(regExp);
      const validateUrl = match ? match[0] : undefined;
      return validateUrl;
    }
  };

  const openModal = (whatOpen) => {
    switch (whatOpen) {
      case "urlChange": {
        setIsModal({
          isOpen: true,
          urlChange: true,
          deleteMemo: false,
          invalidUrl: false,
          emptyTitle: false,
          deleteCheckedMemo: false,
        });
        return;
      }
      case "deleteMemo": {
        setIsModal({
          isOpen: true,
          urlChange: false,
          deleteMemo: true,
          invalidUrl: false,
          emptyTitle: false,
          deleteCheckedMemo: false,
        });
        return;
      }
      case "invalidUrl": {
        setIsModal({
          isOpen: true,
          urlChange: false,
          deleteMemo: false,
          invalidUrl: true,
          emptyTitle: false,
          deleteCheckedMemo: false,
        });
        return;
      }
      case "emptyTitle": {
        setIsModal({
          isOpen: true,
          urlChange: false,
          deleteMemo: false,
          invalidUrl: false,
          emptyTitle: true,
          deleteCheckedMemo: false,
        });
        return;
      }
      case "deleteCheckedMemo": {
        setIsModal({
          isOpen: true,
          urlChange: false,
          deleteMemo: false,
          invalidUrl: false,
          emptyTitle: false,
          deleteCheckedMemo: true,
        });
        return;
      }
      default:
        throw new Error(`unknown whatOpen: ${whatOpen}`);
    }
  };
  const closeModal = () => {
    setIsModal({
      isOpen: false,
      urlChange: false,
      deleteMemo: false,
      invalidUrl: false,
      emptyTitle: false,
    });
  };

  /* Render */
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login auth={auth} />
          </Route>
          <Route path="/memoMaker">
            <MemoMaker
              auth={auth}
              memoRepository={memoRepository}
              createMemo={createMemo}
              userId={userId}
              goToMain={goToMain}
              goToDetail={goToDetail}
              selectedMemo={selectedMemo}
              updateMemo={updateMemo}
              memoList={memoList}
              setMemoList={setMemoList}
              convertToEmbeddedURL={convertToEmbeddedURL}
              deleteMemo={deleteMemo}
              setUserId={setUserId}
              changeURL={changeURL}
              validateURL={validateURL}
              isModal={isModal}
              openModal={openModal}
              closeModal={closeModal}
              checkedMemo={checkedMemo}
              setCheckedMemo={setCheckedMemo}
              deleteCheckedMemo={deleteCheckedMemo}
            />
          </Route>
          <Route exact path="/searchYoutube">
            <YoutubeMain
              auth={auth}
              youtube={youtube}
              createMemo={createMemo}
              setSelectedMemo={setSelectedMemo}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
