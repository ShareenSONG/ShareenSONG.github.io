import type { Metadata } from 'next';
import { thoughtTopics } from '../content';

export const metadata: Metadata = {
  title: 'Thoughts',
  description: 'An external index of Shareen Song’s writing, build notes, and product questions.',
};

export default function ThoughtsPage() {
  return (
    <main id="main-content" className="inner-page thoughts-page">
      <header className="page-hero page-hero--thoughts">
        <div className="page-hero-meta"><span>THOUGHTS</span><span>EXTERNAL INDEX</span></div>
        <h1>Ideas live<br /><em>in motion.</em></h1>
        <p>Long-form articles will live on GitHub or an external publishing platform. This page stays deliberately light: a map of what I am building, questioning, and learning.</p>
      </header>

      <section className="thoughts-index" aria-label="Thoughts and external writing">
        {thoughtTopics.map((thought, index) => {
          const content = (
            <>
              <div className="thought-index-meta"><span>0{index + 1}</span><span>{thought.date}</span><span>{thought.tag}</span></div>
              <h2>{thought.title}</h2>
              <p>{thought.description}</p>
              <strong>{thought.source} {thought.href ? '↗' : ''}</strong>
            </>
          );
          return thought.href ? (
            <a className="thought-index-row" href={thought.href} target="_blank" rel="noreferrer" data-cursor="READ" key={thought.title}>{content}</a>
          ) : (
            <article className="thought-index-row thought-index-row--draft" key={thought.title}>{content}</article>
          );
        })}
      </section>

      <aside className="thoughts-note">
        <span>NO INTERNAL CMS</span>
        <p>The portfolio keeps writing portable. Published titles will link outward, so the site remains focused on work, context, and identity rather than becoming another publishing backend.</p>
      </aside>
    </main>
  );
}
