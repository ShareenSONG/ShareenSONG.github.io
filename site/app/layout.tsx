import type { Metadata } from 'next';
import './globals.css';

const siteOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? 'https://black-motion-editorial-style-demo.aixinsong08.chatgpt.site';

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: 'BLACK / MOTION / EDITORIAL — Style Demo',
  description: 'A content-neutral visual direction demo for a cinematic editorial portfolio.',
  openGraph: {
    title: 'BLACK / MOTION / EDITORIAL — Style Demo',
    description: 'A content-neutral visual direction demo for a cinematic editorial portfolio.',
    type: 'website',
    images: [{
      url: '/og.png',
      width: 1730,
      height: 909,
      alt: 'BLACK / MOTION / EDITORIAL — Portfolio Style Demo',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BLACK / MOTION / EDITORIAL — Style Demo',
    description: 'A content-neutral visual direction demo for a cinematic editorial portfolio.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
