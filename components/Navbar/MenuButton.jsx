import React, { useRef, useState } from "react";
import Menu from "./Menu";

const MenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dotsRotation, setDotsRotation] = useState(0);
  const ref = useRef(null);

  const closeMenu = () => {
    setIsOpen(false);
    setDotsRotation(0);
  };

  const handleWindowClick = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      closeMenu();
    }
  };

  const toggleMenu = () => {
    const next = !isOpen;
    setIsOpen(next);
    setDotsRotation(next ? 45 : 0);
  };

  return (
    <>
      <Menu
        open={isOpen}
        onOutsideClick={handleWindowClick}
        onClose={closeMenu}
      />
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className={`nav_btn_lg py-6 flex items-center justify-center cursor-pointer transition-colors duration-200 ${
          isOpen ? "bg-bg-alt" : "bg-brgray hover:bg-bg-alt"
        }`}
        ref={ref}
        onMouseEnter={() => !isOpen && setDotsRotation(90)}
        onMouseLeave={() => !isOpen && setDotsRotation(0)}
        onClick={toggleMenu}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleMenu();
          }
        }}
      >
        <div className="relative flex flex-col h-6 items-center justify-center overflow-hidden">
          <span
            className={`absolute whitespace-nowrap transition-all duration-300 ${
              isOpen ? "-translate-y-3 opacity-0" : "translate-y-0 opacity-100"
            }`}
          >
            MENU&nbsp;&nbsp;
          </span>
          <span
            className={`absolute whitespace-nowrap transition-all duration-300 ${
              isOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            CLOSE&nbsp;&nbsp;
          </span>
        </div>
        <span
          className="transition-transform duration-300"
          style={{ transform: "rotate(" + dotsRotation + "deg)" }}
        >
          •&nbsp;•
        </span>
      </div>
    </>
  );
};

export default MenuButton;
