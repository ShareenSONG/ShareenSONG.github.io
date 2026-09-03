import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import Home from '../app/page';

const stylesheet = readFileSync(
  join(process.cwd(), 'app/globals.css'),
  'utf8',
);
const layoutSource = readFileSync(
  join(process.cwd(), 'app/layout.tsx'),
  'utf8',
);

describe('style demo home page', () => {
  it('renders the agreed visual-review structure with placeholder content', () => {
    render(<Home />);

    expect(screen.getByRole('heading', { level: 1, name: /intelligence made tangible/i })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: /demo sections/i })).toBeInTheDocument();
    expect(screen.getAllByText(/placeholder for a flagship case study/i)).toHaveLength(3);
    expect(screen.getByRole('heading', { name: /evidence before decoration/i })).toBeInTheDocument();
    expect(screen.getByText(/personal information are intentionally omitted/i)).toBeInTheDocument();
  });

  it('provides direct anchors for quick browsing and keyboard navigation', () => {
    render(<Home />);

    expect(screen.getByRole('link', { name: /view selected work/i })).toHaveAttribute('href', '#work');
    expect(screen.getByRole('link', { name: /skip to content/i })).toHaveAttribute('href', '#main-content');
    expect(screen.getByRole('link', { name: /back to top/i })).toHaveAttribute('href', '#top');
  });

  it('contracts the navigation after the opening scene', () => {
    const { container } = render(<Home />);
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 120 });

    fireEvent.scroll(window);

    expect(container.querySelector('.site-header')).toHaveClass('site-header--compact');
  });

  it('keeps the approved palette and reduced-motion fallback in the demo', () => {
    expect(stylesheet).toContain('--black: #050505');
    expect(stylesheet).toContain('--ivory: #f3f0e9');
    expect(stylesheet).toContain('--oxblood: #5a1018');
    expect(stylesheet).toContain('@media (prefers-reduced-motion: reduce)');
    expect(stylesheet).not.toContain('#ffdf00');
  });

  it('publishes matching Open Graph and X preview metadata', () => {
    expect(layoutSource).toContain("url: '/og.png'");
    expect(layoutSource).toContain("images: ['/og.png']");
    expect(layoutSource).toContain('BLACK / MOTION / EDITORIAL — Style Demo');
    expect(layoutSource).toContain('https://black-motion-editorial-style-demo.aixinsong08.chatgpt.site');
  });
});
