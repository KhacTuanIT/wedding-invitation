import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { EASE_CINEMATIC } from "@/lib/utils";
import styles from "./StorySection.module.css";

const stories = [
  {
    id: "story1",
    title: "Lần Đầu Gặp Gỡ",
    text: "Giữa hàng triệu người ngoài kia, chúng ta gặp nhau vào một ngày rất đỗi bình thường. Không ai biết rằng khoảnh khắc ấy lại là điểm bắt đầu cho một câu chuyện đặc biệt — nơi hai con người xa lạ dần trở nên quen thuộc, rồi không thể thiếu trong cuộc đời nhau.",
    image: "/images/story1.jpg",
  },
  {
    id: "story3",
    title: "Hành Trình Yêu",
    text: "Hai năm bên nhau là hành trình của những nụ cười, những lần nắm tay thật chặt, và cả những lúc im lặng nhưng vẫn hiểu nhau. Chúng ta đã cùng đi qua những ngày vui vẻ nhất và cả những lúc khó khăn, để rồi nhận ra rằng điều quý giá nhất không phải là những gì ta có, mà là người luôn ở cạnh ta.",
    image: "/images/story3.jpg",
  },
  {
    id: "story4",
    title: "Lời Cầu Hôn",
    text: "Và rồi, vào một ngày không còn bình thường nữa, một câu hỏi giản dị được cất lên: “Em/Anh có đồng ý cùng anh/em đi hết phần đời còn lại không?” Không cần câu trả lời quá dài, chỉ một cái gật đầu — nhưng lại là lời hứa cho cả một chặng đường phía trước. Từ khoảnh khắc ấy, câu chuyện của chúng ta không chỉ là tình yêu, mà là sự bắt đầu của một mái ấm.",
    image: "/images/story4.jpg",
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
  const [imageError, setImageError] = useState(false);

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
        <div className={styles.storyImage}>
          {!imageError ? (
            <Image
              src={story.image}
              alt={story.title}
              width={300}
              height={200}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className={styles.imageFallback}>
              <span>💕</span>
            </div>
          )}
        </div>
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
          <StoryItem key={story.id} story={story} index={i} />
        ))}
      </div>
    </section>
  );
}
