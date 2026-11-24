import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

// Inter is the single typeface used everywhere on the site. Loading it through
// next/font exposes a CSS variable (`--font-inter`) we can reference from any
// global CSS rule, while `inter.className` applies it as the default font on
// the body so every component inherits it automatically.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata = {
  title: 'Mohammed Zain J | Full-Stack Developer & AI Enthusiast',
  description: 'Mohammed Zain J is a Full-Stack Developer and AI & Information Science Enthusiast based in Mysuru, Karnataka, specializing in scalable web apps, MERN stack, Gemini API, and technical SEO.',
  icons: {
    icon: '/about-portrait.png',
    shortcut: '/about-portrait.png',
  },
}

// Apply the dark theme before the first paint. A visitor's explicit light
// selection is preserved, while new visitors start in dark mode.
const themeBootstrap = `
(function () {
  try {
    var saved = localStorage.getItem('theme');
    var theme = saved === 'light' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
  } catch (e) {
    document.documentElement.dataset.theme = 'dark';
  }
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} data-theme="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <Script id="theme-bootstrap" strategy="beforeInteractive">
          {themeBootstrap}
        </Script>
        {children}
      </body>
    </html>
  )
}
