import React, { memo } from "react";
import Button from "../button/button";
import styles from "./header.module.css";

const Header = memo(({ onLogout, goToYoutube, goToMemoMaker }) => {
  const header = onLogout ? styles.header : styles.loginHeader;
  const title = onLogout ? styles.title : styles.loginTitle;
  return (
    <header className={header}>
      <h1 className={title}>Youtube Memo Maker</h1>
      {onLogout && (
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
      )}

      {/* Mobile */}
      {onLogout && (
        <div className={styles.buttonBoxMobile}>
          {goToYoutube && (
            <div className={styles.youtubeButton}>
              <Button
                name={<i className="fas fa-search"></i>}
                onClick={() => goToYoutube()}
              />
            </div>
          )}
          {goToMemoMaker && (
            <div className={styles.memoMakerButton}>
              <Button
                name={<i className="fas fa-home"></i>}
                onClick={() => goToMemoMaker()}
              />
            </div>
          )}
          {onLogout && (
            <div className={styles.logout}>
              <Button name="logout" onClick={() => onLogout()} />
            </div>
          )}
        </div>
      )}
    </header>
  );
});

export default Header;
