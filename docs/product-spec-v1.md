# Personal Website Product Spec v1

> 状态：已确认并进入 MVP 实现。
>
> 产品定位：个人 Portfolio + 数字名片。
>
> 视觉方向：`BLACK / MOTION / EDITORIAL`，YSL 提供视觉气质，Youdoo 提供交互骨架。

## 1. 网站目标

网站用于展示个人背景、教育与工作经历、代表性项目、项目判断、个人形象、生活方式，以及对 AI、产品和科技的长期思考。

文章正文不存储在网站内部。站点只维护标题、日期、标签、简介与外部链接，文章发布在 GitHub、技术博客或其他外部平台。

## 2. 目标受众与任务

| 受众 | 首要任务 |
| --- | --- |
| HR / Recruiter | 快速确认身份、教育、工作、项目、AI/产品能力、简历与联系方式 |
| Hiring Manager / 产品负责人 | 深入检查问题定义、研究、洞察、产品判断、角色、结果与反思 |
| 同行 / 开发者 / 朋友 | 查看 AI 实验、Thoughts、GitHub、兴趣与个人生活 |

体验原则：**首页快速了解我，项目页深入了解我的能力，Life 页面了解我这个人。**

## 3. MVP 页面与路由

| 路由 | 页面职责 | MVP 状态 |
| --- | --- | --- |
| `/` | Hero、About、Experience、Selected Work、Thoughts 预览、Life 预览、Contact | 必须完成 |
| `/work` | 三个精选案例与其他实验索引 | 必须完成 |
| `/work/[slug]` | 统一项目详情模板 | 三个精选案例均实现 |
| `/thoughts` | 外部文章与 GitHub 内容索引，不承载正文 | 必须完成 |
| `/life` | 旅行、社区、兴趣、照片与 Random Facts | 必须完成 |
| `/shareen-song-resume.pdf` | 可下载/新窗口打开的 Resume | 必须完成 |
| `/#contact` | Email、GitHub 与 Resume | 必须完成 |

LinkedIn URL 尚未提供，不创建猜测链接；获得真实地址后再加入 Header、Hero 与 Contact。

## 4. 首页内容契约

### Hero

- Shareen Song / 宋艾欣。
- AI Product / Product / Growth。
- 定位：`Exploring how AI, products and human behavior come together.`
- 深圳 / 香港、Email、GitHub、Resume。
- 使用个人影像和黑色电影式排版。

### About

用短文说明计算机与数据基础、为什么做产品、对 AI 与人的兴趣，以及以研究、边界和证据为核心的工作方式。避免长篇自传。

### Experience

使用 Editorial Timeline，而不是简历表格。每条只展示 Organization、Role、Time、Location 与一段核心说明；详细职责进入项目页。

### Selected Work

MVP 使用经历目录中证据最完整的三个 S 级项目：

1. iGarden Motion Game。
2. Competitive Intelligence Agent。
3. AI Digital Human Education。

原需求中的 `Amazon Data Platform` 是示例名称，在已确认经历目录中没有对应的独立项目，因此不虚构该案例。竞品监控 Agent 的 SQLite 数据层作为其项目系统的一部分呈现。

### Thoughts

只提供外部索引。GitHub 使用已确认链接；尚未发布的文章明确标记为 `WRITING / DRAFT IN PROGRESS`，不创建空白详情页或虚假外链。

### Life Preview 与 Contact

Life Preview 使用少量旅行与研学照片导向 `/life`。Contact 只保留清晰的 Email、GitHub 和 Resume 行为。

## 5. 项目详情模板

每个项目统一回答：

`Context → Problem → Research → Insight → Product Decision → Solution → My Role → Outcome → Reflection`

详情页规则：

- `Problem` 必须解释真正的问题，不从功能列表开始。
- `Research` 与 `Insight` 分开，洞察必须能推动后续决策。
- `Product Decision` 说明取舍、优先级、约束和判断。
- `My Role` 明确个人贡献与团队边界。
- `Outcome` 使用 `Launched / In internal use / Proposed / Tested` 等真实状态。
- `Reflection` 说明局限和重做时会改变的事情。
- 重要数字旁保留 claim boundary，避免把团队结果、问卷反馈或方案状态包装成个人因果成果。

## 6. Life 页面

Life 页面不承担招聘转化，主要依靠影像和短文字展示：

- Travel 与城市观察。
- 社区活动与协作。
- 古筝十级、11 年瑜伽、书法与电影。
- Nature、Science Fiction、Gaming、AI 和 Technology 兴趣。
- 少量 Random Facts。

原始照片保留在本地 `photo/`，不进入 Git；站点只提交移除元数据并压缩后的发布版本。

## 7. 导航

Desktop：

`Shareen / Work / Experience / Thoughts / About / Life / Resume ↗`

Mobile：

- 紧凑 Header + Menu。
- 菜单使用黑色全屏层。
- `Escape` 可关闭，按钮暴露 `aria-expanded` 状态。
- 触屏不渲染自定义鼠标。

## 8. 内容与视觉原则

**Resume tells what I did. Portfolio explains why I did it.**

- 使用 `#050505` 黑色主体、米白文字和少量酒红强调。
- 个人照片、真实数据和项目判断优先于装饰。
- 桌面端保留鼠标跟随、导航翻面与克制 Hover。
- 移动端采用自然文档流，不捕获滚轮，不强制 Scroll Snap。
- `prefers-reduced-motion` 下关闭自定义鼠标和大幅动画。
- 不复制 Youdoo 或 YSL 的 Logo、图片、视频和营销文案。

## 9. 非目标

第一版不制作 Backend、Database、CMS、Login、Comment、AI Chatbot 或站内 Blog。所有页面为静态内容，不需要持久化数据。

## 10. 验收标准

- 首页可以在短时间内回答“Who is Shareen?”。
- 三个 Selected Work 可进入统一结构的完整详情页。
- Experience、Thoughts、Life、Contact 与 Resume 均可访问。
- 所有外链在新窗口打开并使用安全的 `rel` 属性。
- 手机端可完整访问内容，菜单可操作，不依赖 Hover。
- 自定义鼠标仅在精确指针且非 Reduced Motion 环境启用。
- 全部测试、Lint、TypeScript 检查与生产构建通过。
- 社交预览使用个人网站标题与视觉，不再显示 Style Demo 元数据。
