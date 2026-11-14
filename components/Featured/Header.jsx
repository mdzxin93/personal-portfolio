"use client";

import React from "react";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.h2
      className="about-display-heading"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="about-display-heading__line">
        <span>Building&nbsp;</span>
        <span>Real</span>
      </span>
      <span className="about-display-heading__line">
        <span>Digital&nbsp;</span>
        <span>Systems</span>
      </span>
    </motion.h2>
  );
};

export default Header;
