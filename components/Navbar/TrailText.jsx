import React from "react";
import { useTrail, a } from "@react-spring/web";

export const Trail = ({ open, children, ...props }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    from: { opacity: 0, y: 20, transform: "rotate(4deg)" },
    to: {
      opacity: open ? 1 : 0,
      y: open ? 0 : 20,
      transform: open ? "rotate(0deg)" : "rotate(4deg)",
    },
  });

  return (
    <div {...props}>
      {trail.map((style, index) => (
        <a.div key={index} style={style}>
          {items[index]}
        </a.div>
      ))}
    </div>
  );
};

