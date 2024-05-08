import { PropsWithChildren } from 'react';
import { ListViewHeaderStyles } from '../shared/ui';
import { Iconfont } from '@biomind-web/iconfont';
/* eslint-disable-next-line */
export interface StudyHeaderProps {}

export function StudyHeader(props: PropsWithChildren<StudyHeaderProps>) {
  const { children } = props;
  return (
    <div className={ListViewHeaderStyles``}>
      <Iconfont type="biomind" className=" text-9xl" />
      {children}
    </div>
  );
}

export default StudyHeader;
