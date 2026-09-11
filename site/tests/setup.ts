import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

Object.defineProperty(window, 'matchMedia', {
  configurable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

vi.stubGlobal('requestAnimationFrame', vi.fn(() => 1));
vi.stubGlobal('cancelAnimationFrame', vi.fn());

afterEach(() => {
  cleanup();
  document.documentElement.classList.remove('has-custom-cursor');
  document.documentElement.classList.remove('menu-open');
  document.documentElement.lang = 'zh-CN';
  document.documentElement.dataset.language = 'zh-CN';
  window.localStorage.clear();
});
