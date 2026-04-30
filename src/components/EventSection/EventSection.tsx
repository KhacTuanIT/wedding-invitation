"use client";

import React from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { EASE_CINEMATIC } from "@/lib/utils";
import styles from "./EventSection.module.css";

const events = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: "Lễ Thành Hôn",
    time: "11:00",
    location: "Nhà Thờ Thánh Tâm",
    address: "123 Đại lộ Tình Yêu, TP. Hồ Chí Minh",
    description:
      "Kính mời bạn cùng chứng kiến khoảnh khắc chúng tôi trao lời nguyện ước trong không gian ấm cúng bên gia đình và bạn bè thân thương.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M17 11h1a3 3 0 0 1 0 6h-1" />
        <path d="M9 12v6" />
        <path d="M13 12v6" />
        <path d="M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 3 11 3s2 .5 3 .5 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5Z" />
        <path d="M5 12H4a2 2 0 1 0 0 4h1" />
        <path d="M5 18H4a2 2 0 1 0 0 4h16a2 2 0 1 0 0-4h-1" />
      </svg>
    ),
    title: "Tiệc Cưới",
    time: "12:00",
    location: "Grand Lotus Ballroom",
    address: "456 Đường Hạnh Phúc, TP. Hồ Chí Minh",
    description:
      "Một buổi tối của ẩm thực, âm nhạc và những lời chúc yêu thương khi chúng tôi bắt đầu chặng đường mới cùng nhau.",
  },
];

export default function EventSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section className={styles.section} id="events" ref={ref}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: EASE_CINEMATIC }}
      >
        <p className="section-subheading">Thông Tin Lễ Cưới</p>
        <h2 className="section-heading">Ngày Chung Đôi</h2>
        <div className="gold-divider" />
      </motion.div>

      <div className={styles.eventsGrid}>
        {events.map((event, i) => (
          <motion.div
            key={event.title}
            className={`${styles.eventCard} glass-card-strong`}
            initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
            animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{
              duration: 1.2,
              delay: 0.2 + i * 0.2,
              ease: EASE_CINEMATIC,
            }}
          >
            <div className={styles.iconWrapper}>{event.icon}</div>
            <h3 className={styles.eventTitle}>{event.title}</h3>

            <div className={styles.eventDetail}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={styles.detailIcon}
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
              <span>{event.time}</span>
            </div>

            <div className={styles.eventDetail}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={styles.detailIcon}
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div>
                <span className={styles.locationName}>{event.location}</span>
                <span className={styles.address}>{event.address}</span>
              </div>
            </div>

            <p className={styles.eventDescription}>{event.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
