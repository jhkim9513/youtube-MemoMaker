import React from "react";
import MemoCreateForm from "../memo_create_form/memo_create_form";
import styles from "./creator.module.css";

const Creator = ({ createMemo }) => {
  return (
    <section className={styles.creator}>
      <h1 className={styles.title}>Creator</h1>
      <MemoCreateForm createMemo={createMemo} />
    </section>
  );
};

export default Creator;
