import { createSignal } from '@react-rxjs/utils';
import { delay, map, switchMap, tap } from 'rxjs';
import { bind } from '@react-rxjs/core';
import { RenderingEngine$ } from './useRenderingEngine';
import { StackViewport, imageLoader } from '@cornerstonejs/core';

////////////////////////////1、//默认值及辅助函数////////////////////////

////////////////////////////2、//操作流////////////////////////////////
export const [ChangeImageIds$, onChangeImageIds] = createSignal(
  (imageIds: string[], viewportId: string) => ({ imageIds, viewportId })
);

export const setStack$ = RenderingEngine$.pipe(
  tap((r) => {
    console.log('====setStack renderingEngine', r);
  }),
  switchMap((renderingEngine) =>
    ChangeImageIds$.pipe(
      map(({ imageIds, viewportId }) => ({
        imageIds,
        viewportId,
        renderingEngine,
      }))
    )
  ),
  tap((a) => {
    console.log('====changeImageId ', a);
  }),
  tap(({ imageIds, viewportId, renderingEngine }) => {
    const viewport = renderingEngine?.getViewport(viewportId) as StackViewport;
    viewport?.setStack(imageIds);
    viewport?.render();
  }),
  delay(200),
  tap(({ imageIds, viewportId, renderingEngine }) => {
    imageLoader.loadAndCacheImages(imageIds);
  })
);

////////////////////////////3、//合并所有操作流/////////////////////////
////////////////////////////4、//绑定流，释放hooks函数、触发API//////////
export const [useCurrentImageId, CurrentImageId$] = bind(setStack$, null);
////////////////////////////5、//订阅/////////////////////////////////
