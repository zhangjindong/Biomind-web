import { RenderingEngine } from '@cornerstonejs/core';
import { bind, shareLatest } from '@react-rxjs/core';
import { createSignal } from '@react-rxjs/utils';
import { EMPTY, combineLatest, from, of, startWith, switchMap } from 'rxjs';
import { initCornerstone } from './init';

////////////////////////////1、//默认值及辅助函数////////////////////////
export const defaultRenderingEngineId = 'myRenderingEngine';
////////////////////////////2、//操作流////////////////////////////////
export const [changeRenderingEngineId$, onChangeRenderingEngineId] =
  createSignal(
    (renderingEngineId?: string) =>
      renderingEngineId || defaultRenderingEngineId
  );

const checkRenderingEngine$ = combineLatest([
  from(initCornerstone()).pipe(startWith(false)),
  changeRenderingEngineId$.pipe(startWith(defaultRenderingEngineId)),
]).pipe(
  // tap(([initialized, renderingEngineId]) =>
  //   console.log('== before new Rendering', renderingEngineId, initialized)
  // ),
  switchMap(([initialized, renderingEngineId]) =>
    initialized ? of(new RenderingEngine(renderingEngineId)) : EMPTY
  ),
  shareLatest()
);
////////////////////////////3、//合并所有操作流/////////////////////////
////////////////////////////4、//绑定流，释放hooks函数、触发API//////////
export const [useRenderingEngine, RenderingEngine$] = bind(
  checkRenderingEngine$,
  null
);
////////////////////////////5、//订阅/////////////////////////////////
