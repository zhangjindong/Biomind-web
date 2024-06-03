import { Viewport } from '@biomind-web/viewport';
import styles from './image-viewer.module.css';
import {
  onActivateStackViewport,
  onChangeImageIds,
  onChangeRenderingEngineId,
  onChangeStudyUid,
  onNewStackViewport,
  useCurrentImageId,
  useCurrentStackViewport,
  useRenderingEngine,
  useSericesInfo,
  useStackViewPort,
} from '@biomind-web/app-image-viewer';
import { useEffect, useRef, useState } from 'react';
import { PublicViewportInput } from '@cornerstonejs/core/dist/types/types';
import { ImageHeader } from '@biomind-web/image-ui';
import { ViewportType } from '@cornerstonejs/core/dist/types/enums';
import { useSearchParams } from 'react-router-dom';

/* eslint-disable-next-line */
export interface ImageViewerProps {}

export function ImageViewerPage(props: ImageViewerProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const studyuid = searchParams.get('studyuid');
  const [elementRef, setElementRef] = useState([
    {
      ref: useRef<HTMLDivElement>(null),
      viewportId: 'viewportId',
      activated: false,
    },
  ]);
  // const currentImageId = useCurrentImageId();
  // const re = useRenderingEngine();
  const currentImageId = useCurrentImageId();
  const renderingEngine = useRenderingEngine();
  const sericesInfos = useSericesInfo();
  const viewPorts = useStackViewPort();

  useEffect(() => {
    onChangeRenderingEngineId('12345');
    if (elementRef[0].ref.current) {
      const viewportInput: PublicViewportInput = {
        viewportId: 'viewportId',
        element: elementRef[0].ref.current,
        type: 'stack' as ViewportType,
      };
      onNewStackViewport([viewportInput]);
      // onChangeImageIds([
      //   `bmweb:${window.location.origin}/bm/041ef266-f92e3dc6-f2aa40c9-9851d4fa-860b48a8/6a0bba01-cc969376-d1a14589-5a5cf539-20215973/17e0b02b-f08617e6-ff2a4a7d-720de2fc-2a0942dd_0`,
      // ]);
    }
    return;
  }, []);
  useEffect(() => {
    console.log('** studyuid = ', studyuid);
    if (studyuid) {
      onChangeStudyUid(studyuid);
    }
  }, [studyuid]);
  useEffect(() => {
    console.log('** sericesInfos = ', sericesInfos);
    if (sericesInfos?.length > 0) {
      onChangeImageIds(sericesInfos?.[0].imageIds);
    }
  }, [sericesInfos]);

  const changeInvert = () => {
    const { invert } = viewPorts?.[0]?.getProperties() || { invert: false };
    viewPorts?.[0]?.setProperties({ invert: !invert });
    viewPorts?.[0]?.render();
  };

  const activateViewport = (viewportId: string) => {
    setElementRef((elementRef) =>
      elementRef.map((refObj) => ({
        ...refObj,
        activated: viewportId === refObj.viewportId,
      }))
    );
    onActivateStackViewport(viewportId);
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
        <Viewport
          ref={elementRef[0].ref}
          activated={elementRef[0].activated}
          onActivated={() => activateViewport(elementRef[0].viewportId)}
        ></Viewport>
        <hr />
        {/* {currentImageId} */}
      </div>
    </>
  );
}

export default ImageViewerPage;
