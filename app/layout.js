import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'
import './globals.css'

export const metadata = {
  title: 'Mohammed Zain J | Full-Stack Developer & AI Enthusiast',
  description: 'Mohammed Zain J is a Full-Stack Developer and AI & Information Science Enthusiast based in Mysuru, Karnataka, specializing in scalable web apps, MERN stack, Gemini API, and technical SEO.',
  icons: {
    icon: '/about-portrait.webp',
    shortcut: '/about-portrait.webp',
  },
}

// Tiny script that runs synchronously before the body paints. It reads the
// theme the user previously picked from localStorage and applies the
// corresponding `data-theme` attribute on the <html> element. Without this,
// the page would flash the default light theme for one frame on every reload
// when the user is using dark mode. Default is light when nothing is saved.
const themeBootstrap = `
(function () {
  try {
    var saved = localStorage.getItem('theme');
    var theme = saved === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
  } catch (e) {
    document.documentElement.dataset.theme = 'light';
  }
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
