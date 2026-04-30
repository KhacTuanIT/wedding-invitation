"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_CINEMATIC } from "@/lib/utils";
import styles from "./MusicPlayer.module.css";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
      audioRef.current.src = "/music/wedding-music.mp3"; // Đảm bảo file nhạc này tồn tại trong thư mục public
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // Trình duyệt có thể chặn phát nhạc nếu chưa có tương tác phù hợp.
      });
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className={styles.musicButton}
          onClick={togglePlay}
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.6, ease: EASE_CINEMATIC }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isPlaying ? "Tạm dừng nhạc" : "Phát nhạc"}
          title={isPlaying ? "Tạm dừng nhạc nền" : "Phát nhạc nền"}
        >
          <div
            className={`${styles.iconWrapper} ${isPlaying ? styles.playing : ""}`}
          >
            <div className={styles.bars}>
              <span className={`${styles.bar} ${styles.bar1}`} />
              <span className={`${styles.bar} ${styles.bar2}`} />
              <span className={`${styles.bar} ${styles.bar3}`} />
              <span className={`${styles.bar} ${styles.bar4}`} />
            </div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
