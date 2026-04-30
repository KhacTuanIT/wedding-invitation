"use client";

/* eslint-disable @next/next/no-img-element */

import React, { useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { assetPath, EASE_CINEMATIC } from "@/lib/utils";
import styles from "./GallerySection.module.css";

const galleryImages = [
  { src: "/images/gallery-1.png", alt: "Không gian tiệc cưới lúc hoàng hôn" },
  { src: "/images/gallery-2.png", alt: "Chi tiết nhẫn cưới" },
  { src: "/images/gallery-3.png", alt: "Bàn tiệc được chuẩn bị tinh tế" },
  { src: "/images/gallery-4.png", alt: "Khoảnh khắc bên nhau trong khu vườn" },
  { src: "/images/gallery-5.png", alt: "Bó hoa cưới dịu dàng" },
  { src: "/images/gallery-6.png", alt: "Điệu nhảy đầu tiên" },
];

export default function GallerySection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const thumbnailScrollerRef = useRef<HTMLDivElement | null>(null);
  const thumbnailRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % galleryImages.length : null,
    );
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + galleryImages.length) % galleryImages.length
        : null,
    );
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeLightbox, goNext, goPrev, lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const scroller = thumbnailScrollerRef.current;
    const thumbnail = thumbnailRefs.current[lightboxIndex];
    if (!scroller || !thumbnail) return;

    const targetLeft =
      thumbnail.offsetLeft -
      scroller.clientWidth / 2 +
      thumbnail.clientWidth / 2;

    scroller.scrollTo({
      left: targetLeft,
      behavior: "smooth",
    });
  }, [lightboxIndex]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const lightbox =
    typeof document !== "undefined" && lightboxIndex !== null
      ? createPortal(
          <AnimatePresence>
            <motion.div
              className={styles.lightbox}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE_CINEMATIC }}
              onClick={closeLightbox}
            >
              <motion.div
                className={styles.lightboxContent}
                initial={{ scale: 0.96, opacity: 0, filter: "blur(10px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                exit={{ scale: 0.96, opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.55, ease: EASE_CINEMATIC }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.carouselStage}>
                  <div className={styles.lightboxImageViewport}>
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={galleryImages[lightboxIndex].src}
                        src={assetPath(galleryImages[lightboxIndex].src)}
                        alt={galleryImages[lightboxIndex].alt}
                        className={styles.lightboxImage}
                        initial={{
                          opacity: 0,
                          scale: 0.96,
                          filter: "blur(10px)",
                        }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 1.02, filter: "blur(8px)" }}
                        transition={{ duration: 0.5, ease: EASE_CINEMATIC }}
                      />
                    </AnimatePresence>
                  </div>

                  <button
                    className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
                    onClick={goPrev}
                  aria-label="Ảnh trước"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    className={`${styles.lightboxNav} ${styles.lightboxNext}`}
                    onClick={goNext}
                  aria-label="Ảnh tiếp theo"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>

                <div className={styles.carouselMeta}>
                  <span className={styles.imageTitle}>
                    {galleryImages[lightboxIndex].alt}
                  </span>
                  <span className={styles.lightboxCounter}>
                    {String(lightboxIndex + 1).padStart(2, "0")} /{" "}
                    {String(galleryImages.length).padStart(2, "0")}
                  </span>
                </div>

                <div
                  ref={thumbnailScrollerRef}
                  className={styles.thumbnailCarousel}
                  aria-label="Bộ ảnh cưới"
                >
                  {galleryImages.map((image, index) => (
                    <button
                      key={image.src}
                      ref={(node) => {
                        thumbnailRefs.current[index] = node;
                      }}
                      className={`${styles.thumbnailButton} ${
                        index === lightboxIndex ? styles.thumbnailActive : ""
                      }`}
                      onClick={() => setLightboxIndex(index)}
                      aria-label={`Xem ảnh ${index + 1}`}
                      aria-current={index === lightboxIndex}
                    >
                      <img
                        src={assetPath(image.src)}
                        alt=""
                        className={styles.thumbnailImage}
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              </motion.div>

              <button
                className={styles.lightboxClose}
                onClick={closeLightbox}
                aria-label="Đóng bộ ảnh"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </AnimatePresence>,
          document.body,
        )
      : null;

  return (
    <>
      <section className={styles.section} id="gallery" ref={ref}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: EASE_CINEMATIC }}
        >
          <p className="section-subheading">Những Khoảnh Khắc Đáng Nhớ</p>
          <h2 className="section-heading">Album Ảnh</h2>
          <div className="gold-divider" />
        </motion.div>

        <div className={styles.grid}>
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.src}
              className={styles.gridItem}
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              animate={
                isVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
              }
              transition={{
                duration: 1,
                delay: 0.1 * i,
                ease: EASE_CINEMATIC,
              }}
              onClick={() => openLightbox(i)}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={assetPath(img.src)}
                  alt={img.alt}
                  className={styles.image}
                  loading="lazy"
                />
                <div className={styles.imageOverlay}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className={styles.zoomIcon}
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                    <path d="M11 8v6M8 11h6" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {lightbox}
    </>
  );
}
