"use client";

/* eslint-disable @next/next/no-img-element */

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { assetPath, EASE_CINEMATIC } from "@/lib/utils";
import styles from "./HeroSection.module.css";

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: EASE_CINEMATIC },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.6, ease: EASE_CINEMATIC },
  },
};

export default function HeroSection() {
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const decorY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -35]);

  return (
    <section className={styles.hero} id="hero">
      <motion.div
        className={styles.bgLayer}
        style={{ y: bgY }}
        initial={{ scale: 1 }}
        animate={{ scale: 1.08 }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      />

      <motion.div
        className={styles.decorLayer}
        style={{ y: decorY }}
        aria-hidden="true"
      >
        <img
          src={assetPath("/images/floral-corner.png")}
          alt=""
          className={styles.floralTopRight}
        />
        <img
          src={assetPath("/images/floral-corner.png")}
          alt=""
          className={styles.floralBottomLeft}
        />
      </motion.div>

      <motion.div
        className={styles.content}
        style={{ y: contentY }}
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.p className={styles.preTitle} variants={fadeUp}>
          Cùng hai bên gia đình
        </motion.p>

        <motion.h1 className={styles.names} variants={fadeUp}>
          <span className={styles.name}>Anh</span>
          <span className={styles.ampersand}>&</span>
          <span className={styles.name}>Binh</span>
        </motion.h1>

        <motion.div className={styles.divider} variants={fadeIn}>
          <div className={styles.dividerLine} />
          <div className={styles.dividerDiamond} />
          <div className={styles.dividerLine} />
        </motion.div>

        <motion.p className={styles.subtitle} variants={fadeUp}>
          Trân trọng kính mời bạn đến dự lễ thành hôn của chúng tôi
        </motion.p>

        <motion.div className={styles.dateBlock} variants={fadeUp}>
          <span className={styles.dateDay}>Thứ Bảy</span>
          <div className={styles.dateBig}>
            <span className={styles.dateMonth}>Tháng 5</span>
            <span className={styles.dateNum}>15</span>
            <span className={styles.dateYear}>2026</span>
          </div>
          <span className={styles.dateTime}>vào lúc 11 giờ sáng</span>
        </motion.div>

        <motion.div className={styles.scrollIndicator} variants={fadeUp}>
          <motion.div
            className={styles.scrollDot}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className={styles.scrollText}>Cuộn để xem tiếp</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
