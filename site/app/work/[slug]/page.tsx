import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProjectArtwork from '../../components/ProjectArtwork';
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
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary, images: [] },
    twitter: { title: project.title, description: project.summary, images: [] },
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
        <div className="case-hero-top"><span>CASE {project.number}</span><span>{project.status}</span><span>{project.year}</span></div>
        <h1>{project.title}</h1>
        <p>{project.subtitle}</p>
        <ProjectArtwork project={project} />
        <dl className="case-facts">
          <div><dt>ROLE</dt><dd>{project.role}</dd></div>
          <div><dt>TIMELINE</dt><dd>{project.timeline}</dd></div>
          <div><dt>TEAM</dt><dd>{project.team}</dd></div>
          <div><dt>PLATFORM</dt><dd>{project.platform}</dd></div>
        </dl>
      </header>

      <section className="case-reading-section" aria-labelledby="context-title">
        <div className="case-section-label"><span>01</span><span>CONTEXT</span></div>
        <div className="case-reading-copy"><h2 id="context-title">Why did this<br /><em>project exist?</em></h2><p>{project.context}</p></div>
      </section>

      <section className="case-reading-section light-section" aria-labelledby="problem-title">
        <div className="case-section-label"><span>02</span><span>PROBLEM</span></div>
        <div className="case-reading-copy"><h2 id="problem-title">The real problem.</h2><p className="case-large-copy">{project.problem}</p></div>
      </section>

      <section className="case-reading-section" aria-labelledby="research-title">
        <div className="case-section-label"><span>03</span><span>RESEARCH</span></div>
        <div className="case-reading-copy">
          <h2 id="research-title">Evidence before<br /><em>direction.</em></h2>
          <ol className="case-list">
            {project.research.map((item, index) => <li key={item}><span>0{index + 1}</span><p>{item}</p></li>)}
          </ol>
        </div>
      </section>

      <section className="insight-section" aria-labelledby="insight-title">
        <div className="case-section-label"><span>04</span><span>INSIGHT</span></div>
        <blockquote id="insight-title">“{project.insight}”</blockquote>
        <p>RESEARCH ≠ INSIGHT</p>
      </section>

      <section className="decision-section light-section" aria-labelledby="decision-title">
        <div className="case-section-label"><span>05</span><span>PRODUCT DECISION</span></div>
        <div>
          <p>THEREFORE, WE DECIDED TO…</p>
          <h2 id="decision-title">{project.decision}</h2>
        </div>
      </section>

      <section className="case-reading-section" aria-labelledby="solution-title">
        <div className="case-section-label"><span>06</span><span>SOLUTION</span></div>
        <div className="case-reading-copy">
          <h2 id="solution-title">From judgment<br /><em>to a system.</em></h2>
          <ol className="case-list case-list--solution">
            {project.solution.map((item, index) => <li key={item}><span>0{index + 1}</span><p>{item}</p></li>)}
          </ol>
        </div>
      </section>

      <section className="role-outcome light-section" aria-labelledby="role-title">
        <div className="role-column">
          <div className="case-section-label"><span>07</span><span>MY ROLE</span></div>
          <h2 id="role-title">What I was<br /><em>responsible for.</em></h2>
          <ul>{project.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className="outcome-column">
          <div className="case-section-label"><span>08</span><span>OUTCOME</span></div>
          <div className="outcome-grid">
            {project.outcomes.map((item) => <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}
          </div>
          <aside><span>CLAIM BOUNDARY</span><p>{project.boundary}</p></aside>
        </div>
      </section>

      <section className="reflection-section" aria-labelledby="reflection-title">
        <div className="case-section-label"><span>09</span><span>REFLECTION</span></div>
        <div><p>IF I DID IT AGAIN…</p><h2 id="reflection-title">{project.reflection}</h2></div>
      </section>

      <nav className="next-case" aria-label="Next case study">
        <span>NEXT CASE / {nextProject.number}</span>
        <Link href={`/work/${nextProject.slug}`} data-cursor="NEXT"><strong>{nextProject.title}</strong><i>→</i></Link>
      </nav>
    </main>
  );
}
