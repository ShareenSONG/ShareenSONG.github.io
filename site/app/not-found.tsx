import Link from 'next/link';
import { Localized } from './components/Localized';

export default function NotFound() {
  return (
    <main id="main-content" className="not-found-page" data-title-zh="页面未找到 — 宋艾欣" data-title-en="Page not found — Shareen Song" data-description-zh="这个页面不存在。" data-description-en="This page does not exist.">
      <p><Localized zh="404 / 走远了一点" en="404 / OFF THE MAP" /></p>
      <h1><Localized zh={<>这个页面<br /><em>还不存在。</em></>} en={<>This path has<br /><em>not been designed.</em></>} /></h1>
      <Link href="/" data-cursor="HOME"><Localized zh="返回首页" en="RETURN HOME" /> <span>↗</span></Link>
    </main>
  );
}
