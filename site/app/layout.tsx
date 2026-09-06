import type { Metadata } from 'next';
import './globals.css';
import SiteChrome from './components/SiteChrome';

const siteOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? 'https://shareensong.github.io';

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default: 'Shareen Song — AI Product Manager',
    template: '%s — Shareen Song',
  },
  description: 'Portfolio of Shareen Song, an AI product manager turning complex AI capabilities into bounded, verifiable, and deliverable product systems.',
  openGraph: {
    title: 'Shareen Song — AI Product Manager',
    description: 'AI, product judgment, and human behavior—turned into products that can be understood, tested, and delivered.',
    type: 'website',
    images: [{
      url: '/og.png',
      width: 1200,
      height: 630,
      alt: 'Shareen Song — AI Product Manager',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shareen Song — AI Product Manager',
    description: 'AI, product judgment, and human behavior—turned into products that can be understood, tested, and delivered.',
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
      <body><SiteChrome>{children}</SiteChrome></body>
    </html>
  );
}
