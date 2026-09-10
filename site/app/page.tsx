import Image from 'next/image';
import Link from 'next/link';
import ProjectArtwork from './components/ProjectArtwork';
import { contact, experience, projects, thoughtTopics } from './content';

export default function Home() {
  return (
    <main id="main-content">
      <section className="identity-hero" id="top" aria-labelledby="hero-title">
        <Image
          className="hero-gradient-shape"
          src="/images/iridescent-form.webp"
          alt=""
          width={1734}
          height={977}
          sizes="(max-width: 760px) 118vw, 72vw"
          priority
          aria-hidden="true"
        />
        <Image
          className="hero-image"
          src="/images/shareen-portrait.jpg"
          alt="Shareen Song standing in soft daylight"
          fill
          sizes="(max-width: 720px) 100vw, 58vw"
          priority
        />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-corner-mark" aria-hidden="true" />
        <div className="hero-topline label-row">
          <span>SHAREEN SONG</span>
          <span>AI / PRODUCT / GROWTH</span>
          <span>SHENZHEN · HONG KONG</span>
        </div>

        <div className="identity-copy">
          <p className="eyebrow">AI Product Manager · Builder · Researcher</p>
          <h1 id="hero-title"><em>Shareen</em><span>Song.</span></h1>
          <p className="hero-statement">Exploring how AI, products and human behavior come together.</p>
        </div>

        <div className="hero-actions" aria-label="Contact and profile links">
          <a href={`mailto:${contact.email}`} data-cursor="MAIL">EMAIL ↗</a>
          <a href={contact.github} target="_blank" rel="noreferrer" data-cursor="OPEN">GITHUB ↗</a>
          <a href={contact.resume} target="_blank" rel="noreferrer" data-cursor="OPEN">RESUME ↗</a>
        </div>

        <a href="#about" className="scroll-cue" aria-label="Scroll to about" data-cursor="DOWN">
          <span>SCROLL TO KNOW ME</span><i aria-hidden="true">↓</i>
        </a>
      </section>

      <section className="about-section light-section" id="about" aria-labelledby="about-title">
        <div className="section-label"><span>01</span><span>ABOUT</span></div>
        <div className="about-grid">
          <h2 id="about-title">I turn <em>complex systems</em> into products people can understand and use.</h2>
          <div className="about-copy">
            <p>My path moves between computer science, AI product work, business delivery, and the study of human behavior. I am interested in the moment when a technical capability becomes a clear product decision.</p>
            <p>I work from evidence: understand the context, define the real problem, separate model ability from product responsibility, and make every important choice explainable.</p>
            <ul aria-label="Working principles">
              <li>Research before feature lists</li>
              <li>Boundaries before automation</li>
              <li>Evidence before confident claims</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="experience-section" id="experience" aria-labelledby="experience-title">
        <div className="section-label section-label--dark"><span>02</span><span>EXPERIENCE</span></div>
        <div className="section-heading-row">
          <p>WORK / EDUCATION</p>
          <h2 id="experience-title">A technical foundation.<br /><em>A product trajectory.</em></h2>
        </div>
        <div className="timeline-list">
          {experience.map((item, index) => (
            <article className="timeline-row" key={`${item.organization}-${item.time}`}>
              <span className="timeline-number">0{index + 1}</span>
              <div><small>{item.type}</small><h3>{item.organization}</h3><p>{item.role}</p></div>
              <div className="timeline-description"><p>{item.description}</p></div>
              <div className="timeline-meta"><span>{item.time}</span><span>{item.location}</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="selected-work" id="work" aria-labelledby="work-title">
        <div className="section-label section-label--dark"><span>03</span><span>SELECTED WORK</span></div>
        <div className="section-heading-row work-heading-row">
          <p>THREE CASES / REAL CONTEXT</p>
          <h2 id="work-title">Portfolio explains<br /><em>why I did it.</em></h2>
        </div>

        <div className="project-stack">
          {projects.map((project) => (
            <article className="project-feature" key={project.slug}>
              <Link href={`/work/${project.slug}`} className="project-art-link" aria-label={`View ${project.title} case study`} data-cursor="VIEW">
                <ProjectArtwork project={project} />
              </Link>
              <div className="project-copy">
                <div className="project-meta"><span>{project.number}</span><span>{project.year}</span><span>{project.status}</span></div>
                <div>
                  <p className="project-tags">{project.tags.join(' / ')}</p>
                  <h3>{project.title}</h3>
                  <p className="project-summary">{project.summary}</p>
                </div>
                <div className="project-bottom">
                  <p><span>ROLE</span>{project.role}</p>
                  <Link href={`/work/${project.slug}`} data-cursor="OPEN">VIEW CASE <span aria-hidden="true">↗</span></Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <Link className="text-link" href="/work" data-cursor="GO">VIEW ALL WORK <span>↗</span></Link>
      </section>

      <section className="thoughts-preview light-section" id="thoughts" aria-labelledby="thoughts-title">
        <div className="section-label"><span>04</span><span>AI / THOUGHTS</span></div>
        <div className="section-heading-row section-heading-row--ink">
          <p>AN EXTERNAL INDEX</p>
          <h2 id="thoughts-title">Thinking in public,<br /><em>without another CMS.</em></h2>
        </div>
        <div className="thought-grid">
          {thoughtTopics.map((thought) => {
            const content = (
              <>
                <div><span>{thought.date}</span><span>{thought.tag}</span></div>
                <h3>{thought.title}</h3>
                <p>{thought.description}</p>
                <strong>{thought.source} {thought.href ? '↗' : ''}</strong>
              </>
            );
            return thought.href ? (
              <a href={thought.href} target="_blank" rel="noreferrer" className="thought-card" data-cursor="READ" key={thought.title}>{content}</a>
            ) : (
              <article className="thought-card thought-card--draft" key={thought.title}>{content}</article>
            );
          })}
        </div>
        <Link className="text-link text-link--ink" href="/thoughts" data-cursor="GO">OPEN THOUGHTS INDEX <span>↗</span></Link>
      </section>

      <section className="personal-preview" aria-labelledby="personal-title">
        <div className="section-label section-label--dark"><span>05</span><span>LIFE / PERSONAL</span></div>
        <div className="personal-grid">
          <div className="personal-copy">
            <p>BEYOND THE ROLE</p>
            <h2 id="personal-title">A person before<br /><em>a job title.</em></h2>
            <p>Travel, cinema, nature, eleven years of yoga, Grade 10 guzheng, and the small observations that keep my product instincts human.</p>
            <Link href="/life" data-cursor="OPEN">MORE ABOUT ME <span>↗</span></Link>
          </div>
          <figure className="personal-image personal-image--wide">
            <Image src="/images/harbour-sunset.jpg" alt="Shareen by Victoria Harbour at sunset" fill sizes="(max-width: 720px) 100vw, 48vw" />
            <figcaption>HONG KONG / GOLDEN HOUR</figcaption>
          </figure>
          <figure className="personal-image personal-image--portrait">
            <Image src="/images/un-visit.jpg" alt="Shareen visiting the United Nations in Geneva" fill sizes="(max-width: 720px) 100vw, 28vw" />
            <figcaption>GENEVA / LEARNING EXPEDITION</figcaption>
          </figure>
        </div>
      </section>
    </main>
  );
}
