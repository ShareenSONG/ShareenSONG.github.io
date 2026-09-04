'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { contact } from '../content';

const navigation = [
  { label: 'WORK', href: '/work' },
  { label: 'EXPERIENCE', href: '/#experience' },
  { label: 'THOUGHTS', href: '/thoughts' },
  { label: 'ABOUT', href: '/#about' },
  { label: 'LIFE', href: '/life' },
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
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className={`site-header ${compactHeader ? 'site-header--compact' : ''}`}>
        <Link className="wordmark magnetic" href="/" data-cursor="HOME" onClick={closeMenu}>
          <span>SHAREEN</span><span className="wordmark-mark" aria-hidden="true">/</span><span>SONG</span>
        </Link>
        <p className="header-note">AI PRODUCT MANAGER</p>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link className="flip-link magnetic" href={item.href} data-cursor="GO" key={item.label}>
              <span data-label={item.label}>{item.label}</span>
            </Link>
          ))}
          <a className="resume-link" href={contact.resume} target="_blank" rel="noreferrer" data-cursor="OPEN">RESUME ↗</a>
        </nav>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span />
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`} id="mobile-navigation" aria-hidden={!menuOpen}>
        <p>SELECT A DIRECTION</p>
        <nav aria-label="Mobile navigation">
          {navigation.map((item, index) => (
            <Link href={item.href} onClick={closeMenu} key={item.label} tabIndex={menuOpen ? 0 : -1}>
              <small>0{index + 1}</small><span>{item.label}</span><i>↗</i>
            </Link>
          ))}
          <a href={contact.resume} target="_blank" rel="noreferrer" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
            <small>06</small><span>RESUME</span><i>↗</i>
          </a>
        </nav>
      </div>

      {children}

      <footer className="site-footer" id="contact">
        <div className="footer-orbit" aria-hidden="true" />
        <div className="section-label section-label--dark"><span>05</span><span>CONTACT</span></div>
        <p className="footer-kicker">Ideas, products, or just a good question.</p>
        <h2><span>Let&apos;s build</span><em>something useful.</em></h2>
        <div className="footer-links">
          <a href={`mailto:${contact.email}`} data-cursor="MAIL"><span>EMAIL</span><strong>{contact.email}</strong><i>↗</i></a>
          <a href={contact.github} target="_blank" rel="noreferrer" data-cursor="OPEN"><span>GITHUB</span><strong>@ShareenSONG</strong><i>↗</i></a>
          <a href={contact.resume} target="_blank" rel="noreferrer" data-cursor="OPEN"><span>RESUME</span><strong>VIEW PDF</strong><i>↗</i></a>
        </div>
        <div className="footer-meta"><span>SHENZHEN · HONG KONG</span><span>© 2026 SHAREEN SONG</span><a href="#top">BACK TO TOP ↑</a></div>
      </footer>

      <div className="cursor-dot" ref={cursorDot} aria-hidden="true" />
      <div className="cursor-ring" ref={cursorRing} aria-hidden="true" />
    </div>
  );
}
