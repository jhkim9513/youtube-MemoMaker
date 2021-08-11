import React, { useRef } from "react";
import Button from "../button/button";
import styles from "./modal.module.css";

const Modal = (props) => {
  const { isModal, close, changeURL, selectedMemo, deleteMemo } = props;
  const isOpen = isModal.isOpen
    ? `${styles.openModal} ${styles.modal}`
    : styles.modal;
  const urlRef = useRef();

  return (
    <div className={isOpen}>
      {isModal.urlChange ? (
        <section className={styles.modalSection}>
          <header className={styles.modalHeader}>
            <h1>URL 주소를 입력해주세요.</h1>
          </header>
          {/* <main>{props.children}</main> */}
          <main className={styles.main}>
            <input
              ref={urlRef}
              className={styles.input}
              type="text"
              name="url"
              placeholder="url"
            />
            <div className={styles.button}>
              <Button
                name="등록"
                onClick={() => {
                  close();
                  changeURL(urlRef.current.value);
                }}
              />
            </div>
          </main>
          <footer className={styles.modalFooter}>
            <Button name="close" onClick={close} />
          </footer>
        </section>
      ) : null}

      {isModal.deleteMemo ? (
        <section className={styles.modalSection}>
          <main className={styles.main}>
            <h1>정말 삭제하시겠습니까?</h1>
            <div className={styles.button}>
              <Button
                name="삭제"
                onClick={() => {
                  deleteMemo(selectedMemo);
                  close();
                }}
              />
            </div>
          </main>

          <footer className={styles.modalFooter}>
            <Button name="close" onClick={close} />
          </footer>
        </section>
      ) : null}

      {isModal.invalidUrl ? (
        <section className={styles.modalSection}>
          <main className={styles.main}>
            <h1>유효하지 않은 youtube url입니다.</h1>
          </main>

          <footer className={styles.modalFooter}>
            <Button name="close" onClick={close} />
          </footer>
        </section>
      ) : null}

      {isModal.emptyTitle ? (
        <section className={styles.modalSection}>
          <main className={styles.main}>
            <h1>제목을 입력해주세요.</h1>
          </main>

          <footer className={styles.modalFooter}>
            <Button name="close" onClick={close} />
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;
