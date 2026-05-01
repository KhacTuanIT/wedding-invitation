"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { assetPath, EASE_ELEGANT, EASE_CINEMATIC } from "@/lib/utils";
import styles from "./InvitationGate.module.css";

interface InvitationGateProps {
  onOpen: () => void;
}

export default function InvitationGate({ onOpen }: InvitationGateProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const hasActivatedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const openInvitation = useCallback(() => {
    if (hasActivatedRef.current) return;

    hasActivatedRef.current = true;
    setIsOpening(true);

    window.setTimeout(() => {
      setIsOpened(true);
      window.setTimeout(onOpen, 1200);
    }, 1800);
  }, [onOpen]);

  return (
    <AnimatePresence>
      {!isOpened && (
        <motion.div
          className={styles.gate}
          ref={containerRef}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: EASE_ELEGANT }}
        >
          <motion.div
            className={styles.background}
            animate={{
              scale: isOpening ? 1.15 : 1.05,
              x: mousePosition.x * -8,
              y: mousePosition.y * -8,
            }}
            transition={{ duration: isOpening ? 4 : 0.8, ease: EASE_ELEGANT }}
          />

          <motion.div
            className={styles.decorLayer}
            animate={{
              x: mousePosition.x * 15,
              y: mousePosition.y * 15,
            }}
            transition={{ duration: 0.6, ease: EASE_ELEGANT }}
          >
            <motion.img
              src={assetPath("/images/floral-corner.png")}
              alt=""
              className={styles.floralTopLeft}
              animate={{
                rotate: isOpening ? -5 : 0,
                scale: isOpening ? 1.1 : 1,
              }}
              transition={{ duration: 2, ease: EASE_CINEMATIC }}
            />
            <motion.img
              src={assetPath("/images/floral-corner.png")}
              alt=""
              className={styles.floralBottomRight}
              animate={{
                rotate: isOpening ? 5 : 0,
                scale: isOpening ? 1.1 : 1,
              }}
              transition={{ duration: 2, ease: EASE_CINEMATIC }}
            />
          </motion.div>

          <div className={styles.envelopeWrapper}>
            <motion.div
              className={`${styles.cover} ${styles.coverLeft}`}
              animate={
                isOpening
                  ? { rotateY: -160, x: "-30%", opacity: 0, scale: 0.9 }
                  : { rotateY: 0, x: 0, opacity: 1, scale: 1 }
              }
              transition={{
                duration: 1.6,
                ease: EASE_CINEMATIC,
                delay: isOpening ? 0.2 : 0,
              }}
            >
              <div className={styles.coverContent}>
                <div className={styles.coverOrnament}>
                  <svg viewBox="0 0 100 100" className={styles.ornamentSvg}>
                    <path
                      d="M50 5 C60 25, 90 30, 95 50 C90 70, 60 75, 50 95 C40 75, 10 70, 5 50 C10 30, 40 25, 50 5Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                    />
                  </svg>
                </div>
                <p className={styles.coverScript}>Lễ Thành Hôn</p>
              </div>
            </motion.div>

            <motion.div
              className={`${styles.cover} ${styles.coverRight}`}
              animate={
                isOpening
                  ? { rotateY: 160, x: "30%", opacity: 0, scale: 0.9 }
                  : { rotateY: 0, x: 0, opacity: 1, scale: 1 }
              }
              transition={{
                duration: 1.6,
                ease: EASE_CINEMATIC,
                delay: isOpening ? 0.35 : 0,
              }}
            >
              <div className={styles.coverContent}>
                <div className={styles.coverOrnament}>
                  <svg viewBox="0 0 100 100" className={styles.ornamentSvg}>
                    <path
                      d="M50 5 C60 25, 90 30, 95 50 C90 70, 60 75, 50 95 C40 75, 10 70, 5 50 C10 30, 40 25, 50 5Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                    />
                  </svg>
                </div>
                <p className={styles.coverDate}>12 . 08 . 2026</p>
              </div>
            </motion.div>

            <motion.button
              type="button"
              className={styles.seal}
              onTouchEnd={(event) => {
                event.preventDefault();
                openInvitation();
              }}
              onClick={openInvitation}
              whileHover={!isOpening ? { scale: 1.08 } : {}}
              whileTap={!isOpening ? { scale: 0.95 } : {}}
              animate={
                isOpening
                  ? {
                      scale: [1, 1.2, 0],
                      rotate: [0, 15, -180],
                      opacity: [1, 1, 0],
                    }
                  : { scale: 1, rotate: 0 }
              }
              transition={{
                duration: isOpening ? 0.8 : 0.3,
                ease: EASE_CINEMATIC,
              }}
              aria-label="Mở thiệp cưới"
            >
              <motion.img
                src={assetPath("/images/wax-seal.png")}
                alt="Dấu niêm phong"
                className={styles.sealImage}
                draggable={false}
                animate={
                  !isOpening
                    ? {
                        boxShadow: [
                          "0 0 20px rgba(212,175,55,0.3)",
                          "0 0 40px rgba(212,175,55,0.5)",
                          "0 0 20px rgba(212,175,55,0.3)",
                        ],
                      }
                    : {}
                }
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {!isOpening && (
                <motion.span
                  className={styles.sealHint}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  chạm để mở
                </motion.span>
              )}
            </motion.button>

            <motion.div
              className={styles.innerPreview}
              animate={
                isOpening
                  ? { opacity: 1, filter: "blur(0px)", scale: 1 }
                  : { opacity: 0, filter: "blur(20px)", scale: 0.9 }
              }
              transition={{
                duration: 1.4,
                delay: isOpening ? 0.8 : 0,
                ease: EASE_CINEMATIC,
              }}
            >
              <p className={styles.innerScript}>Sỹ & A</p>
              <div className={styles.innerDivider} />
              <p className={styles.innerDate}>Trân trọng kính mời</p>
            </motion.div>
          </div>

          <motion.p
            className={styles.bottomText}
            animate={isOpening ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Trân Trọng Kính Mời
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
