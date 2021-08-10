import React, { memo, useRef } from "react";
import Button from "../button/button";
import styles from "./memo_create_form.module.css";

const MemoCreateForm = memo(
  ({ createMemo, convertToEmbeddedURL, openModal, validateURL }) => {
    const formRef = useRef();
    const titleRef = useRef();
    const themeRef = useRef();
    const urlRef = useRef();
    const contentRef = useRef();

    /* Function */
    const onReset = (e) => {
      e.preventDefault();
      formRef.current.reset();
    };

    const onSubmit = (e) => {
      const validUrl = validateURL(urlRef.current.value);
      e.preventDefault();
      if (validUrl === "" || validUrl) {
        const memo = {
          id: Date.now(), //
          title: titleRef.current.value || "",
          theme: themeRef.current.value,
          url: convertToEmbeddedURL(urlRef.current.value) || "",
          content: contentRef.current.value || "",
          thumbnail: convertToEmbeddedURL(urlRef.current.value, true) || "",
        };
        formRef.current.reset();
        createMemo(memo);
      } else {
        openModal("invalidUrl");
      }
    };

    /* Render */
    return (
      <form ref={formRef} className={styles.form}>
        <div className={styles.inputAndSelectBox}>
          <input
            ref={titleRef}
            className={styles.input}
            type="text"
            name="title"
            placeholder="제목"
          />
          <select ref={themeRef} className={styles.select} name="theme">
            <option value="light">light</option>
            <option value="dark">dark</option>
          </select>
        </div>
        <input
          ref={urlRef}
          className={styles.urlAdd}
          type="text"
          name="url"
          placeholder="youtube url 주소를 입력해주세요."
        />
        <textarea
          ref={contentRef}
          className={styles.textarea}
          name="content"
        ></textarea>

        <div className={styles.btnBox}>
          <Button name="리셋" onClick={onReset} />
          <Button name="만들기" onClick={onSubmit} />
        </div>
      </form>
    );
  }
);

export default MemoCreateForm;
