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
      { value: '20+', label: 'BRANDS FORMALLY MONITORED' },
      { value: '200+', label: 'INTERNAL USERS' },
      { value: 'SQLITE', label: 'REAL BUSINESS DATA WRITES' },
    ]));
    expect(agent?.boundary).toMatch(/DingTalk.*self-reported/i);
    expect(garden?.research.join(' ')).toMatch(/contacted 114 game studios and Steam developers/i);
    expect(garden?.boundary).toMatch(/not be described as launched/i);
    expect(education?.outcomes).toEqual(expect.arrayContaining([
      { value: '5', label: 'UNIVERSITIES WITH PRODUCT DEPLOYMENT' },
      { value: '15', label: 'UNIVERSITIES COVERED BY SOLUTIONS' },
    ]));
    expect(education?.boundary).toMatch(/team project collection/i);
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

    expect(screen.getByRole('heading', { level: 1, name: /competitive intelligence agent/i })).toBeInTheDocument();
    for (const name of [/why did this project exist/i, /the real problem/i, /evidence before direction/i, /from judgment to a system/i, /what i was responsible for/i]) {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument();
    }
    expect(screen.getByText(/research ≠ insight/i)).toBeInTheDocument();
    expect(screen.getByText(/claim boundary/i)).toBeInTheDocument();
    expect(screen.getByText('200+')).toBeInTheDocument();
  });

  it('creates project-specific metadata without inheriting an unrelated image', async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: 'igarden-motion-game' }) });
    expect(metadata.title).toBe('iGarden Motion Game');
    expect(metadata.description).toMatch(/backyard/i);
    expect(metadata.openGraph).toMatchObject({ images: [] });
  });
});
