import React, { memo, useRef } from "react";
import Button from "../button/button";
import styles from "./memo_create_form.module.css";

const MemoCreateForm = memo(({ createMemo }) => {
  const formRef = useRef();
  const titleRef = useRef();
  const themeRef = useRef();
  const urlRef = useRef();
  const contentRef = useRef();

  const onReset = (e) => {
    e.preventDefault();
    formRef.current.reset();
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const memo = {
      id: Date.now(), //
      title: titleRef.current.value || "",
      theme: themeRef.current.value,
      url: convertToEmbeddedURL(urlRef.current.value) || "",
      content: contentRef.current.value || "",
    };
    formRef.current.reset();
    createMemo(memo);
  };

  const convertToEmbeddedURL = (url) => {
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
    // 전달한 정규표현식에 맞게 배열로 반환해주는 match()
    const match = url.match(regExp);

    const youtubeURL = match ? match[1] || match[2] : undefined;
    if (youtubeURL) {
      return `https://www.youtube.com/embed/${youtubeURL}`;
    }
    return url;
  };

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
        className={styles.input}
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
        <Button name="reset" onClick={onReset} />
        <Button name="create" onClick={onSubmit} />
      </div>
    </form>
  );
});

export default MemoCreateForm;
