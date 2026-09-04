import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="main-content" className="not-found-page">
      <p>404 / OFF THE MAP</p>
      <h1>This path has<br /><em>not been designed.</em></h1>
      <Link href="/" data-cursor="HOME">RETURN HOME <span>↗</span></Link>
    </main>
  );
}
