import type { Metadata, Viewport } from 'next';
import { Space_Mono, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Claude Monitor — Real-time Tool Call Visibility',
  description:
    'See every tool call your Claude agents make in real-time. Monitor file access, shell commands, web searches, and flag sensitive operations instantly.',
  keywords: ['claude', 'claude code', 'ai monitoring', 'tool calls', 'developer tools', 'observability'],
  authors: [{ name: 'Claude Monitor' }],
  openGraph: {
    title: 'Claude Monitor — Real-time Tool Call Visibility',
    description: 'See every tool call your Claude agents make in real-time.',
    type: 'website',
    url: 'https://github.com/ayushrskiaa/claude-monitor',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude Monitor — Real-time Tool Call Visibility',
    description: 'See every tool call your Claude agents make in real-time.',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceMono.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
