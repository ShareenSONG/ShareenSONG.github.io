import { fireEvent, render, screen } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import Home from '../app/page';
import SiteChrome from '../app/components/SiteChrome';

const stylesheet = readFileSync(join(process.cwd(), 'app/globals.css'), 'utf8');
const layoutSource = readFileSync(join(process.cwd(), 'app/layout.tsx'), 'utf8');
const chromeSource = readFileSync(join(process.cwd(), 'app/components/SiteChrome.tsx'), 'utf8');

describe('portfolio home page', () => {
  it('introduces Shareen and exposes every MVP content area', () => {
    render(<Home />);

    expect(screen.getByRole('heading', { level: 1, name: /shareen song/i })).toBeInTheDocument();
    expect(screen.getByText(/exploring how ai, products and human behavior come together/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /complex systems/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /a technical foundation/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /portfolio explains/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /thinking in public/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /a person before/i })).toBeInTheDocument();
  });

  it('links all three selected projects to full case studies', () => {
    render(<Home />);

    const projectLinks = screen.getAllByRole('link', { name: /view .* case study/i });
    expect(projectLinks).toHaveLength(3);
    expect(projectLinks.map((link) => link.getAttribute('href'))).toEqual([
      '/work/igarden-motion-game',
      '/work/competitive-intelligence-agent',
      '/work/ai-digital-human-education',
    ]);
  });

  it('balances the black editorial system with the iridescent presentation palette', () => {
    expect(stylesheet).toContain('--black: #050505');
    expect(stylesheet).toContain('--ivory: #f3f0e9');
    expect(stylesheet).toContain('--ultraviolet: #7136ff');
    expect(stylesheet).toContain('--aqua: #7cf8ee');
    expect(stylesheet).toContain('--acid-mint: #b9ff6a');
    expect(stylesheet).toContain('.hero-gradient-shape');
    expect(stylesheet).toContain('.selected-work { padding-bottom: 96px; border-top: 1px solid rgba(5, 5, 5, 0.18); background: var(--cloud);');
    expect(stylesheet).toContain('.insight-section { min-height: 90svh; background: linear-gradient');
    expect(stylesheet).toContain('@media (prefers-reduced-motion: reduce)');
    expect(chromeSource).toContain("window.matchMedia('(pointer: fine)')");
    expect(stylesheet).not.toContain('--oxblood');
    expect(stylesheet).not.toContain('#ffdf00');
  });

  it('renders the supplied iridescent form as decorative hero artwork', () => {
    const { container } = render(<Home />);
    const artwork = container.querySelector('img.hero-gradient-shape');
    expect(decodeURIComponent(artwork?.getAttribute('src') ?? '')).toContain('/images/iridescent-form.webp');
    expect(artwork).toHaveAttribute('alt', '');
    expect(artwork).toHaveAttribute('aria-hidden', 'true');
  });

  it('provides a color-safe A4 print layout for PDF export', () => {
    expect(stylesheet).toContain('@media print');
    expect(stylesheet).toContain('@page { size: A4 portrait; margin: 0; }');
    expect(stylesheet).toContain('print-color-adjust: exact !important');
    expect(stylesheet).toContain('break-after: page');
    expect(stylesheet).toContain('.personal-image--portrait { display: none; }');
  });

  it('publishes portfolio Open Graph and X metadata', () => {
    expect(layoutSource).toContain("'https://shareensong.github.io'");
    expect(layoutSource).toContain("url: '/og.png'");
    expect(layoutSource).toContain("images: ['/og.png']");
    expect(layoutSource).toContain('Shareen Song — AI Product Manager');
    expect(layoutSource).not.toContain('Style Demo');
  });
});

describe('shared site navigation', () => {
  it('offers primary navigation, contact, and resume access', () => {
    render(<SiteChrome><main id="main-content">Page</main></SiteChrome>);

    expect(screen.getByRole('link', { name: /skip to content/i })).toHaveAttribute('href', '#main-content');
    expect(screen.getByRole('navigation', { name: /primary navigation/i })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /resume/i })[0]).toHaveAttribute('href', '/shareen-song-resume.pdf');
    expect(screen.getByRole('contentinfo')).toHaveTextContent('sax18063135150@163.com');
  });

  it('contracts on scroll and supports an Escape-closeable mobile menu', () => {
    const { container } = render(<SiteChrome><main id="main-content">Page</main></SiteChrome>);
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 120 });
    fireEvent.scroll(window);
    expect(container.querySelector('.site-header')).toHaveClass('site-header--compact');

    const menuButton = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByLabelText('Mobile navigation').parentElement).toHaveAttribute('aria-hidden', 'false');

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.getByRole('button', { name: /open menu/i })).toHaveAttribute('aria-expanded', 'false');
  });
});
