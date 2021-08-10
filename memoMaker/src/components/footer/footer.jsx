import React, { memo } from "react";
import styles from "./footer.module.css";

const Footer = memo(() => (
  <footer className={styles.footer}>
    <h1 className={styles.title}>
      동영상 소유자가 다른 웹사이트에서 재생할 수 없도록 설정한것은 이용이
      불가능합니다.
    </h1>
  </footer>
));

export default Footer;
