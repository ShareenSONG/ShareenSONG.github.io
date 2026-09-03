'use client';

import { useEffect, useRef, useState } from 'react';

const caseStudies = [
  {
    number: '01',
    eyebrow: 'SYSTEM / RESEARCH',
    title: 'Signals into\nstructure.',
    note: 'Placeholder for a flagship case study',
    tone: 'signal',
  },
  {
    number: '02',
    eyebrow: 'PRODUCT / DIRECTION',
    title: 'Ideas into\ninteractions.',
    note: 'Placeholder for a flagship case study',
    tone: 'orbit',
  },
  {
    number: '03',
    eyebrow: 'DELIVERY / PROOF',
    title: 'Intent into\noutcomes.',
    note: 'Placeholder for a flagship case study',
    tone: 'frame',
  },
] as const;

export default function Home() {
  const [compactHeader, setCompactHeader] = useState(false);
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setCompactHeader(window.scrollY > 72);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className={`site-header ${compactHeader ? 'site-header--compact' : ''}`}>
        <a className="wordmark magnetic" href="#top" data-cursor="GO">
          <span>PORTFOLIO</span>
          <span className="wordmark-mark" aria-hidden="true">/</span>
          <span>00</span>
        </a>
        <p className="header-note">BLACK / MOTION / EDITORIAL</p>
        <nav aria-label="Demo sections">
          <a className="flip-link magnetic" href="#work" data-cursor="GO">
            <span data-label="WORK">WORK</span>
          </a>
          <a className="flip-link magnetic" href="#proof" data-cursor="GO">
            <span data-label="METHOD">METHOD</span>
          </a>
          <a className="flip-link magnetic" href="#end" data-cursor="GO">
            <span data-label="INDEX">INDEX</span>
          </a>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-art" aria-hidden="true">
            <div className="hero-halo" />
            <div className="hero-silhouette" />
            <div className="hero-scanline" />
          </div>

          <div className="hero-topline label-row">
            <span>STYLE STUDY</span>
            <span>PHASE 02 / DEMO</span>
            <span>NO PERSONAL DATA</span>
          </div>

          <div className="hero-copy">
            <p className="hero-kicker">A portfolio concept for intelligent products</p>
            <h1 id="hero-title">
              <span className="serif italic">Intelligence</span>
              <span>made tangible.</span>
            </h1>
          </div>

          <div className="hero-footer">
            <p>SCROLL TO ENTER</p>
            <p className="hero-counter"><span>00</span> / 04</p>
            <a href="#work" className="round-link" aria-label="View selected work" data-cursor="DOWN">
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <section className="work-intro" id="work" aria-labelledby="work-title">
          <div className="section-index">
            <span>01</span>
            <span>SELECTED WORK</span>
          </div>
          <div className="work-heading">
            <p>THREE SCENES / PLACEHOLDER CONTENT</p>
            <h2 id="work-title">Work that turns<br /><em>complexity</em> into clarity.</h2>
          </div>
        </section>

        <section className="case-scenes" aria-label="Placeholder case studies">
          {caseStudies.map((item) => (
            <article className={`case-scene case-scene--${item.tone}`} id={`scene-${item.number}`} key={item.number}>
              <div className="case-visual" data-cursor="VIEW" aria-label={`${item.note}: ${item.number}`} role="img">
                <div className="visual-grid" aria-hidden="true" />
                <span className="visual-code" aria-hidden="true">{item.number}</span>
                {item.tone === 'signal' && <div className="signal-map" aria-hidden="true"><i /><i /><i /><i /></div>}
                {item.tone === 'orbit' && <div className="orbit-system" aria-hidden="true"><i /><i /><i /></div>}
                {item.tone === 'frame' && <div className="proof-frame" aria-hidden="true"><span>PROOF</span><i /></div>}
              </div>
              <div className="case-copy">
                <div className="case-meta">
                  <span>{item.number}</span>
                  <span>{item.eyebrow}</span>
                </div>
                <h3>{item.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h3>
                <div className="case-bottom">
                  <p>{item.note}</p>
                  <a href="#proof" aria-label={`Open placeholder case ${item.number}`} data-cursor="OPEN">EXPLORE <span>↗</span></a>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="case-index" aria-labelledby="index-title">
          <div className="section-index section-index--light">
            <span>02</span>
            <span>QUICK INDEX</span>
          </div>
          <h2 id="index-title">A faster way<br />through the work.</h2>
          <div className="index-list">
            {caseStudies.map((item) => (
              <a href={`#scene-${item.number}`} data-cursor="GO" key={item.number}>
                <span>{item.number}</span>
                <strong>{item.title.replace('\n', ' ')}</strong>
                <small>{item.eyebrow}</small>
                <i aria-hidden="true">↗</i>
              </a>
            ))}
          </div>
        </section>

        <section className="proof-editorial" id="proof" aria-labelledby="proof-title">
          <div className="section-index section-index--ink">
            <span>03</span>
            <span>PROOF / METHOD</span>
          </div>
          <div className="proof-lead">
            <p>EDITORIAL MODE</p>
            <h2 id="proof-title">Evidence before<br /><em>decoration.</em></h2>
            <div className="proof-statement">
              <span className="proof-rule" aria-hidden="true" />
              <p>Real artifacts will live here later. For this review, abstract frames verify the intended contrast, pace, type scale, and gallery rhythm.</p>
            </div>
          </div>

          <div className="editorial-gallery">
            <figure>
              <div className="editorial-frame editorial-frame--dark" data-cursor="VIEW">
                <span>01</span>
                <div aria-hidden="true"><i /><i /><i /></div>
                <small>PROCESS</small>
              </div>
              <figcaption><span>ARTIFACT PLACEHOLDER</span><span>RESEARCH / FLOW</span></figcaption>
            </figure>
            <figure>
              <div className="editorial-frame editorial-frame--red" data-cursor="VIEW">
                <span>02</span>
                <div aria-hidden="true"><i /><i /><i /><i /></div>
                <small>BOUNDARY</small>
              </div>
              <figcaption><span>ARTIFACT PLACEHOLDER</span><span>DECISION / PROOF</span></figcaption>
            </figure>
          </div>

          <div className="principles" aria-label="Design principles">
            <p>DESIGN PRINCIPLES</p>
            <ol>
              <li><span>01</span><strong>Cinematic, not theatrical.</strong><small>Black space builds focus; motion explains hierarchy.</small></li>
              <li><span>02</span><strong>Precise, not clinical.</strong><small>Fine rules and evidence sit beside human typography.</small></li>
              <li><span>03</span><strong>Expressive, not noisy.</strong><small>Oxblood appears only where attention is earned.</small></li>
            </ol>
          </div>
        </section>

        <footer className="site-footer" id="end">
          <div className="footer-glow" aria-hidden="true" />
          <div className="footer-labels label-row">
            <span>STYLE REVIEW</span>
            <span>VERSION 01</span>
            <span>SEPTEMBER 2026</span>
          </div>
          <p className="footer-kicker">End of visual direction demo</p>
          <h2><span>Does this feel</span><em>like the right world?</em></h2>
          <a className="footer-return" href="#top" data-cursor="UP">BACK TO TOP <span>↑</span></a>
          <p className="footer-note">All names, metrics, project details, and personal information are intentionally omitted.</p>
        </footer>
      </main>

      <div className="cursor-dot" ref={cursorDot} aria-hidden="true" />
      <div className="cursor-ring" ref={cursorRing} aria-hidden="true" />
    </div>
  );
}
