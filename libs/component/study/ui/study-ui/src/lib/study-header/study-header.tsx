import styles from './study-header.module.css';

/* eslint-disable-next-line */
export interface StudyHeaderProps {}

export function StudyHeader(props: StudyHeaderProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to StudyHeader!</h1>
    </div>
  );
}

export default StudyHeader;
