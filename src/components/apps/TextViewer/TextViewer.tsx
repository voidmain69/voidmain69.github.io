import { useT } from '../../../i18n';
import styles from './TextViewer.module.css';

interface TextViewerProps {
  kind: 'readme' | 'resume' | 'trash' | 'help';
}

export function TextViewer({ kind }: TextViewerProps) {
  const t = useT();
  const lines = t[kind];

  return (
    <div className={styles.pane}>
      {lines.map((line, i) => (
        <div key={i} className={styles.line}>
          {line}
        </div>
      ))}
    </div>
  );
}
