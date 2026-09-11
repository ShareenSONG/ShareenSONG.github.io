import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import Home from '../app/page';
import SiteChrome from '../app/components/SiteChrome';

const stylesheet = readFileSync(join(process.cwd(), 'app/globals.css'), 'utf8');
const layoutSource = readFileSync(join(process.cwd(), 'app/layout.tsx'), 'utf8');
const chromeSource = readFileSync(join(process.cwd(), 'app/components/SiteChrome.tsx'), 'utf8');

describe('portfolio home page', () => {
  it('introduces Shareen in Chinese and exposes every MVP content area', () => {
    render(<Home />);

    expect(screen.getByRole('heading', { level: 1, name: /宋艾欣.*shareen song/i })).toBeInTheDocument();
    expect(screen.getByText('探索 AI、产品与人类行为如何交汇。')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /把复杂系统/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /技术是基础/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /简历说明做过什么/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /公开思考/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /先是一个人/ })).toBeInTheDocument();
  });

  it('links all three selected projects to full case studies', () => {
    render(<Home />);
    const projectLinks = screen.getAllByRole('link', { name: /查看 .* 项目案例/i });
    expect(projectLinks).toHaveLength(3);
    expect(projectLinks.map((link) => link.getAttribute('href'))).toEqual([
      '/work/igarden-motion-game', '/work/competitive-intelligence-agent', '/work/ai-digital-human-education',
    ]);
  });

  it('implements the soft iridescent editorial direction without sharp polygon artwork', () => {
    expect(stylesheet).toContain('--paper: #f4f4f4');
    expect(stylesheet).toContain('--ink: #242424');
    expect(stylesheet).toContain('--violet: #3b2561');
    expect(stylesheet).toContain("url('/images/iridescent-mesh-desktop.png')");
    expect(stylesheet).toContain("url('/images/iridescent-mesh-mobile.png')");
    expect(stylesheet).toContain('@media (prefers-reduced-motion: reduce)');
    expect(chromeSource).toContain("window.matchMedia('(pointer: fine)')");
    expect(stylesheet).not.toContain('clip-path: polygon');
    expect(stylesheet).not.toContain("'Times New Roman'");
  });

  it('provides a color-safe A4 print layout for PDF export', () => {
    expect(stylesheet).toContain('@media print');
    expect(stylesheet).toContain('@page { size: A4 portrait; margin: 0; }');
    expect(stylesheet).toContain('print-color-adjust: exact !important');
    expect(stylesheet).toContain('break-after: page');
    expect(stylesheet).toContain('.personal-image--portrait { display: none; }');
  });

  it('publishes Chinese-first metadata and initializes the saved language before paint', () => {
    expect(layoutSource).toContain("'https://shareensong.github.io'");
    expect(layoutSource).toContain("url: '/og.png'");
    expect(layoutSource).toContain("images: ['/og.png']");
    expect(layoutSource).toContain('宋艾欣 — AI 产品经理');
    expect(layoutSource).toContain('shareen-language');
    expect(layoutSource).toContain('lang="zh-CN"');
    expect(layoutSource).not.toContain('Style Demo');
  });
});

describe('shared site navigation and language controls', () => {
  it('defaults to Chinese with navigation, contact, resume, and a visible language switch', () => {
    render(<SiteChrome><main id="main-content">页面</main></SiteChrome>);

    expect(screen.getByRole('link', { name: '跳到主要内容' })).toHaveAttribute('href', '#main-content');
    expect(screen.getByRole('navigation', { name: '主导航' })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /简历/i })[0]).toHaveAttribute('href', '/shareen-song-resume.pdf');
    expect(screen.getByRole('button', { name: '当前语言：中文' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('contentinfo')).toHaveTextContent('sax18063135150@163.com');
  });

  it('switches to English in place and persists the explicit choice', async () => {
    render(<SiteChrome><main id="main-content" data-title-zh="中文标题" data-title-en="English title">页面</main></SiteChrome>);
    fireEvent.click(screen.getByRole('button', { name: '切换到英文' }));

    await waitFor(() => expect(document.documentElement).toHaveAttribute('lang', 'en'));
    expect(document.documentElement.dataset.language).toBe('en');
    expect(window.localStorage.getItem('shareen-language')).toBe('en');
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Current language: English' })).toHaveAttribute('aria-pressed', 'true');
    expect(document.title).toBe('English title');
  });

  it('still switches the current page when local storage is unavailable', () => {
    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked'); });
    render(<SiteChrome><main id="main-content">页面</main></SiteChrome>);
    fireEvent.click(screen.getByRole('button', { name: '切换到英文' }));
    expect(document.documentElement).toHaveAttribute('lang', 'en');
    setItem.mockRestore();
  });

  it('contracts on scroll and supports an Escape-closeable mobile menu', () => {
    const { container } = render(<SiteChrome><main id="main-content">页面</main></SiteChrome>);
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 120 });
    fireEvent.scroll(window);
    expect(container.querySelector('.site-header')).toHaveClass('site-header--compact');

    const menuButton = screen.getByRole('button', { name: '打开菜单' });
    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByLabelText('移动端导航').parentElement).toHaveAttribute('aria-hidden', 'false');

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.getByRole('button', { name: '打开菜单' })).toHaveAttribute('aria-expanded', 'false');
  });
});
