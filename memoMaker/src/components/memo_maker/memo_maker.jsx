import React, { useCallback, useEffect, useState } from "react";
import Creator from "../creator/creator";
import Footer from "../footer/footer";
import Header from "../header/header";
import MemoList from "../memo_list/memo_list";
import MemoDetail from "../memo_detail/memo_detail";
import Modal from "../modal/modal";
import styles from "./memo_maker.module.css";
import { useHistory } from "react-router-dom";

const MemoMaker = ({
  auth,
  memoRepository,
  createMemo,
  goToMain,
  changeURL,
  goToDetail,
  selectedMemo,
  updateMemo,
  memoList,
  convertToEmbeddedURL,
  deleteMemo,
  setUserId,
  userId,
  setMemoList,
  validateURL,
  isModal,
  openModal,
  closeModal,
}) => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  // 캐시로 등록하여 onLogout이 호출 될 때마다 재생성되는것을 방지
  const onLogout = useCallback(() => {
    auth.logout();
  }, [auth]);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    const stopSync = memoRepository.syncMemo(userId, (memoList) => {
      setMemoList(memoList);
      setLoading(false);
    });

    // unmount할 때 firebase통신을 꺼준다
    return () => stopSync();
  }, [memoRepository, setMemoList, userId]);

  useEffect(() => {
    auth.onAuthChange((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        history.push("/");
      }
    });
  }, [auth, history, setUserId, userId]);

  const goToYoutube = useCallback(() => {
    history.push("/searchYoutube");
  }, [history]);

  const listClass = loading ? styles.listLoading : styles.list;
  return (
    <section className={styles.memoMaker}>
      <Header onLogout={onLogout} goToYoutube={goToYoutube} />
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
            openModal={openModal}
            validateURL={validateURL}
          />

          <div className={listClass}>
            {!loading && (
              <MemoList memoList={memoList} goToDetail={goToDetail} />
            )}
            {loading && <div className={styles.loading}></div>}
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
