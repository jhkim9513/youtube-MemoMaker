import React from "react";
import MemoCreateForm from "../memo_create_form/memo_create_form";
import styles from "./creator.module.css";

const Creator = ({
  createMemo,
  convertToEmbeddedURL,
  openModal,
  validateURL,
}) => {
  return (
    <section className={styles.creator}>
      <h1 className={styles.title}>Creator</h1>
      <MemoCreateForm
        createMemo={createMemo}
        convertToEmbeddedURL={convertToEmbeddedURL}
        openModal={openModal}
        validateURL={validateURL}
      />
    </section>
  );
};

export default Creator;
