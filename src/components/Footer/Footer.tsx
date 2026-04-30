"use client";

import React from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { EASE_CINEMATIC } from "@/lib/utils";
import styles from "./Footer.module.css";

export default function Footer() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <footer className={styles.footer} id="footer" ref={ref}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: EASE_CINEMATIC }}
      >
        <div className={styles.ornament}>
          <div className={styles.ornamentLine} />
          <svg
            viewBox="0 0 24 24"
            className={styles.ornamentHeart}
            fill="currentColor"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <div className={styles.ornamentLine} />
        </div>

        <p className={styles.names}>Sỹ & A</p>
        <p className={styles.date}>12 tháng 8, 2026</p>
        <p className={styles.message}>
          Rất mong được đón tiếp và cùng bạn sẻ chia ngày vui này
        </p>

        <p className={styles.hashtag}>#SyA2026</p>

        <div className={styles.bottomBar}>
          <p className={styles.credit}>Được thực hiện bằng tất cả yêu thương</p>
        </div>
      </motion.div>
    </footer>
  );
}
