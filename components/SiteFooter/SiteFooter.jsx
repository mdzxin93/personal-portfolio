"use client";

import React from "react";

const Icon = ({ children }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

const InstagramIcon = () => (
  <Icon>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </Icon>
);

const TikTokIcon = () => (
  <Icon>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </Icon>
);

const YoutubeIcon = () => (
  <Icon>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </Icon>
);

const LinkedinIcon = () => (
  <Icon>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </Icon>
);

const GithubIcon = () => (
  <Icon>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </Icon>
);

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.476-.15-.676.15-.2.301-.777.98-.953 1.18-.175.2-.351.226-.652.075-.301-.15-1.272-.468-2.423-1.495-.895-.798-1.5-1.785-1.676-2.086-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.2-.301.301-.502.1-.2.05-.376-.025-.527-.075-.15-.677-1.633-.927-2.236-.244-.587-.493-.507-.677-.517-.176-.01-.376-.01-.577-.01-.2 0-.527.075-.803.376s-1.054 1.03-1.054 2.511 1.079 2.913 1.23 3.114c.15.2 2.123 3.243 5.143 4.545.719.31 1.28.496 1.717.635.722.23 1.379.197 1.899.12.579-.087 1.78-.728 2.031-1.431.25-.703.25-1.305.175-1.431-.075-.126-.276-.201-.577-.352zm-5.466 7.618h-.005a10.02 10.02 0 0 1-5.112-1.396l-.367-.218-3.799.996 1.014-3.702-.239-.38a10.028 10.028 0 0 1-1.536-5.32c0-5.539 4.507-10.045 10.05-10.045 2.684.001 5.207 1.047 7.106 2.946a10.007 10.007 0 0 1 2.945 7.105c-.002 5.54-4.508 10.046-10.046 10.046zm8.525-18.57A11.94 11.94 0 0 0 12.006 0C5.385 0 .003 5.382.003 12.003c0 2.112.551 4.174 1.6 5.993L0 24l6.173-1.619a11.97 11.97 0 0 0 5.833 1.508h.005c6.621 0 12.003-5.382 12.003-12.003a11.94 11.94 0 0 0-3.489-8.459z"/>
  </svg>
);

const SiteFooter = () => {
  return (
    <footer id="main-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h1 className="f-logo">MOHAMMED ZAIN</h1>
          <p className="f-desc">
            Full-Stack Developer &amp; AI Enthusiast. <br />
            Building scalable web applications, MERN platforms, and intelligent AI solutions.
          </p>
          <div className="f-socials">
            <a
              href="https://github.com/mdzxin93"
              target="_blank"
              rel="noreferrer"
              title="GitHub"
              aria-label="GitHub"
            >
              <GithubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/mohammed-zain-j-437987293/"
              target="_blank"
              rel="noreferrer"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <LinkedinIcon />
            </a>
            <a
              href="https://www.instagram.com/the_mohxmmed_zxin17/"
              target="_blank"
              rel="noreferrer"
              title="Instagram"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://wa.me/917975788275"
              target="_blank"
              rel="noreferrer"
              title="WhatsApp"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon />
            </a>
          </div>
        </div>
        <div className="footer-links">
          <div className="f-col">
            <h3>SOCIALS</h3>
            <a href="https://github.com/mdzxin93" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/mohammed-zain-j-437987293/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com/the_mohxmmed_zxin17/" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://wa.me/917975788275" target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Mohammed Zain J. All rights reserved.</p>
        <p>Built with Next.js &amp; Tailwind CSS</p>
      </div>
    </footer>
  );
};

export default SiteFooter;
