import type { Metadata } from 'next';
import { thoughtTopics } from '../content';
import { Copy, Localized } from '../components/Localized';

export const metadata: Metadata = {
  title: '思考',
  description: '宋艾欣的外部文章、构建笔记与产品问题索引。',
};

export default function ThoughtsPage() {
  return (
    <main id="main-content" className="inner-page thoughts-page">
      <header className="page-hero page-hero--thoughts">
        <div className="page-hero-meta"><span><Localized zh="思考" en="THOUGHTS" /></span><span><Localized zh="外部索引" en="EXTERNAL INDEX" /></span></div>
        <h1><Localized zh={<>想法始终<br /><em>在流动。</em></>} en={<>Ideas live<br /><em>in motion.</em></>} /></h1>
        <p><Localized zh="长文会发布在 GitHub 或外部内容平台。这里刻意保持轻量，只记录我正在构建、追问与学习的方向。" en="Long-form articles will live on GitHub or an external publishing platform. This page stays deliberately light: a map of what I am building, questioning, and learning." /></p>
      </header>

      <section className="thoughts-index" aria-label="思考与外部文章">
        {thoughtTopics.map((thought, index) => {
          const content = (
            <>
              <div className="thought-index-meta"><span>0{index + 1}</span><span><Copy value={thought.date} /></span><span><Copy value={thought.tag} /></span></div>
              <h2><Copy value={thought.title} /></h2>
              <p><Copy value={thought.description} /></p>
              <strong><Copy value={thought.source} /> {thought.href ? '↗' : ''}</strong>
            </>
          );
          return thought.href ? (
            <a className="thought-index-row" href={thought.href} target="_blank" rel="noreferrer" data-cursor="阅读" key={thought.title.en}>{content}</a>
          ) : (
            <article className="thought-index-row thought-index-row--draft" key={thought.title.en}>{content}</article>
          );
        })}
      </section>

      <aside className="thoughts-note">
        <span><Localized zh="不内置 CMS" en="NO INTERNAL CMS" /></span>
        <p><Localized zh="作品集让文字保持可迁移。已发布内容直接链接到外部，让网站专注于项目、语境与个人，而不是变成另一个内容后台。" en="The portfolio keeps writing portable. Published titles will link outward, so the site remains focused on work, context, and identity rather than becoming another publishing backend." /></p>
      </aside>
    </main>
  );
}
