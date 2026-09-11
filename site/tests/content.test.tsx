import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { projects, thoughtTopics } from '../app/content';
import ProjectPage, { generateMetadata, generateStaticParams } from '../app/work/[slug]/page';

describe('portfolio content contract', () => {
  it('uses the three evidence-ready flagship projects', () => {
    expect(projects.map((project) => project.slug)).toEqual([
      'igarden-motion-game',
      'competitive-intelligence-agent',
      'ai-digital-human-education',
    ]);
    expect(generateStaticParams()).toEqual(projects.map((project) => ({ slug: project.slug })));
  });

  it('preserves confirmed metrics and their claim boundaries', () => {
    const agent = projects.find((project) => project.slug === 'competitive-intelligence-agent');
    const garden = projects.find((project) => project.slug === 'igarden-motion-game');
    const education = projects.find((project) => project.slug === 'ai-digital-human-education');

    expect(agent?.outcomes).toEqual(expect.arrayContaining([
      { value: '20+', label: { zh: '正式监控品牌', en: 'BRANDS FORMALLY MONITORED' } },
      { value: '200+', label: { zh: '内部用户', en: 'INTERNAL USERS' } },
      { value: 'SQLite', label: { zh: '真实业务数据写入', en: 'REAL BUSINESS DATA WRITES' } },
    ]));
    expect(agent?.boundary.zh).toMatch(/自报结果/);
    expect(garden?.research.map((item) => item.zh).join(' ')).toMatch(/联系 114 家游戏工作室与 Steam 开发者/);
    expect(garden?.boundary.zh).toMatch(/不应描述为已经上线/);
    expect(education?.outcomes).toEqual(expect.arrayContaining([
      { value: '5', label: { zh: '高校完成产品部署', en: 'UNIVERSITIES WITH PRODUCT DEPLOYMENT' } },
      { value: '15', label: { zh: '高校方案覆盖', en: 'UNIVERSITIES COVERED BY SOLUTIONS' } },
    ]));
    expect(education?.boundary.zh).toMatch(/团队累计项目回款/);
  });

  it('keeps unpublished thoughts as drafts without fabricated links', () => {
    expect(thoughtTopics[0].href).toBe('https://github.com/ShareenSONG/');
    expect(thoughtTopics.slice(1).every((thought) => thought.href === undefined)).toBe(true);
  });
});

describe('project detail template', () => {
  it('renders the full reasoning arc and case-specific evidence', async () => {
    const page = await ProjectPage({ params: Promise.resolve({ slug: 'competitive-intelligence-agent' }) });
    render(page);

    expect(screen.getByRole('heading', { level: 1, name: /竞品监控 Agent/i })).toBeInTheDocument();
    for (const name of [/为什么会有.*这个项目/i, /真正的问题/i, /先看证据.*再定方向/i, /从判断.*到系统/i, /我具体.*负责什么/i]) {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument();
    }
    expect(screen.getByText(/研究 ≠ 洞察/i)).toBeInTheDocument();
    expect(screen.getByText(/成果口径与边界/i)).toBeInTheDocument();
    expect(screen.getByText('200+')).toBeInTheDocument();
  });

  it('creates project-specific metadata without inheriting an unrelated image', async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: 'igarden-motion-game' }) });
    expect(metadata.title).toBe('iGarden 体感游戏');
    expect(metadata.description).toMatch(/北美后院/);
    expect(metadata.openGraph).toMatchObject({ images: [] });
  });
});
