import styles from './study-header.module.css';
/* eslint-disable-next-line */
export interface StudyHeaderProps {}

export function StudyHeader(props: StudyHeaderProps) {
  return (
    <div
      className={'w-full bg-[#233240] h-[50px] text-white flex items-center'}
    >
      <h1>Welcome to StudyHeader!</h1>
    </div>
  );
}

export default StudyHeader;
