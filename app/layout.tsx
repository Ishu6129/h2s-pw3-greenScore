import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'GreenScore - Track Your Carbon Footprint',
  description:
    'Gamified carbon tracking platform that helps you understand, track, and reduce your carbon footprint through simple actions and personalized insights.',
  keywords: [
    'carbon footprint',
    'sustainability',
    'climate action',
    'green living',
    'carbon tracker',
  ],
  authors: [{ name: 'GreenScore Team' }],
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#22c55e',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-neutral-950 text-neutral-50 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

// Made with Bob
