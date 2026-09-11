import Link from 'next/link';
import { Localized } from './components/Localized';

export default function NotFound() {
  return (
    <main id="main-content" className="not-found-page">
      <p><Localized zh="404 / 走远了一点" en="404 / OFF THE MAP" /></p>
      <h1><Localized zh={<>这个页面<br /><em>还不存在。</em></>} en={<>This path has<br /><em>not been designed.</em></>} /></h1>
      <Link href="/" data-cursor="首页"><Localized zh="返回首页" en="RETURN HOME" /> <span>↗</span></Link>
    </main>
  );
}
