import styles from './study-application-setting.module.css';

/* eslint-disable-next-line */
export interface StudyApplicationSettingProps {}

export function StudyApplicationSetting(props: StudyApplicationSettingProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to StudyApplicationSetting!</h1>
    </div>
  );
}

export default StudyApplicationSetting;
