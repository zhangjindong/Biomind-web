import { Iconfont } from '@biomind-web/iconfont';
import { PropsWithChildren } from 'react';
import { ImageViewerHeaderStyles } from '../shared/ui';

/* eslint-disable-next-line */
export interface ImageHeaderProps {}

export function ImageHeader(props: PropsWithChildren<ImageHeaderProps>) {
  const { children } = props;
  return (
    <div className={ImageViewerHeaderStyles``}>
      <Iconfont type="biomind" className=" text-9xl" />
      {children}
    </div>
  );
}

export default ImageHeader;
