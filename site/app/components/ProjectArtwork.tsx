import type { Project } from '../content';
import { Copy } from './Localized';

export default function ProjectArtwork({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <div
      className={`project-art project-art--${project.tone} ${compact ? 'project-art--compact' : ''}`}
      role="img"
      aria-label={`项目视觉：${project.title.zh}`}
      data-label-zh={`项目视觉：${project.title.zh}`}
      data-label-en={`Project visual: ${project.title.en}`}
      data-cursor="VIEW"
    >
      <span className="project-art-number" aria-hidden="true">{project.number}</span>
      {project.tone === 'garden' && (
        <div className="garden-art" aria-hidden="true"><i /><i /><i /><b>PLAY</b></div>
      )}
      {project.tone === 'signal' && (
        <div className="signal-art" aria-hidden="true"><i /><i /><i /><i /><b>DIFF</b></div>
      )}
      {project.tone === 'human' && (
        <div className="human-art" aria-hidden="true"><i /><i /><i /><b>AI</b></div>
      )}
      <p aria-hidden="true"><Copy value={project.status} /></p>
    </div>
  );
}
