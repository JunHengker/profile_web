"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// GSAP MAKES THIS FEATURE FOR SUBSCRIPTIONS ONLY
// WELL FINE I'LL DO IT MYSELF
const CYCLES_PER_LETTER = 3;
const SHUFFLE_TIME = 70;
const PAUSE_DURATION = 2000;
const CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

type Props = {
  words: string[];
  cycle?: number;
  shuffleTime?: number;
  pauseDuration?: number;
  customClassName?: string;
};

const ScrambleText: React.FC<Props> = ({
  words,
  cycle,
  shuffleTime,
  pauseDuration,
  customClassName,
}) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [text, setText] = useState(words[0]);
  const TARGET_TEXT = words[currentIndex];

  const scramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / (cycle || CYCLES_PER_LETTER) > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join("");

      setText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, shuffleTime || SHUFFLE_TIME);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current as NodeJS.Timeout);
    setText(TARGET_TEXT);

    pauseTimeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, pauseDuration || PAUSE_DURATION);
  };

  useEffect(() => {
    scramble();

    return () => {
      clearInterval(intervalRef.current as NodeJS.Timeout);
      clearTimeout(pauseTimeoutRef.current as NodeJS.Timeout);
    };
  }, [currentIndex]);

  return (
    <motion.div
      whileHover={{
        scale: 1.025,
      }}
      className="relative overflow-hidden text-glowing"
    >
      <div
        className={customClassName}
        style={{
          animation: "glow 2s linear infinite",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        <span>{text}</span>
      </div>
    </motion.div>
  );
};

export default ScrambleText;
