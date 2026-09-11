import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProjectArtwork from '../../components/ProjectArtwork';
import { Copy, Localized } from '../../components/Localized';
import { projects } from '../../content';

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};

  return {
    title: project.title.zh,
    description: project.summary.zh,
    openGraph: { title: project.title.zh, description: project.summary.zh, images: [] },
    twitter: { title: project.title.zh, description: project.summary.zh, images: [] },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  if (projectIndex === -1) notFound();

  const project = projects[projectIndex];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <main id="main-content" className="inner-page case-page">
      <header className="case-hero">
        <div className="case-hero-top"><span><Localized zh={`案例 ${project.number}`} en={`CASE ${project.number}`} /></span><span><Copy value={project.status} /></span><span>{project.year}</span></div>
        <h1><Copy value={project.title} /></h1>
        <p><Copy value={project.subtitle} /></p>
        <ProjectArtwork project={project} />
        <dl className="case-facts">
          <div><dt><Localized zh="我的角色" en="ROLE" /></dt><dd><Copy value={project.role} /></dd></div>
          <div><dt><Localized zh="时间" en="TIMELINE" /></dt><dd><Copy value={project.timeline} /></dd></div>
          <div><dt><Localized zh="团队" en="TEAM" /></dt><dd><Copy value={project.team} /></dd></div>
          <div><dt><Localized zh="平台" en="PLATFORM" /></dt><dd><Copy value={project.platform} /></dd></div>
        </dl>
      </header>

      <section className="case-reading-section" aria-labelledby="context-title">
        <div className="case-section-label"><span>01</span><span><Localized zh="背景" en="CONTEXT" /></span></div>
        <div className="case-reading-copy"><h2 id="context-title"><Localized zh={<>为什么会有<br /><em>这个项目？</em></>} en={<>Why did this<br /><em>project exist?</em></>} /></h2><p><Copy value={project.context} /></p></div>
      </section>

      <section className="case-reading-section light-section" aria-labelledby="problem-title">
        <div className="case-section-label"><span>02</span><span><Localized zh="问题" en="PROBLEM" /></span></div>
        <div className="case-reading-copy"><h2 id="problem-title"><Localized zh="真正的问题。" en="The real problem." /></h2><p className="case-large-copy"><Copy value={project.problem} /></p></div>
      </section>

      <section className="case-reading-section" aria-labelledby="research-title">
        <div className="case-section-label"><span>03</span><span><Localized zh="研究" en="RESEARCH" /></span></div>
        <div className="case-reading-copy">
          <h2 id="research-title"><Localized zh={<>先看证据，<br /><em>再定方向。</em></>} en={<>Evidence before<br /><em>direction.</em></>} /></h2>
          <ol className="case-list">
            {project.research.map((item, index) => <li key={item.en}><span>0{index + 1}</span><p><Copy value={item} /></p></li>)}
          </ol>
        </div>
      </section>

      <section className="insight-section" aria-labelledby="insight-title">
        <div className="case-section-label"><span>04</span><span><Localized zh="洞察" en="INSIGHT" /></span></div>
        <blockquote id="insight-title">“<Copy value={project.insight} />”</blockquote>
        <p><Localized zh="研究 ≠ 洞察" en="RESEARCH ≠ INSIGHT" /></p>
      </section>

      <section className="decision-section light-section" aria-labelledby="decision-title">
        <div className="case-section-label"><span>05</span><span><Localized zh="产品决策" en="PRODUCT DECISION" /></span></div>
        <div>
          <p><Localized zh="因此，我选择……" en="THEREFORE, WE DECIDED TO…" /></p>
          <h2 id="decision-title"><Copy value={project.decision} /></h2>
        </div>
      </section>

      <section className="case-reading-section" aria-labelledby="solution-title">
        <div className="case-section-label"><span>06</span><span><Localized zh="解决方案" en="SOLUTION" /></span></div>
        <div className="case-reading-copy">
          <h2 id="solution-title"><Localized zh={<>从判断，<br /><em>到系统。</em></>} en={<>From judgment<br /><em>to a system.</em></>} /></h2>
          <ol className="case-list case-list--solution">
            {project.solution.map((item, index) => <li key={item.en}><span>0{index + 1}</span><p><Copy value={item} /></p></li>)}
          </ol>
        </div>
      </section>

      <section className="role-outcome light-section" aria-labelledby="role-title">
        <div className="role-column">
          <div className="case-section-label"><span>07</span><span><Localized zh="我的角色" en="MY ROLE" /></span></div>
          <h2 id="role-title"><Localized zh={<>我具体<br /><em>负责什么。</em></>} en={<>What I was<br /><em>responsible for.</em></>} /></h2>
          <ul>{project.responsibilities.map((item) => <li key={item.en}><Copy value={item} /></li>)}</ul>
        </div>
        <div className="outcome-column">
          <div className="case-section-label"><span>08</span><span><Localized zh="成果" en="OUTCOME" /></span></div>
          <div className="outcome-grid">
            {project.outcomes.map((item) => <div key={item.label.en}><strong>{item.value}</strong><span><Copy value={item.label} /></span></div>)}
          </div>
          <aside><span><Localized zh="成果口径与边界" en="CLAIM BOUNDARY" /></span><p><Copy value={project.boundary} /></p></aside>
        </div>
      </section>

      <section className="reflection-section" aria-labelledby="reflection-title">
        <div className="case-section-label"><span>09</span><span><Localized zh="反思" en="REFLECTION" /></span></div>
        <div><p><Localized zh="如果再做一次……" en="IF I DID IT AGAIN…" /></p><h2 id="reflection-title"><Copy value={project.reflection} /></h2></div>
      </section>

      <nav className="next-case" aria-label="下一个案例">
        <span><Localized zh={`下一个案例 / ${nextProject.number}`} en={`NEXT CASE / ${nextProject.number}`} /></span>
        <Link href={`/work/${nextProject.slug}`} data-cursor="下一个"><strong><Copy value={nextProject.title} /></strong><i>→</i></Link>
      </nav>
    </main>
  );
}
