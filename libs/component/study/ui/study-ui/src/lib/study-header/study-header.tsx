import { PropsWithChildren } from 'react';
import { TsHeaderClass } from '../shared/ui';
import { Iconfont } from '@biomind-web/iconfont';
/* eslint-disable-next-line */
export interface StudyHeaderProps {}

export function StudyHeader(props: PropsWithChildren<StudyHeaderProps>) {
  const { children } = props;
  return (
    <div className={TsHeaderClass({ className: 'px-2 text-blue' })}>
      <Iconfont type="biomind" className=" text-9xl " />
      {children}
    </div>
  );
}

export default StudyHeader;
