import styles from './study-bar.module.css';

/* eslint-disable-next-line */
export interface StudyBarProps {}

export function StudyBar(props: StudyBarProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to StudyBar!</h1>
    </div>
  );
}

export default StudyBar;
