import React from "react";

export const Trail = ({ open, children, ...props }) => {
  const items = React.Children.toArray(children);

  return (
    <div {...props}>
      {items.map((child, index) => (
        <div
          key={index}
          style={{
            opacity: open ? 1 : 0,
            transform: open
              ? "translateY(0) rotate(0deg)"
              : "translateY(20px) rotate(4deg)",
            transition: `opacity 450ms ease ${index * 60}ms, transform 450ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 60}ms`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};
