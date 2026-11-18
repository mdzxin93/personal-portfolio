import React from "react";
import Image from "next/image";

const FeaturedVideo = (props) => {
  return (
    <div
      className="relative w-full aspect-[3/4] md:aspect-[856/1024] overflow-hidden rounded-3xl shadow-md z-30"
      {...props}
    >
      <Image
        src="/about-portrait.webp"
        alt="Mohammed Zain portrait"
        fill
        loading="lazy"
        quality={80}
        sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 856px"
        className="object-cover object-top"
      />
    </div>
  );
};

export default FeaturedVideo;
