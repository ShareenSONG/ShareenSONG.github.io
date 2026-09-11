import Image from 'next/image';
import Link from 'next/link';
import { Copy, Localized } from './components/Localized';
import ProjectArtwork from './components/ProjectArtwork';
import { contact, experience, projects, thoughtTopics } from './content';

export default function Home() {
  return (
    <main id="main-content">
      <section className="identity-hero" id="top" aria-labelledby="hero-title">
        <div className="hero-mesh" aria-hidden="true" />
        <Image className="hero-image" src="/images/shareen-portrait.jpg" alt="宋艾欣在柔和日光下的肖像" fill sizes="(max-width: 760px) 55vw, 31vw" priority />
        <div className="hero-topline label-row"><span>SHAREEN SONG</span><span><Localized zh="AI 产品 / 产品 / 增长" en="AI / PRODUCT / GROWTH" /></span><span><Localized zh="深圳 · 香港" en="SHENZHEN · HONG KONG" /></span></div>
        <div className="identity-copy">
          <p className="eyebrow"><Localized zh="AI 产品经理 · 构建者 · 研究者" en="AI Product Manager · Builder · Researcher" /></p>
          <h1 id="hero-title"><span>宋艾欣</span><em>Shareen Song.</em></h1>
          <i className="title-underline" aria-hidden="true" />
          <p className="hero-statement"><Localized zh="探索 AI、产品与人类行为如何交汇。" en="Exploring how AI, products and human behavior come together." /></p>
        </div>
        <div className="hero-actions" aria-label="联系与个人资料">
          <a href={`mailto:${contact.email}`} data-cursor="邮件"><Localized zh="邮箱" en="EMAIL" /> ↗</a>
          <a href={contact.github} target="_blank" rel="noreferrer" data-cursor="打开">GitHub ↗</a>
          <a href={contact.resume} target="_blank" rel="noreferrer" data-cursor="打开"><Localized zh="简历" en="RESUME" /> ↗</a>
        </div>
        <a href="#about" className="scroll-cue" aria-label="向下浏览关于我" data-cursor="向下"><Localized zh="继续了解我" en="SCROLL TO KNOW ME" /><i aria-hidden="true">↓</i></a>
      </section>

      <section className="about-section light-section" id="about" aria-labelledby="about-title">
        <div className="section-label"><span>01</span><span><Localized zh="关于我" en="ABOUT" /></span></div>
        <div className="about-grid">
          <h2 id="about-title"><Localized zh={<>把复杂系统，变成<em>人能理解和使用的产品。</em></>} en={<>I turn complex systems into <em>products people can understand and use.</em></>} /></h2>
          <div className="about-copy">
            <p><Localized zh="我的路径连接着计算机科学、AI 产品、商业交付与对人类行为的观察。我关心的是：一项技术能力如何成为清晰的产品决策。" en="My path moves between computer science, AI product work, business delivery, and the study of human behavior. I am interested in the moment when a technical capability becomes a clear product decision." /></p>
            <p><Localized zh="我从证据出发：理解情境，定义真正的问题，区分模型能力与产品责任，并让重要选择都可解释。" en="I work from evidence: understand the context, define the real problem, separate model ability from product responsibility, and make every important choice explainable." /></p>
            <ul aria-label="工作原则">
              <li><Localized zh="先研究，再列功能" en="Research before feature lists" /></li>
              <li><Localized zh="先定义边界，再自动化" en="Boundaries before automation" /></li>
              <li><Localized zh="先看证据，再下结论" en="Evidence before confident claims" /></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="experience-section" id="experience" aria-labelledby="experience-title">
        <div className="section-label"><span>02</span><span><Localized zh="经历" en="EXPERIENCE" /></span></div>
        <div className="section-heading-row"><p><Localized zh="工作 / 教育" en="WORK / EDUCATION" /></p><h2 id="experience-title"><Localized zh={<>技术是基础，<br /><em>产品是路径。</em></>} en={<>A technical foundation.<br /><em>A product trajectory.</em></>} /></h2></div>
        <div className="timeline-list">
          {experience.map((item, index) => (
            <article className="timeline-row" key={`${item.organization.en}-${item.time.en}`}>
              <span className="timeline-number">0{index + 1}</span>
              <div><small><Copy value={item.type} /></small><h3><Copy value={item.organization} /></h3><p><Copy value={item.role} /></p></div>
              <div className="timeline-description"><p><Copy value={item.description} /></p></div>
              <div className="timeline-meta"><span><Copy value={item.time} /></span><span><Copy value={item.location} /></span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="selected-work" id="work" aria-labelledby="work-title">
        <div className="section-label"><span>03</span><span><Localized zh="精选项目" en="SELECTED WORK" /></span></div>
        <div className="section-heading-row work-heading-row"><p><Localized zh="三个案例 / 真实情境" en="THREE CASES / REAL CONTEXT" /></p><h2 id="work-title"><Localized zh={<>简历说明做过什么，<br /><em>作品集解释为什么。</em></>} en={<>Portfolio explains<br /><em>why I did it.</em></>} /></h2></div>
        <div className="project-stack">
          {projects.map((project) => (
            <article className="project-feature" key={project.slug}>
              <Link href={`/work/${project.slug}`} className="project-art-link" aria-label={`查看 ${project.title.zh} 项目案例`} data-cursor="查看"><ProjectArtwork project={project} /></Link>
              <div className="project-copy">
                <div className="project-meta"><span>{project.number}</span><span><Copy value={project.status} /></span><span>{project.year}</span></div>
                <div><p className="project-tags">{project.tags.map((tag, index) => <span key={tag.en}><Copy value={tag} />{index < project.tags.length - 1 ? ' / ' : ''}</span>)}</p><h3><Copy value={project.title} /></h3><p className="project-summary"><Copy value={project.summary} /></p></div>
                <div className="project-bottom"><p><span><Localized zh="我的角色" en="ROLE" /></span><Copy value={project.role} /></p><Link href={`/work/${project.slug}`} data-cursor="打开"><Localized zh="查看案例" en="VIEW CASE" /> <span aria-hidden="true">↗</span></Link></div>
              </div>
            </article>
          ))}
        </div>
        <Link className="text-link" href="/work" data-cursor="前往"><Localized zh="查看全部项目" en="VIEW ALL WORK" /><span>↗</span></Link>
      </section>

      <section className="thoughts-preview light-section" id="thoughts" aria-labelledby="thoughts-title">
        <div className="section-label"><span>04</span><span><Localized zh="AI / 思考" en="AI / THOUGHTS" /></span></div>
        <div className="section-heading-row"><p><Localized zh="外部内容索引" en="AN EXTERNAL INDEX" /></p><h2 id="thoughts-title"><Localized zh={<>公开思考，<br /><em>不再造一个 CMS。</em></>} en={<>Thinking in public,<br /><em>without another CMS.</em></>} /></h2></div>
        <div className="thought-grid">
          {thoughtTopics.map((thought) => {
            const content = <><div><span><Copy value={thought.date} /></span><span><Copy value={thought.tag} /></span></div><h3><Copy value={thought.title} /></h3><p><Copy value={thought.description} /></p><strong><Copy value={thought.source} /> {thought.href ? '↗' : ''}</strong></>;
            return thought.href ? <a href={thought.href} target="_blank" rel="noreferrer" className="thought-card" data-cursor="阅读" key={thought.title.en}>{content}</a> : <article className="thought-card thought-card--draft" key={thought.title.en}>{content}</article>;
          })}
        </div>
        <Link className="text-link" href="/thoughts" data-cursor="前往"><Localized zh="打开思考索引" en="OPEN THOUGHTS INDEX" /><span>↗</span></Link>
      </section>

      <section className="personal-preview" aria-labelledby="personal-title">
        <div className="section-label"><span>05</span><span><Localized zh="生活 / 个人" en="LIFE / PERSONAL" /></span></div>
        <div className="personal-grid">
          <div className="personal-copy"><p><Localized zh="角色之外" en="BEYOND THE ROLE" /></p><h2 id="personal-title"><Localized zh={<>先是一个人，<br /><em>再是一份职位。</em></>} en={<>A person before<br /><em>a job title.</em></>} /></h2><p><Localized zh="旅行、电影、自然、11 年瑜伽、古筝十级，以及那些让产品直觉始终保有人味的微小观察。" en="Travel, cinema, nature, eleven years of yoga, Grade 10 guzheng, and the small observations that keep my product instincts human." /></p><Link href="/life" data-cursor="打开"><Localized zh="更多关于我" en="MORE ABOUT ME" /><span>↗</span></Link></div>
          <figure className="personal-image personal-image--wide"><Image src="/images/harbour-sunset.jpg" alt="宋艾欣在维多利亚港日落时分" fill sizes="(max-width: 720px) 100vw, 48vw" /><figcaption><Localized zh="香港 / 日落时分" en="HONG KONG / GOLDEN HOUR" /></figcaption></figure>
          <figure className="personal-image personal-image--portrait"><Image src="/images/un-visit.jpg" alt="宋艾欣参访日内瓦联合国" fill sizes="(max-width: 720px) 100vw, 28vw" /><figcaption><Localized zh="日内瓦 / 研学" en="GENEVA / LEARNING EXPEDITION" /></figcaption></figure>
        </div>
      </section>
    </main>
  );
}
