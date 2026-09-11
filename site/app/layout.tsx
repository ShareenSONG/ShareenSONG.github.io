import type { Metadata } from 'next';
import './globals.css';
import SiteChrome from './components/SiteChrome';

const siteOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? 'https://shareensong.github.io';

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default: '宋艾欣 — AI 产品经理',
    template: '%s — 宋艾欣',
  },
  description: '宋艾欣的个人作品集：AI 产品、产品判断、增长实践与真实项目案例。',
  openGraph: {
    title: '宋艾欣 — AI 产品经理',
    description: '探索 AI、产品与人类行为如何交汇。',
    type: 'website',
    images: [{
      url: '/og.png',
      width: 1200,
      height: 630,
      alt: '宋艾欣 — AI 产品经理',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '宋艾欣 — AI 产品经理',
    description: '探索 AI、产品与人类行为如何交汇。',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" data-language="zh-CN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var l='zh-CN';try{if(localStorage.getItem('shareen-language')==='en')l='en'}catch(e){}document.documentElement.lang=l;document.documentElement.dataset.language=l})();` }} />
      </head>
      <body><SiteChrome>{children}</SiteChrome></body>
    </html>
  );
}
