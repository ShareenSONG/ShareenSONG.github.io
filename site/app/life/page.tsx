import type { Metadata } from 'next';
import Image from 'next/image';
import { interests, lifeImages } from '../content';

export const metadata: Metadata = {
  title: 'Life',
  description: 'Travel, community, interests, and the life behind Shareen Song’s product work.',
};

export default function LifePage() {
  return (
    <main id="main-content" className="inner-page life-page">
      <header className="life-hero">
        <Image src="/images/harbour-sunset.jpg" alt="Shareen by Victoria Harbour at sunset" fill sizes="100vw" priority />
        <div className="life-hero-shade" aria-hidden="true" />
        <div className="page-hero-meta"><span>LIFE / PERSONAL</span><span>BEYOND WORK</span></div>
        <h1>Still curious<br /><em>after hours.</em></h1>
        <p>Places, practices, people, and small details that keep my way of seeing the world open.</p>
      </header>

      <section className="life-intro light-section" aria-labelledby="life-intro-title">
        <div className="section-label"><span>01</span><span>BEYOND THE ROLE</span></div>
        <div>
          <h2 id="life-intro-title">I collect contexts,<br /><em>not checklists.</em></h2>
          <p>Travel changes the questions I notice. Cinema changes how I think about sequence and attention. Guzheng, calligraphy, and yoga remind me that precision can be quiet. Community work keeps technology connected to actual people.</p>
        </div>
      </section>

      <section className="life-gallery" aria-label="Life and travel photographs">
        {lifeImages.map((image, index) => (
          <figure className={`life-photo life-photo--${image.shape}`} key={image.src}>
            <div data-cursor="VIEW">
              <Image src={image.src} alt={image.alt} fill sizes={image.shape === 'wide' ? '(max-width: 720px) 100vw, 60vw' : '(max-width: 720px) 100vw, 38vw'} />
            </div>
            <figcaption><span>0{index + 1}</span><span>{image.caption}</span></figcaption>
          </figure>
        ))}
      </section>

      <section className="interests-section light-section" aria-labelledby="interests-title">
        <div className="section-label"><span>02</span><span>THINGS I KEEP</span></div>
        <h2 id="interests-title">Long practices &<br /><em>current obsessions.</em></h2>
        <div className="interest-list">
          {interests.map((interest, index) => (
            <article key={interest.name}><span>0{index + 1}</span><h3>{interest.name}</h3><p>{interest.detail}</p></article>
          ))}
        </div>
      </section>

      <section className="random-facts" aria-labelledby="random-title">
        <div className="section-label section-label--dark"><span>03</span><span>RANDOM FACTS</span></div>
        <h2 id="random-title">A few things that<br /><em>make me, me.</em></h2>
        <div>
          <p><span>CURRENTLY CURIOUS ABOUT</span>Spatial interfaces, small AI tools, and why some products feel obvious only after someone has designed them well.</p>
          <p><span>A FILM I RETURN TO</span>Interstellar—for its scale, restraint, and insistence that technology is still a human story.</p>
          <p><span>MY LONGEST PRACTICE</span>Yoga for eleven years, followed closely by the patience required to reach Grade 10 in guzheng.</p>
          <p><span>ALWAYS LOOKING FOR</span>A new city, a quiet museum, a good science-fiction idea, and people who enjoy asking better questions.</p>
        </div>
      </section>
    </main>
  );
}
