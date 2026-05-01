"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InvitationGate from "@/components/InvitationGate/InvitationGate";
import HeroSection from "@/components/HeroSection/HeroSection";
import CountdownSection from "@/components/CountdownSection/CountdownSection";
import CoupleSection from "@/components/CoupleSection/CoupleSection";
import StorySection from "@/components/StorySection/StorySection";
import GallerySection from "@/components/GallerySection/GallerySection";
import EventSection from "@/components/EventSection/EventSection";
import MapSection from "@/components/MapSection/MapSection";
import GiftRegistry from "@/components/GiftRegistry/GiftRegistry";
import MusicPlayer from "@/components/MusicPlayer/MusicPlayer";
import NavigationOverlay from "@/components/NavigationOverlay/NavigationOverlay";
import Footer from "@/components/Footer/Footer";

const easeCinematic: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Home() {
  const [isInvitationOpened, setIsInvitationOpened] = useState(false);

  const handleOpen = useCallback(() => {
    setIsInvitationOpened(true);
    // Enable scrolling after the gate is removed
    document.body.style.overflow = "";
  }, []);

  return (
    <>
      {/* Invitation Gate - shown first */}
      {!isInvitationOpened && <InvitationGate onOpen={handleOpen} />}

      {/* Main Content - revealed after gate opens */}
      <AnimatePresence>
        {isInvitationOpened && (
          <motion.main
            initial={{ opacity: 0, filter: "blur(12px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.4, ease: easeCinematic }}
          >
            <HeroSection />
            <CountdownSection />
            <CoupleSection />
            <StorySection />
            <GallerySection />
            <EventSection />
            <GiftRegistry />
            <MapSection />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>

      {isInvitationOpened && <NavigationOverlay />}
      {isInvitationOpened && <MusicPlayer />}
    </>
  );
}
