"use client";

import React from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { EASE_CINEMATIC } from "@/lib/utils";
import styles from "./StorySection.module.css";

const stories = [
  {
    year: "2020",
    title: "Lần Đầu Gặp Gỡ",
    text: "Trong một buổi chiều dịu nhẹ, định mệnh đã đưa hai tâm hồn đến gần nhau trong một cuộc gặp gỡ tình cờ. Từ một câu chuyện giản đơn, tình yêu lặng lẽ nảy mầm và mở ra hành trình của mãi mãi.",
  },
  {
    year: "2021",
    title: "Buổi Hẹn Đầu",
    text: "Một quán cà phê yên tĩnh, hương cà phê mới pha và tiếng mưa rất khẽ ngoài hiên. Thời gian như trôi nhanh hơn khi cả hai nhận ra những ước mơ chung, những hy vọng thầm thì và một sự kết nối khó gọi thành lời.",
  },
  {
    year: "2023",
    title: "Hành Trình Yêu",
    text: "Qua những mùa của tiếng cười và cả những giọt nước mắt, qua những hoàng hôn cùng ngắm và những buổi sáng bình yên bên nhau, tình yêu ấy lớn dần trong tin tưởng, kiên nhẫn và niềm vui.",
  },
  {
    year: "2025",
    title: "Lời Cầu Hôn",
    text: "Dưới bầu trời đầy sao, trong tiếng sóng biển dịu dàng làm chứng, anh đã ngỏ lời cho một hành trình mới. Và trong niềm hạnh phúc vỡ òa, cô ấy đã gật đầu.",
  },
];

function StoryItem({
  story,
  index,
}: {
  story: (typeof stories)[0];
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      className={styles.storyItem}
      initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
      animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{
        duration: 1.2,
        delay: index * 0.1,
        ease: EASE_CINEMATIC,
      }}
    >
      <div className={styles.timeline}>
        <div className={styles.timelineDot} />
        <div className={styles.timelineLine} />
      </div>
      <div className={styles.storyContent}>
        <span className={styles.storyYear}>{story.year}</span>
        <h3 className={styles.storyTitle}>{story.title}</h3>
        <p className={styles.storyText}>{story.text}</p>
      </div>
    </motion.div>
  );
}

export default function StorySection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section className={styles.section} id="story" ref={ref}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: EASE_CINEMATIC }}
      >
        <p className="section-subheading">Hành Trình Của Chúng Tôi</p>
        <h2 className="section-heading">Câu Chuyện Tình Yêu</h2>
        <div className="gold-divider" />
      </motion.div>

      <div className={styles.storyList}>
        {stories.map((story, i) => (
          <StoryItem key={story.year} story={story} index={i} />
        ))}
      </div>
    </section>
  );
}
