import React, { memo } from "react";
import styles from "./footer.module.css";

const Footer = memo(() => (
  <footer className={styles.footer}>
    <h1 className={styles.title}>youtube동영상을 가져와서 메모하기</h1>
  </footer>
));

export default Footer;