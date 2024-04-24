import styles from './study-list.module.css';

/* eslint-disable-next-line */
export interface StudyListProps {}

export function StudyList(props: StudyListProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to StudyList!</h1>
    </div>
  );
}

export default StudyList;
