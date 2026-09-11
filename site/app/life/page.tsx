import type { Metadata } from 'next';
import Image from 'next/image';
import { interests, lifeImages } from '../content';
import { Copy, Localized } from '../components/Localized';

export const metadata: Metadata = {
  title: '生活',
  description: '宋艾欣的旅行、社区、兴趣与产品工作之外的生活。',
};

export default function LifePage() {
  return (
    <main id="main-content" className="inner-page life-page" data-title-zh="生活 — 宋艾欣" data-title-en="Life — Shareen Song" data-description-zh="宋艾欣的旅行、社区、兴趣与产品工作之外的生活。" data-description-en="Travel, community, interests, and the life behind Shareen Song's product work.">
      <header className="life-hero">
        <Image src="/images/harbour-sunset.jpg" alt="宋艾欣在维多利亚港日落时分" data-alt-zh="宋艾欣在维多利亚港日落时分" data-alt-en="Shareen by Victoria Harbour at sunset" fill sizes="100vw" priority />
        <div className="life-hero-shade" aria-hidden="true" />
        <div className="page-hero-meta"><span><Localized zh="生活 / 个人" en="LIFE / PERSONAL" /></span><span><Localized zh="工作之外" en="BEYOND WORK" /></span></div>
        <h1><Localized zh={<>下班以后，<br /><em>仍然好奇。</em></>} en={<>Still curious<br /><em>after hours.</em></>} /></h1>
        <p><Localized zh="地点、练习、人和小细节，让我看世界的方式始终保持开放。" en="Places, practices, people, and small details that keep my way of seeing the world open." /></p>
      </header>

      <section className="life-intro light-section" aria-labelledby="life-intro-title">
        <div className="section-label"><span>01</span><span><Localized zh="角色之外" en="BEYOND THE ROLE" /></span></div>
        <div>
          <h2 id="life-intro-title"><Localized zh={<>我收集的是语境，<br /><em>不是清单。</em></>} en={<>I collect contexts,<br /><em>not checklists.</em></>} /></h2>
          <p><Localized zh="旅行改变我注意到的问题，电影改变我理解顺序与注意力的方式。古筝、书法和瑜伽提醒我，精确也可以很安静；社区协作则让技术始终连接真实的人。" en="Travel changes the questions I notice. Cinema changes how I think about sequence and attention. Guzheng, calligraphy, and yoga remind me that precision can be quiet. Community work keeps technology connected to actual people." /></p>
        </div>
      </section>

      <section className="life-gallery" aria-label="Life and travel photographs">
        {lifeImages.map((image, index) => (
          <figure className={`life-photo life-photo--${image.shape}`} key={image.src}>
            <div data-cursor="VIEW">
              <Image src={image.src} alt={image.alt.zh} data-alt-zh={image.alt.zh} data-alt-en={image.alt.en} fill sizes={image.shape === 'wide' ? '(max-width: 720px) 100vw, 60vw' : '(max-width: 720px) 100vw, 38vw'} />
            </div>
            <figcaption><span>0{index + 1}</span><span><Copy value={image.caption} /></span></figcaption>
          </figure>
        ))}
      </section>

      <section className="interests-section light-section" aria-labelledby="interests-title">
        <div className="section-label"><span>02</span><span><Localized zh="长期保留的事" en="THINGS I KEEP" /></span></div>
        <h2 id="interests-title"><Localized zh={<>长期练习与<br /><em>此刻着迷。</em></>} en={<>Long practices &<br /><em>current obsessions.</em></>} /></h2>
        <div className="interest-list">
          {interests.map((interest, index) => (
            <article key={interest.name.en}><span>0{index + 1}</span><h3><Copy value={interest.name} /></h3><p><Copy value={interest.detail} /></p></article>
          ))}
        </div>
      </section>

      <section className="random-facts" aria-labelledby="random-title">
        <div className="section-label"><span>03</span><span><Localized zh="关于我的几件小事" en="RANDOM FACTS" /></span></div>
        <h2 id="random-title"><Localized zh={<>一些让我成为<br /><em>我的小事。</em></>} en={<>A few things that<br /><em>make me, me.</em></>} /></h2>
        <div>
          <p><span><Localized zh="最近好奇" en="CURRENTLY CURIOUS ABOUT" /></span><Localized zh="空间界面、小型 AI 工具，以及为什么有些产品只有被设计好以后才显得理所当然。" en="Spatial interfaces, small AI tools, and why some products feel obvious only after someone has designed them well." /></p>
          <p><span><Localized zh="反复重看的电影" en="A FILM I RETURN TO" /></span><Localized zh="《星际穿越》——因为它的尺度、克制，以及它始终相信科技仍然是人的故事。" en="Interstellar—for its scale, restraint, and insistence that technology is still a human story." /></p>
          <p><span><Localized zh="坚持最久的练习" en="MY LONGEST PRACTICE" /></span><Localized zh="11 年瑜伽，以及把古筝练到十级所需要的耐心。" en="Yoga for eleven years, followed closely by the patience required to reach Grade 10 in guzheng." /></p>
          <p><span><Localized zh="一直在寻找" en="ALWAYS LOOKING FOR" /></span><Localized zh="一座新城市、一间安静的博物馆、一个好的科幻想法，以及愿意一起问更好问题的人。" en="A new city, a quiet museum, a good science-fiction idea, and people who enjoy asking better questions." /></p>
        </div>
      </section>
    </main>
  );
}
