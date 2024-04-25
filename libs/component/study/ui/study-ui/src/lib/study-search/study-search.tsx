import styles from './study-search.module.css';

/* eslint-disable-next-line */
export interface StudySearchProps {}

export function StudySearch(props: StudySearchProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to StudySearch!</h1>
    </div>
  );
}

export default StudySearch;
