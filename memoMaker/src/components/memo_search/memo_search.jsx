import React, { memo, useRef } from "react";
import styles from "./memo_search.module.css";

const MemoSearch = memo(({ searchMemo, allCheckedHandler }) => {
  const inputRef = useRef();

  /* Function */
  const handleSearch = () => {
    const value = inputRef.current.value;
    searchMemo(value);
    allCheckedHandler(false);
  };
  const onClick = () => {
    handleSearch();
  };
  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  /* Render */
  return (
    <header className={styles.header}>
      <input
        ref={inputRef}
        className={styles.input}
        type="search"
        placeholder="Search..."
        onKeyPress={onKeyPress}
      />
      <button className={styles.button} type="submit" onClick={onClick}>
        <img
          className={styles.buttonImg}
          src="/images/search.png"
          alt="search"
        />
      </button>
    </header>
  );
});

export default MemoSearch;
