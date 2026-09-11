import type { Metadata } from 'next';
import Link from 'next/link';
import ProjectArtwork from '../components/ProjectArtwork';
import { Copy, Localized } from '../components/Localized';
import { additionalWork, projects } from '../content';

export const metadata: Metadata = {
  title: '项目',
  description: '宋艾欣的 AI 产品、硬件、数据与交付项目案例。',
};

export default function WorkPage() {
  return (
    <main id="main-content" className="inner-page" data-title-zh="项目 — 宋艾欣" data-title-en="Work — Shareen Song" data-description-zh="宋艾欣的 AI 产品、硬件、数据与交付项目案例。" data-description-en="Selected AI product, hardware, data, and delivery work by Shareen Song.">
      <header className="page-hero page-hero--work">
        <div className="page-hero-meta"><span><Localized zh="项目索引" en="WORK INDEX" /></span><span>2024 — 2026</span></div>
        <h1><Localized zh={<>精选<br /><em>项目。</em></>} en={<>Selected<br /><em>work.</em></>} /></h1>
        <p><Localized zh="三个完整案例：从定义问题、提炼洞察、做出产品判断，到把它推进为可测试或可交付的结果。" en="Three deep cases about defining the problem, extracting insight, making a product decision, and carrying it into something testable or deliverable." /></p>
      </header>

      <section className="work-index" aria-label="精选项目案例 / Selected case studies">
        {projects.map((project) => (
          <article className="work-index-card" key={project.slug}>
            <Link href={`/work/${project.slug}`} aria-label={`打开 ${project.title.zh} / Open ${project.title.en}`} data-cursor="VIEW">
              <ProjectArtwork project={project} />
            </Link>
            <div className="work-index-copy">
              <div><span>{project.number}</span><span><Copy value={project.status} /></span><span>{project.year}</span></div>
              <h2><Link href={`/work/${project.slug}`} data-cursor="OPEN"><Copy value={project.title} /></Link></h2>
              <p><Copy value={project.subtitle} /></p>
              <small>{project.tags.map((tag, index) => <span key={tag.en}><Copy value={tag} />{index < project.tags.length - 1 ? ' / ' : ''}</span>)}</small>
            </div>
          </article>
        ))}
      </section>

      <section className="work-archive light-section" aria-labelledby="archive-title">
        <div className="section-label"><span>04</span><span><Localized zh="更多实验" en="MORE EXPERIMENTS" /></span></div>
        <h2 id="archive-title"><Localized zh={<>保留广度，<br /><em>也保留语境。</em></>} en={<>Breadth, kept<br /><em>in context.</em></>} /></h2>
        <div className="archive-list">
          {additionalWork.map((item, index) => (
            <article key={item.title.en}>
              <span>0{index + 1}</span><h3><Copy value={item.title} /></h3><p><Copy value={item.tags} /></p><time>{item.year}</time>
            </article>
          ))}
        </div>
        <p className="archive-note"><Localized zh="这些项目补全更广的能力图景。只有当产物与证据准备好被负责地呈现时，我才会加入完整案例。" en="These projects support the broader story. Full case studies will be added only when their artifacts and evidence are ready to be shown responsibly." /></p>
      </section>
    </main>
  );
}
