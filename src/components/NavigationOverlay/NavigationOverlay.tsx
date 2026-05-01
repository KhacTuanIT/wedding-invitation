"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { EASE_CINEMATIC } from "@/lib/utils";
import styles from "./NavigationOverlay.module.css";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#hero", label: "Lời mời" },
  { href: "#couple", label: "Đôi uyên ương" },
  { href: "#story", label: "Câu chuyện" },
  { href: "#gallery", label: "Album" },
  { href: "#events", label: "Lịch trình" },
  { href: "#gift", label: "Tiền mừng" },
  { href: "#map", label: "Bản đồ" },
];

function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export default function NavigationOverlay() {
  const [isHiddenOnMobile, setIsHiddenOnMobile] = useState(false);
  const [isExpandedOnMobile, setIsExpandedOnMobile] = useState(false);
  const [portalTarget, setPortalTarget] = useState<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const target = document.createElement("div");
    target.id = "navigation-overlay-portal";
    document.body.appendChild(target);
    // eslint-disable-next-line
    setPortalTarget(target);

    return () => {
      document.body.removeChild(target);
    };
  }, []);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = debounce(() => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      const isMobile = window.matchMedia("(max-width: 760px)").matches;

      if (!isMobile) {
        setIsHiddenOnMobile(false);
      } else if (currentScrollY < 80) {
        setIsHiddenOnMobile(false);
      } else if (delta > 8) {
        setIsHiddenOnMobile(true);
      } else if (delta < -8) {
        setIsHiddenOnMobile(false);
      }

      lastScrollY.current = currentScrollY;
    }, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const toggleMobileNav = () => {
    setIsExpandedOnMobile((prev) => !prev);
  };

  const handleLinkClick = () => {
    if (window.matchMedia("(max-width: 760px)").matches) {
      // setIsExpandedOnMobile(false); --- IGNORE ---
    }
  };

  if (!portalTarget) {
    return null;
  }

  return createPortal(
    <motion.nav
      className={`${styles.nav} ${
        isHiddenOnMobile ? styles.navHiddenMobile : ""
      } ${isExpandedOnMobile ? styles.navExpanded : ""} glass-card`}
      initial={{ opacity: 0, y: -18, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1, delay: 1.1, ease: EASE_CINEMATIC }}
      aria-label="Các phần của thiệp cưới"
    >
      <a className={styles.brand} href="#hero" aria-label="Quay lại lời mời">
        A<span>&</span>B
      </a>
      <button
        type="button"
        className={styles.toggleButton}
        onClick={toggleMobileNav}
        aria-expanded={isExpandedOnMobile}
        aria-label={isExpandedOnMobile ? "Thu gọn điều hướng" : "Mở điều hướng"}
      >
        {isExpandedOnMobile ? <X /> : <Menu />}
      </button>
      <div className={styles.links}>
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={styles.link}
            onClick={handleLinkClick}
          >
            {link.label}
          </a>
        ))}
      </div>
    </motion.nav>,
    portalTarget,
  );
}
