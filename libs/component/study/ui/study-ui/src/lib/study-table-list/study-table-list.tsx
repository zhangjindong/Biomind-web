import styles from './study-table-list.module.css';

/* eslint-disable-next-line */
export interface StudyTableListProps {}

export function StudyTableList(props: StudyTableListProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to StudyTableList!</h1>
    </div>
  );
}

export default StudyTableList;
