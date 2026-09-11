'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { contact } from '../content';

const navigation = [
  { label: '项目', href: '/work' },
  { label: '经历', href: '/#experience' },
  { label: '思考', href: '/thoughts' },
  { label: '生活', href: '/life' },
];

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const [compactHeader, setCompactHeader] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setCompactHeader(window.scrollY > 72);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', menuOpen);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.documentElement.classList.remove('menu-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!finePointer.matches || reducedMotion.matches) return;

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let ringX = pointerX;
    let ringY = pointerY;
    let frame = 0;

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      cursorDot.current?.style.setProperty('transform', `translate3d(${pointerX}px, ${pointerY}px, 0)`);
      const target = event.target instanceof Element ? event.target.closest('[data-cursor]') : null;
      const label = target?.getAttribute('data-cursor') ?? '';
      cursorRing.current?.setAttribute('data-label', label);
      cursorRing.current?.classList.toggle('cursor--active', Boolean(label));
    };

    const animateRing = () => {
      ringX += (pointerX - ringX) * 0.16;
      ringY += (pointerY - ringY) * 0.16;
      cursorRing.current?.style.setProperty('transform', `translate3d(${ringX}px, ${ringY}px, 0)`);
      frame = window.requestAnimationFrame(animateRing);
    };

    document.documentElement.classList.add('has-custom-cursor');
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    frame = window.requestAnimationFrame(animateRing);
    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', onPointerMove);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">跳到主要内容</a>

      <header className={`site-header ${compactHeader ? 'site-header--compact' : ''}`}>
        <Link className="wordmark" href="/" data-cursor="首页" onClick={closeMenu}>
          <span>宋艾欣</span><span className="wordmark-mark" aria-hidden="true">/</span><span>SHAREEN</span>
        </Link>
        <nav className="desktop-nav" aria-label="主导航">
          {navigation.map((item) => <Link href={item.href} data-cursor="前往" key={item.href}>{item.label}</Link>)}
          <a className="resume-link" href={contact.resume} target="_blank" rel="noreferrer" data-cursor="打开">简历 ↗</a>
        </nav>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? '关闭菜单' : '打开菜单'} onClick={() => setMenuOpen((open) => !open)}>
          <span /><span />
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`} id="mobile-navigation" aria-hidden={!menuOpen}>
        <p>站点导航</p>
        <nav aria-label="移动端导航">
          {navigation.map((item, index) => (
            <Link href={item.href} onClick={closeMenu} key={item.href} tabIndex={menuOpen ? 0 : -1}>
              <small>0{index + 1}</small><span>{item.label}</span><i>↗</i>
            </Link>
          ))}
          <a href={contact.resume} target="_blank" rel="noreferrer" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
            <small>05</small><span>简历</span><i>↗</i>
          </a>
        </nav>
      </div>

      {children}

      <footer className="site-footer" id="contact">
        <Image className="footer-form" src="/images/iridescent-form.webp" alt="" width={2200} height={1239} aria-hidden="true" />
        <div className="section-label"><span>06</span><span>联系我</span></div>
        <p className="footer-kicker">关于想法、产品，或一个值得讨论的问题。</p>
        <h2><span>一起做点</span><em>有用的事。</em></h2>
        <div className="footer-links">
          <a href={`mailto:${contact.email}`} data-cursor="邮件"><span>邮箱</span><strong>{contact.email}</strong><i>↗</i></a>
          <a href={contact.github} target="_blank" rel="noreferrer" data-cursor="打开"><span>GitHub</span><strong>@ShareenSONG</strong><i>↗</i></a>
          <a href={contact.resume} target="_blank" rel="noreferrer" data-cursor="打开"><span>简历</span><strong>查看 PDF</strong><i>↗</i></a>
        </div>
        <div className="footer-meta"><span>深圳 · 香港</span><span>© 2026 SHAREEN SONG</span><a href="#main-content">回到顶部 ↑</a></div>
      </footer>

      <div className="cursor-dot" ref={cursorDot} aria-hidden="true" />
      <div className="cursor-ring" ref={cursorRing} aria-hidden="true" />
    </div>
  );
}
