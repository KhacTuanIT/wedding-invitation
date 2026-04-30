"use client";

import React from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { EASE_CINEMATIC } from "@/lib/utils";
import styles from "./MapSection.module.css";

export default function MapSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section className={styles.section} id="map" ref={ref}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: EASE_CINEMATIC }}
      >
        <p className="section-subheading">Địa Điểm Tổ Chức</p>
        <h2 className="section-heading">Bản Đồ</h2>
        <div className="gold-divider" />
      </motion.div>

      <motion.div
        className={styles.mapWrapper}
        initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
        animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 1.2, delay: 0.2, ease: EASE_CINEMATIC }}
      >
        <div className={`${styles.mapContainer} glass-card`}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.394768!2d106.6875!3d10.7763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ2JzM0LjciTiAxMDbCsDQxJzE1LjAiRQ!5e0!3m2!1sen!2s!4v1234567890"
            className={styles.map}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Địa điểm tổ chức lễ cưới"
          />
        </div>

        <div className={styles.venueInfo}>
          <h3 className={styles.venueName}>Grand Lotus Ballroom</h3>
          <p className={styles.venueAddress}>
            456 Đường Hạnh Phúc, Quận 1, TP. Hồ Chí Minh
          </p>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.directionsLink}
          >
            Xem Chỉ Đường
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.arrowIcon}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
