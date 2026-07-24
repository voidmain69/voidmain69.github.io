import { useSystemStore } from '../../../store/system';
import { useWindowManagerStore } from '../../../store/windowManager';
import { useBeep } from '../../../hooks/useBeep';
import { projects } from '../../../data/projects';
import styles from './ProjectExplorer.module.css';

export function ProjectExplorer() {
  const lang = useSystemStore((s) => s.lang);
  const open = useWindowManagerStore((s) => s.open);
  const beep = useBeep();

  const archiveLabel = lang === 'ua' ? 'архів_2025' : 'archive_2025';

  return (
    <div className={styles.grid}>
      {projects.map((project) => (
        <button
          key={project.id}
          type="button"
          className={styles.file}
          onClick={() => open('doc', project.id)}
        >
          <div className={styles.glyph} style={{ background: project.color1 }}>
            <div className={styles.glyphBar} style={{ background: project.color2 }} />
            <div className={styles.glyphTag}>{project.tag}</div>
          </div>
          <div className={styles.name}>{project[lang].file}</div>
        </button>
      ))}
      <button
        type="button"
        className={styles.file}
        onClick={() => {
          beep('error');
          open('trash');
        }}
      >
        <div className={styles.glyph} style={{ background: '#e0c46a' }}>
          <div className={styles.glyphBar} style={{ background: '#b08c22' }} />
          <div className={styles.glyphTag}>DIR</div>
        </div>
        <div className={styles.name}>{archiveLabel}</div>
      </button>
    </div>
  );
}
