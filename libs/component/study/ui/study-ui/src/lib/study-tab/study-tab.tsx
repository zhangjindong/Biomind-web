import styles from './study-tab.module.css';

/* eslint-disable-next-line */
export interface StudyTabProps {}

export function StudyTab(props: StudyTabProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to StudyTab!</h1>
    </div>
  );
}

export default StudyTab;
