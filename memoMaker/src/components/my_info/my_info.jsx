import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Footer from "../footer/footer";
import Header from "../header/header";
import styles from "./my_info.module.css";
import * as d3 from "d3";

const MyInfo = memo(
  ({ auth, setSelectedMemo, userId, setUserId, memoRepository }) => {
    const history = useHistory();
    const [userName, setUserName] = useState("");
    const [userPhoto, setUserPhoto] = useState("");
    const [numberOfTheme, setNumberOfTheme] = useState([]);
    const svgRef = useRef();
    const [loading, setLoading] = useState(true);

    /* Lifecycle */
    useEffect(() => {
      auth.onAuthChange((user) => {
        if (user) {
          setUserName(user.displayName);
          setUserId(user.uid);
          setUserPhoto(user.photoURL);
        } else {
          history.push("/");
        }
      });
    }, [auth, history, setUserId]);

    useEffect(() => {
      setLoading(true);
      memoRepository.countTheme(userId, (number) => {
        setNumberOfTheme(number);
        setLoading(false);
      });
    }, [memoRepository, userId]);

    useEffect(() => {
      const colorStyle = [styles.light, styles.dark, styles.red, styles.blue];
      const svg = d3.select(svgRef?.current);
      const maxNum = Math.max(...numberOfTheme);
      const chartWidth = 1;
      const duration = 2000;
      const delay = 300;
      const positionYPercent = 25;
      const positionXPercent = 91;

      svg
        .selectAll("rect")
        .data(numberOfTheme)
        .enter()
        .append("rect")
        .attr("height", "13%")
        .attr("y", (d, i) => `${i * positionYPercent}%`)
        .attr("class", (d, i) => colorStyle[i])
        .attr("width", chartWidth)
        .transition()
        .duration(duration)
        .delay((d, i) => i * delay)
        .attr("width", (d) =>
          d !== 0 ? `${(d / maxNum) * positionXPercent - 1}%` : chartWidth
        );

      svg
        .selectAll("text")
        .data(numberOfTheme)
        .enter()
        .append("text")
        .attr("y", (d, i) => `${(i + 0.5) * positionYPercent}%`)
        .attr("x", chartWidth)
        .attr("class", (d, i) => colorStyle[i])
        .text((d) => d)
        .transition()
        .duration(duration)
        .delay((d, i) => i * delay)
        .attr("x", (d, i) => `${(d / maxNum) * positionXPercent}%`);
    }, [numberOfTheme, loading]);

    /* Function */
    const onLogout = useCallback(() => {
      auth.logout();
    }, [auth]);

    const goToMemoMaker = useCallback(
      (memo = null) => {
        history.push("/memoMaker");
        setSelectedMemo(memo);
      },
      [history, setSelectedMemo]
    );

    /* Render */
    return (
      <section className={styles.myInfo}>
        <Header onLogout={onLogout} goToMemoMaker={goToMemoMaker} />
        {!loading && (
          <div className={styles.container}>
            <div className={styles.userInfo}>
              <img
                className={styles.userPhoto}
                src={userPhoto}
                alt="유저 프로필 사진"
              />
              <h2>{`${userName}님`}</h2>
            </div>
            <div className={styles.themeInfo}>
              <p className={styles.themeTitle}>나의 테마 색상별 메모 개수</p>
              <svg className={styles.chart} ref={svgRef}></svg>
            </div>
          </div>
        )}
        {loading && (
          <div className={styles.loadingContainer}>
            <div className={styles.loading}></div>
          </div>
        )}

        <Footer />
      </section>
    );
  }
);

export default MyInfo;
