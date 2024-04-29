import { PropsWithChildren } from 'react';
import { TsHeaderClass } from '../shared/ui';
import { Iconfont } from '@biomind-web/iconfont';
/* eslint-disable-next-line */
export interface StudyHeaderProps {}

export function StudyHeader(props: PropsWithChildren<StudyHeaderProps>) {
  const { children } = props;
  return (
    <div className={TsHeaderClass({})}>
      <Iconfont
        type="buju"
        className="border border-red-500 border-solid text-4xl"
      />
      {children}
    </div>
  );
}

export default StudyHeader;
