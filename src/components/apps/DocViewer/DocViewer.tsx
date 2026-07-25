import { Fragment } from 'react';
import { useSystemStore } from '../../../store/system';
import { useT } from '../../../i18n';
import { getProject } from '../../../data/projects';
import { countWords } from './docStats';
import styles from './DocViewer.module.css';

interface DocViewerProps {
  projectId: string;
}

export function DocViewer({ projectId }: DocViewerProps) {
  const lang = useSystemStore((s) => s.lang);
  const t = useT();
  const project = getProject(projectId);
  if (!project) return null;

  const content = project[lang];
  const wordCount = countWords(content);

  return (
    <>
      <div className={styles.scroll}>
        <div className={styles.content}>
          <div className={styles.heading}>
            <div className={styles.kicker}>{content.kicker}</div>
            <div className={styles.name}>{content.name}</div>
            <div className={styles.sub}>{content.sub}</div>
          </div>

          <div className={styles.shot}>
            <div className={styles.shotLabel}>{content.shot}</div>
          </div>

          <div className={styles.meta}>
            {content.meta.map((m) => (
              <Fragment key={m.key}>
                <div className={styles.metaLabel}>{m.key}</div>
                <div className={styles.metaValue}>{m.value}</div>
              </Fragment>
            ))}
          </div>

          {content.sections.map((section) => (
            <div key={section.heading} className={styles.section}>
              <div className={styles.sectionHeading}>{section.heading}</div>
              {section.body && <div className={styles.sectionBody}>{section.body}</div>}
              {section.bullets.length > 0 && (
                <div className={styles.bullets}>
                  {section.bullets.map((bullet) => (
                    <div key={bullet} className={styles.bullet}>
                      <div className={styles.bulletMark}>▪</div>
                      <div>{bullet}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className={styles.tags}>
            {content.tags.map((tag) => (
              <div key={tag} className={styles.tag}>
                {tag}
              </div>
            ))}
          </div>

          {project.repo && content.cta && (
            <a className={styles.cta} href={project.repo} target="_blank" rel="noopener noreferrer">
              {content.cta}
            </a>
          )}
        </div>
      </div>

      <div className={styles.statBar}>
        <div className={styles.stat}>
          {wordCount} {t.words}
        </div>
        <div className={styles.stat}>
          {content.sections.length} {t.sections}
        </div>
      </div>
    </>
  );
}
