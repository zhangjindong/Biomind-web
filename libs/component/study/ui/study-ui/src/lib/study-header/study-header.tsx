import { PropsWithChildren } from 'react';
import { TsHeaderClass } from '../shared/ui';
/* eslint-disable-next-line */
export interface StudyHeaderProps {}

export function StudyHeader(props: PropsWithChildren<StudyHeaderProps>) {
  return (
    <div className={TsHeaderClass({})}>
      <h1>Welcome to StudyHeader!</h1>
    </div>
  );
}

export default StudyHeader;
