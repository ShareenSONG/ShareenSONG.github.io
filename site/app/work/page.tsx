import type { Metadata } from 'next';
import Link from 'next/link';
import ProjectArtwork from '../components/ProjectArtwork';
import { additionalWork, projects } from '../content';

export const metadata: Metadata = {
  title: 'Selected Work',
  description: 'Selected AI product, hardware, data, and delivery work by Shareen Song.',
};

export default function WorkPage() {
  return (
    <main id="main-content" className="inner-page">
      <header className="page-hero page-hero--work">
        <div className="page-hero-meta"><span>WORK INDEX</span><span>2024 — 2026</span></div>
        <h1>Selected<br /><em>work.</em></h1>
        <p>Three deep cases about defining the problem, extracting insight, making a product decision, and carrying it into something testable or deliverable.</p>
      </header>

      <section className="work-index" aria-label="Selected case studies">
        {projects.map((project) => (
          <article className="work-index-card" key={project.slug}>
            <Link href={`/work/${project.slug}`} aria-label={`Open ${project.title}`} data-cursor="VIEW">
              <ProjectArtwork project={project} />
            </Link>
            <div className="work-index-copy">
              <div><span>{project.number}</span><span>{project.status}</span><span>{project.year}</span></div>
              <h2><Link href={`/work/${project.slug}`} data-cursor="OPEN">{project.title}</Link></h2>
              <p>{project.subtitle}</p>
              <small>{project.tags.join(' / ')}</small>
            </div>
          </article>
        ))}
      </section>

      <section className="work-archive light-section" aria-labelledby="archive-title">
        <div className="section-label"><span>04</span><span>MORE EXPERIMENTS</span></div>
        <h2 id="archive-title">Breadth, kept<br /><em>in context.</em></h2>
        <div className="archive-list">
          {additionalWork.map(([title, tags, year], index) => (
            <article key={title}>
              <span>0{index + 1}</span><h3>{title}</h3><p>{tags}</p><time>{year}</time>
            </article>
          ))}
        </div>
        <p className="archive-note">These projects support the broader story. Full case studies will be added only when their artifacts and evidence are ready to be shown responsibly.</p>
      </section>
    </main>
  );
}
