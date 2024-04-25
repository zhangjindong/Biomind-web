import styles from './study-nav.module.css';

/* eslint-disable-next-line */
export interface StudyNavProps {}

export function StudyNav(props: StudyNavProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to StudyNav!</h1>
    </div>
  );
}

export default StudyNav;
