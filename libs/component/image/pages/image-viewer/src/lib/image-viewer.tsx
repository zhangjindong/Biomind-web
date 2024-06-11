import { Viewport } from '@biomind-web/viewport';
import styles from './image-viewer.module.css';
import {
  onActivateStackViewport,
  onChangeImageIds,
  onChangeStudyUid,
  onNewStackViewport,
  onStackViewportRender,
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
import { utilities } from '@cornerstonejs/tools';
import { Enums, imageLoadPoolManager, imageLoader } from '@cornerstonejs/core';

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
    {
      ref: useRef<HTMLDivElement>(null),
      viewportId: 'viewportId2',
      activated: false,
    },
    {
      ref: useRef<HTMLDivElement>(null),
      viewportId: 'viewportId3',
      activated: false,
    },
    {
      ref: useRef<HTMLDivElement>(null),
      viewportId: 'viewportId4',
      activated: false,
    },
  ]);
  // const currentImageId = useCurrentImageId();
  // const re = useRenderingEngine();
  const currentImageId = useCurrentImageId();
  const renderingEngine = useRenderingEngine();
  const sericesInfos = useSericesInfo();
  const viewPorts = useStackViewPort();
  const currentViewport = useCurrentStackViewport();

  useEffect(() => {
    onNewStackViewport(
      elementRef
        .filter(({ ref }) => !!ref)
        .map(
          ({ ref, viewportId }) =>
            ({
              viewportId,
              element: ref.current,
              type: 'stack' as ViewportType,
            } as PublicViewportInput)
        )
    );
    window.addEventListener('resize', onStackViewportRender);

    return () => {
      window.removeEventListener('resize', onStackViewportRender);
      viewPorts?.map((viewport) => {
        utilities.cine.stopClip(viewport.element);
        renderingEngine.disableElement(viewport?.id);
      });
      // imageLoader.cancelLoadAll();
      // renderingEngine.destroy();
    };
  }, []);
  useEffect(() => {
    // console.log('** studyuid = ', studyuid);
    if (studyuid) {
      onChangeStudyUid(studyuid);
    }
  }, [studyuid]);
  useEffect(() => {
    // console.log('** sericesInfos = ', sericesInfos);
    if (sericesInfos?.length > 0) {
      onChangeImageIds(sericesInfos?.[0].imageIds, 'viewportId');
      onChangeImageIds(sericesInfos?.[1].imageIds, 'viewportId2');
      onChangeImageIds(sericesInfos?.[2].imageIds, 'viewportId3');
      onChangeImageIds(sericesInfos?.[3].imageIds, 'viewportId4');
    }
  }, [sericesInfos]);

  const changeInvert = () => {
    const { invert } = currentViewport?.getProperties() || { invert: false };
    currentViewport?.setProperties({ invert: !invert });
    currentViewport?.render();
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
        <button className="" onClick={() => changeInvert()}>
          Invert
        </button>

        <button
          onClick={() => {
            utilities.cine.playClip(currentViewport?.element, { loop: true });
          }}
        >
          playClip
        </button>
        <div className={styles['viewgrid']}>
          <Viewport
            ref={elementRef[0].ref}
            activated={elementRef[0].activated}
            onActivated={() => activateViewport(elementRef[0].viewportId)}
          ></Viewport>
          <Viewport
            ref={elementRef[1].ref}
            activated={elementRef[1].activated}
            onActivated={() => activateViewport(elementRef[1].viewportId)}
          ></Viewport>
          <Viewport
            ref={elementRef[2].ref}
            activated={elementRef[2].activated}
            onActivated={() => activateViewport(elementRef[2].viewportId)}
          ></Viewport>
          <Viewport
            ref={elementRef[3].ref}
            activated={elementRef[3].activated}
            onActivated={() => activateViewport(elementRef[3].viewportId)}
          ></Viewport>
        </div>
        <hr />
        {/* {currentImageId} */}
      </div>
    </>
  );
}

export default ImageViewerPage;
