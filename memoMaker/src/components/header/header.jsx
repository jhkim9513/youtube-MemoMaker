import React, { memo } from "react";
import Button from "../button/button";
import styles from "./header.module.css";

const Header = memo(({ onLogout, goToYoutube, goToMemoMaker }) => (
  <header className={styles.header}>
    <h1 className={styles.title}>Youtube Memo Maker</h1>
    <div className={styles.buttonBox}>
      {goToYoutube && (
        <div className={styles.youtubeButton}>
          <Button name="youtube 찾아보기" onClick={() => goToYoutube()} />
        </div>
      )}
      {goToMemoMaker && (
        <div className={styles.memoMakerButton}>
          <Button name="메인으로" onClick={() => goToMemoMaker()} />
        </div>
      )}
      {onLogout && (
        <div className={styles.logout}>
          <Button name="로그 아웃" onClick={() => onLogout()} />
        </div>
      )}
    </div>
  </header>
));

export default Header;

/*
<button className={styles.logout} onClick={onLogout}>
  Logout
</button>

<button className={styles.searchButton} onClick={() => goToYoutube()}>
  search
</button>
<button className={styles.memoButton} onClick={() => goToMemoMaker()}>
  Memo
</button>
*/
