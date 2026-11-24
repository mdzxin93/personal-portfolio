import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'
import Script from 'next/script'
import './globals.css'

export const metadata = {
  title: 'Mohammed Zain J | Full-Stack Developer & AI Enthusiast',
  description: 'Mohammed Zain J is a Full-Stack Developer and AI & Information Science Enthusiast based in Mysuru, Karnataka, specializing in scalable web apps, MERN stack, Gemini API, and technical SEO.',
  icons: {
    icon: '/about-portrait.webp',
    shortcut: '/about-portrait.webp',
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
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body>
        <Script id="theme-bootstrap" strategy="beforeInteractive">
          {themeBootstrap}
        </Script>
        {children}
      </body>
    </html>
  )
}
