'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { contact } from '../content';

type Language = 'zh-CN' | 'en';
const LANGUAGE_KEY = 'shareen-language';

const navigation = [
  { zh: '项目', en: 'Work', href: '/work' },
  { zh: '经历', en: 'Experience', href: '/#experience' },
  { zh: '思考', en: 'Thoughts', href: '/thoughts' },
  { zh: '关于我', en: 'About', href: '/#about' },
  { zh: '生活', en: 'Life', href: '/life' },
];

function applyLanguage(language: Language) {
  const root = document.documentElement;
  root.lang = language;
  root.dataset.language = language;

  document.querySelectorAll<HTMLElement>('[data-label-zh][data-label-en]').forEach((element) => {
    element.setAttribute('aria-label', language === 'zh-CN' ? element.dataset.labelZh! : element.dataset.labelEn!);
  });
  document.querySelectorAll<HTMLImageElement>('img[data-alt-zh][data-alt-en]').forEach((image) => {
    image.alt = language === 'zh-CN' ? image.dataset.altZh! : image.dataset.altEn!;
  });

  const page = document.querySelector<HTMLElement>('main[data-title-zh][data-title-en]');
  if (page) {
    document.title = language === 'zh-CN' ? page.dataset.titleZh! : page.dataset.titleEn!;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description && page.dataset.descriptionZh && page.dataset.descriptionEn) {
      description.content = language === 'zh-CN' ? page.dataset.descriptionZh : page.dataset.descriptionEn;
    }
  }
}

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [language, setLanguage] = useState<Language>('zh-CN');
  const [compactHeader, setCompactHeader] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);
  const isChinese = language === 'zh-CN';

  useEffect(() => {
    const initial = document.documentElement.dataset.language === 'en' ? 'en' : 'zh-CN';
    applyLanguage(initial);
    if (initial === 'en') queueMicrotask(() => setLanguage('en'));
  }, []);

  useEffect(() => {
    const current = document.documentElement.dataset.language === 'en' ? 'en' : 'zh-CN';
    applyLanguage(current);
  }, [pathname]);

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

  const chooseLanguage = (next: Language) => {
    if (next === language) return;
    setLanguage(next);
    applyLanguage(next);
    try { window.localStorage.setItem(LANGUAGE_KEY, next); } catch { /* Current-page switching still works. */ }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">{isChinese ? '跳到主要内容' : 'Skip to content'}</a>

      <header className={`site-header ${compactHeader ? 'site-header--compact' : ''}`}>
        <Link className="wordmark" href="/" data-cursor="HOME" onClick={closeMenu}>
          <span>{isChinese ? '宋艾欣' : 'SHAREEN'}</span><span className="wordmark-mark" aria-hidden="true">/</span><span>{isChinese ? 'SHAREEN' : 'SONG'}</span>
        </Link>
        <p className="header-note">{isChinese ? 'AI 产品 / 产品 / 增长' : 'AI / PRODUCT / GROWTH'}</p>
        <nav className="desktop-nav" aria-label={isChinese ? '主导航' : 'Primary navigation'}>
          {navigation.map((item) => <Link href={item.href} data-cursor="GO" key={item.en}>{isChinese ? item.zh : item.en}</Link>)}
          <a className="resume-link" href={contact.resume} target="_blank" rel="noreferrer" data-cursor="OPEN">{isChinese ? '简历' : 'Resume'} ↗</a>
        </nav>
        <div className="language-switch" role="group" aria-label={isChinese ? '选择网站语言' : 'Choose site language'}>
          <button type="button" aria-pressed={isChinese} aria-label={isChinese ? '当前语言：中文' : '切换到中文'} onClick={() => chooseLanguage('zh-CN')}>中</button>
          <span aria-hidden="true">/</span>
          <button type="button" aria-pressed={!isChinese} aria-label={isChinese ? '切换到英文' : 'Current language: English'} onClick={() => chooseLanguage('en')}>EN</button>
        </div>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? (isChinese ? '关闭菜单' : 'Close menu') : (isChinese ? '打开菜单' : 'Open menu')} onClick={() => setMenuOpen((open) => !open)}>
          <span /><span />
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`} id="mobile-navigation" aria-hidden={!menuOpen}>
        <p>{isChinese ? '选择目的地' : 'SELECT A DIRECTION'}</p>
        <nav aria-label={isChinese ? '移动端导航' : 'Mobile navigation'}>
          {navigation.map((item, index) => (
            <Link href={item.href} onClick={closeMenu} key={item.en} tabIndex={menuOpen ? 0 : -1}>
              <small>0{index + 1}</small><span>{isChinese ? item.zh : item.en}</span><i>↗</i>
            </Link>
          ))}
          <a href={contact.resume} target="_blank" rel="noreferrer" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
            <small>06</small><span>{isChinese ? '简历' : 'Resume'}</span><i>↗</i>
          </a>
        </nav>
      </div>

      {children}

      <footer className="site-footer" id="contact">
        <Image className="footer-form" src="/images/iridescent-form.webp" alt="" width={2200} height={1239} aria-hidden="true" />
        <div className="section-label"><span>06</span><span>{isChinese ? '联系我' : 'CONTACT'}</span></div>
        <p className="footer-kicker">{isChinese ? '关于想法、产品，或一个值得讨论的问题。' : 'Ideas, products, or just a good question.'}</p>
        <h2><span>{isChinese ? '一起做点' : "Let's build"}</span><em>{isChinese ? '有用的事。' : 'something useful.'}</em></h2>
        <div className="footer-links">
          <a href={`mailto:${contact.email}`} data-cursor="MAIL"><span>{isChinese ? '邮箱' : 'EMAIL'}</span><strong>{contact.email}</strong><i>↗</i></a>
          <a href={contact.github} target="_blank" rel="noreferrer" data-cursor="OPEN"><span>GitHub</span><strong>@ShareenSONG</strong><i>↗</i></a>
          <a href={contact.resume} target="_blank" rel="noreferrer" data-cursor="OPEN"><span>{isChinese ? '简历' : 'RESUME'}</span><strong>{isChinese ? '查看 PDF' : 'VIEW PDF'}</strong><i>↗</i></a>
        </div>
        <div className="footer-meta"><span>{isChinese ? '深圳 · 香港' : 'SHENZHEN · HONG KONG'}</span><span>© 2026 SHAREEN SONG</span><a href="#main-content">{isChinese ? '回到顶部' : 'BACK TO TOP'} ↑</a></div>
      </footer>

      <div className="cursor-dot" ref={cursorDot} aria-hidden="true" />
      <div className="cursor-ring" ref={cursorRing} aria-hidden="true" />
    </div>
  );
}
