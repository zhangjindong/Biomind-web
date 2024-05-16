import { Viewport } from '@biomind-web/viewport';
import styles from './image-viewer.module.css';
import {
  onChangeImageIds,
  onChangeRenderingEngineId,
  onNewStackViewport,
  useCurrentImageId,
  useId,
  useRenderingEngine,
  useStackViewPort,
} from '@biomind-web/app-image-viewer';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { PublicViewportInput } from '@cornerstonejs/core/dist/types/types';
import { ImageHeader } from '@biomind-web/image-ui';
import { ViewportType } from '@cornerstonejs/core/dist/types/enums';

/* eslint-disable-next-line */
export interface ImageViewerProps {}

export function ImageViewer(props: ImageViewerProps) {
  const elementRef = useRef<HTMLDivElement | null>(null);
  // const currentImageId = useCurrentImageId();
  // const re = useRenderingEngine();
  const currentImageId = useCurrentImageId();

  useEffect(() => {
    onChangeRenderingEngineId('12345');
  }, []);
  useEffect(() => {
    console.log('====image-viewer', currentImageId);

    // if(elementRef.current)
    // onNewStackViewport({
    //   viewportId:"CT_STACK",
    //   type: ViewportType.STACK,
    //   element:elementRef.current,
    //   defaultOptions: {
    //     background: <Types.Point3>[0.2, 0, 0.2],
    //   },
    // });
    if (elementRef?.current) {
      console.log('===image-viewer.tsx');
      const viewportInput: PublicViewportInput = {
        viewportId: 'viewportId',
        element: elementRef.current,
        type: 'stack' as ViewportType,
      };
      onNewStackViewport(viewportInput);
      onChangeImageIds([
        `dicomweb:${window.location.origin}/bm/041ef266-f92e3dc6-f2aa40c9-9851d4fa-860b48a8/6a0bba01-cc969376-d1a14589-5a5cf539-20215973/89b510f2-b0e1de6c-c2f961e5-93f4513c-83ab69c5_0`,
      ]);
    }
  }, []);
  return (
    <>
      <ImageHeader />
      <div className={styles['container']}>
        <button className="" onClick={() => onChangeRenderingEngineId('123')}>
          New
        </button>
        <Viewport ref={elementRef}></Viewport>
        <hr />
        {/* {currentImageId} */}
      </div>
    </>
  );
}

export default ImageViewer;
