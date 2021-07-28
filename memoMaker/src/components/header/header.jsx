import React, { memo } from "react";
import styles from "./header.module.css";

const Header = memo(({ onLogout, goToYoutube, goToMemoMaker }) => (
  <header className={styles.header}>
    {onLogout && (
      <button className={styles.logout} onClick={onLogout}>
        Logout
      </button>
    )}
    {true && (
      <button className={styles.searchButton} onClick={() => goToYoutube()}>
        search
      </button>
    )}
    {true && (
      <button className={styles.memoButton} onClick={() => goToMemoMaker()}>
        Memo
      </button>
    )}
    <h1 className={styles.title}>Youtube Memo Maker</h1>
  </header>
));

export default Header;
