import styles from './study-pagination.module.css';

/* eslint-disable-next-line */
export interface StudyPaginationProps {}

export function StudyPagination(props: StudyPaginationProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to StudyPagination!</h1>
    </div>
  );
}

export default StudyPagination;
