"use client";

/* eslint-disable @next/next/no-img-element */

import React from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { assetPath, EASE_CINEMATIC } from "@/lib/utils";
import styles from "./CoupleSection.module.css";

export default function CoupleSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

  return (
    <section className={styles.section} id="couple" ref={ref}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 1, ease: EASE_CINEMATIC }}
      >
        <p className="section-subheading">Cô Dâu & Chú Rể</p>
        <h2 className="section-heading">Anh & Binh</h2>
        <div className="gold-divider" />

        <div className={styles.coupleGrid}>
          <motion.div
            className={styles.person}
            initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
            animate={isVisible ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: EASE_CINEMATIC }}
          >
            <div className={`${styles.imageCard} glass-card`}>
              <div className={styles.imageWrapper}>
                <img
                  src={assetPath("/images/couple.png")}
                  alt="Anh"
                  className={styles.photo}
                  loading="lazy"
                />
              </div>
            </div>
            <h3 className={styles.personName}>Nguyễn Tiến Sỹ</h3>
            <p className={styles.personRole}>Chú Rể</p>
            <p className={styles.personBio}>
              Một tâm hồn ấm áp, chân thành và luôn sẵn sàng cùng người thương
              bước vào hành trình đẹp nhất của cuộc đời.
            </p>
          </motion.div>

          <motion.div
            className={styles.heartDivider}
            initial={{ opacity: 0, scale: 0 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: EASE_CINEMATIC }}
          >
            <svg
              viewBox="0 0 24 24"
              className={styles.heartIcon}
              fill="currentColor"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>

          <motion.div
            className={styles.person}
            initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
            animate={isVisible ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 1.2, delay: 0.4, ease: EASE_CINEMATIC }}
          >
            <div className={`${styles.imageCard} glass-card`}>
              <div className={styles.imageWrapper}>
                <img
                  src={assetPath("/images/couple.png")}
                  alt="Binh"
                  className={styles.photo}
                  loading="lazy"
                />
              </div>
            </div>
            <h3 className={styles.personName}>Trần Thị A</h3>
            <p className={styles.personRole}>Cô Dâu</p>
            <p className={styles.personBio}>
              Dịu dàng, rạng rỡ và đầy yêu thương, là mảnh ghép hoàn hảo cho câu
              chuyện tình yêu này.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
