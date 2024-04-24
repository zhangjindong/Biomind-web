import styles from './study-ui.module.css';

/* eslint-disable-next-line */
export interface StudyUiProps {}

export function StudyUi(props: StudyUiProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to StudyUi!</h1>
    </div>
  );
}

export default StudyUi;
