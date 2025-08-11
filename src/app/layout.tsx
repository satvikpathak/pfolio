import { Inter } from 'next/font/google';
import './globals.css';
import ThemeProvider from '../theme-provider';
import ThreeBackground from './components/ThreeBackground';
import Navbar from './components/Navbar';
import InfoBar from './components/InfoBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '[Your Name] Portfolio',
  description: 'A modern portfolio showcasing my skills, projects, and achievements',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
        <ThemeProvider>
          <ThreeBackground />
          <Navbar />
          <InfoBar />
          <main className="relative z-10 min-h-screen">{children}</main>
          <footer className="relative z-10 bg-gray-100 dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 text-center py-4 text-gray-600 dark:text-gray-300">
            <p>&copy; {new Date().getFullYear()} [Your Name]. All rights reserved.</p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}