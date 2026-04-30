"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { EASE_CINEMATIC } from "@/lib/utils";
import styles from "./CountdownSection.module.css";

const WEDDING_DATE = new Date("2026-08-12T16:00:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const now = new Date();
  const diff = WEDDING_DATE.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function AnimatedNumber({ value }: { value: number }) {
  const display = String(value).padStart(2, "0");
  return (
    <div className={styles.numberWrapper}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={display}
          className={styles.number}
          initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.5, ease: EASE_CINEMATIC }}
        >
          {display}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
      setTimeLeft(calculateTimeLeft());
    });
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      cancelAnimationFrame(frame);
      clearInterval(timer);
    };
  }, []);

  const units = [
    { value: timeLeft.days, label: "Ngày" },
    { value: timeLeft.hours, label: "Giờ" },
    { value: timeLeft.minutes, label: "Phút" },
    { value: timeLeft.seconds, label: "Giây" },
  ];

  return (
    <section className={styles.section} id="countdown" ref={ref}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: EASE_CINEMATIC }}
      >
        <p className="section-subheading">Hẹn Ngày Chung Đôi</p>
        <div className="gold-divider" />

        <div className={styles.countdown}>
          {units.map((unit, i) => (
            <React.Fragment key={unit.label}>
              <div className={styles.unit}>
                {mounted ? (
                  <AnimatedNumber value={unit.value} />
                ) : (
                  <div className={styles.numberWrapper}>
                    <span className={styles.number}>00</span>
                  </div>
                )}
                <span className={styles.label}>{unit.label}</span>
              </div>
              {i < units.length - 1 && (
                <span className={styles.separator}>:</span>
              )}
            </React.Fragment>
          ))}
        </div>

        <p className={styles.dateText}>12 tháng 8, 2026 / 16:00</p>
      </motion.div>
    </section>
  );
}
