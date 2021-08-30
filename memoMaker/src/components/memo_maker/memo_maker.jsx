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
  checkedMemo,
  setCheckedMemo,
  deleteCheckedMemo,
}) => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [isAllChecked, setIsAllChecked] = useState(false);

  /* Lifecycle */
  // 접속한 사용자의 메모 리스트를 불러옴
  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    const stopSync = memoRepository.syncMemo(userId, (memoList) => {
      setMemoList(memoList);
    });
    setLoading(false);

    // unmount할 때 firebase통신을 꺼준다
    return () => stopSync();
  }, [memoRepository, setMemoList, userId]);

  // 사용자가 현재 로그인을 한 상태인지 체크
  useEffect(() => {
    auth.onAuthChange((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        history.push("/");
      }
    });
  }, [auth, history, setUserId, userId]);

  /* Function */
  const onLogout = useCallback(() => {
    auth.logout();
  }, [auth]);

  const goToYoutube = useCallback(() => {
    history.push("/searchYoutube");
  }, [history]);

  const checkedMemoHandler = useCallback(
    (id, isChecked) => {
      if (isChecked) {
        checkedMemo.add(id);
        setCheckedMemo(checkedMemo);
      } else if (!isChecked && checkedMemo.has(id)) {
        checkedMemo.delete(id);
        setCheckedMemo(checkedMemo);
      }
    },
    [checkedMemo, setCheckedMemo]
  );

  const searchMemo = useCallback(
    (query) => {
      setLoading(true);
      query
        ? memoRepository.searchMemo(userId, query, (memoList) => {
            setMemoList(memoList);
          })
        : memoRepository.syncMemo(userId, (memoList) => {
            setMemoList(memoList);
          });
      setLoading(false);
    },
    [memoRepository, setMemoList, userId]
  );

  const allCheckedHandler = useCallback(
    (isChecked) => {
      if (isChecked) {
        setCheckedMemo(
          new Set(Object.keys(memoList).map((key) => memoList[key].id))
        );
        setIsAllChecked(true);
      } else {
        setCheckedMemo(new Set());
        setIsAllChecked(false);
      }
    },
    [memoList, setCheckedMemo]
  );

  /* Render */
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
              <MemoList
                memoList={memoList}
                goToDetail={goToDetail}
                checkedMemoHandler={checkedMemoHandler}
                deleteCheckedMemo={deleteCheckedMemo}
                checkedMemo={checkedMemo}
                openModal={openModal}
                searchMemo={searchMemo}
                isAllChecked={isAllChecked}
                allCheckedHandler={allCheckedHandler}
              />
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
        deleteCheckedMemo={deleteCheckedMemo}
        checkedMemo={checkedMemo}
        allCheckedHandler={allCheckedHandler}
      ></Modal>
    </section>
  );
};

export default MemoMaker;
