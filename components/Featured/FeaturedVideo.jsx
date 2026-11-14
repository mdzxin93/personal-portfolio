import React, { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";

const FeaturedVideo = ({refForward, ...props }) => {
  const ref = useRef(null);

  const variants = {
    initial: { scale: 1, x: 0, y: 0 },
    animate: { scale: 1.08, x: 0, y: 0 },
  };

  const { scrollYProgress } = useScroll({
    target: refForward,
    layoutEffect: false,
  });

  const [isScaled, setIsScaled] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const shouldScale = value > 0.5;
    setIsScaled((prev) => (prev !== shouldScale ? shouldScale : prev));
  });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="initial"
      animate={isScaled ? "animate" : "initial"}
      className="relative w-full aspect-[3/4] md:aspect-[856/1024] overflow-hidden rounded-3xl shadow-md z-30"
      {...props}
    >
      <Image
        src="/about-portrait.png"
        alt="Mohammed Zain portrait"
        fill
        priority
        unoptimized
        sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 856px"
        className="object-cover object-top"
      />
    </motion.div>
  );
};

export default FeaturedVideo;
