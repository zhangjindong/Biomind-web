import { Viewport } from '@biomind-web/viewport';
import styles from './image-viewer.module.css';
import {
  onChangeImageIds,
  onChangeRenderingEngineId,
  onNewStackViewport,
  useCurrentImageId,
  useStackViewPort,
} from '@biomind-web/app-image-viewer';
import { useEffect, useRef } from 'react';
import { PublicViewportInput } from '@cornerstonejs/core/dist/types/types';
import { ImageHeader } from '@biomind-web/image-ui';
import { ViewportType } from '@cornerstonejs/core/dist/types/enums';

/* eslint-disable-next-line */
export interface ImageViewerProps {}

export function ImageViewerPage(props: ImageViewerProps) {
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
        `bmweb:${window.location.origin}/bm/041ef266-f92e3dc6-f2aa40c9-9851d4fa-860b48a8/6a0bba01-cc969376-d1a14589-5a5cf539-20215973/17e0b02b-f08617e6-ff2a4a7d-720de2fc-2a0942dd_0`,
      ]);
    }
  }, []);
  const viewPort = useStackViewPort();
  const changeInvert = () => {
    const { invert } = viewPort?.getProperties() || { invert: false };
    viewPort?.setProperties({ invert: !invert });
    viewPort?.render();
  };
  return (
    <>
      <ImageHeader />
      <div className={styles['container']}>
        <button className="" onClick={() => onChangeRenderingEngineId('123')}>
          New
        </button>
        <button className="" onClick={() => changeInvert()}>
          Invert
        </button>
        <Viewport ref={elementRef}></Viewport>
        <hr />
        {/* {currentImageId} */}
      </div>
    </>
  );
}

export default ImageViewerPage;
