import {
  IStackViewport,
  PublicViewportInput,
} from '@cornerstonejs/core/dist/types/types';
import { createSignal } from '@react-rxjs/utils';
import { combineLatest, map, tap, throttleTime, withLatestFrom } from 'rxjs';
import { RenderingEngine$ } from './useRenderingEngine';
import { bind, shareLatest } from '@react-rxjs/core';
import { addManipulationTool } from './addTools';

////////////////////////////1、//默认值及辅助函数////////////////////////
////////////////////////////2、//操作流////////////////////////////////
export const [newStackViewport$, onNewStackViewport] = createSignal(
  (viewportInputs: PublicViewportInput[]) => viewportInputs
);
export const [StackViewportRender$, onStackViewportRender] = createSignal();
export const [activateStackViewport$, onActivateStackViewport] = createSignal(
  (viewportId: string) => viewportId
);
const toolGroup = addManipulationTool();

export const enableElement$ = combineLatest([
  newStackViewport$,
  RenderingEngine$,
]).pipe(
  tap(([viewportInputs, renderingEngine]) => {
    // renderingEngine?.enableElement();
    renderingEngine?.setViewports(viewportInputs);

    renderingEngine.getViewports().map((viewport) => {
      toolGroup?.addViewport(viewport.id, renderingEngine.id);
    });
  }),
  map(
    ([_viewportInputs, renderingEngine]) =>
      renderingEngine?.getViewports() as IStackViewport[]
  ),
  shareLatest()
);
export const getStackViewport$ = combineLatest([
  activateStackViewport$,
  RenderingEngine$,
]).pipe(
  map(
    ([viewportId, renderingEngine]) =>
      renderingEngine?.getViewport(viewportId) as IStackViewport
  )
);

export const renderStackViewport$ = StackViewportRender$.pipe(
  throttleTime(30),
  // tap(() => // // console.log('1111')),
  withLatestFrom(RenderingEngine$),
  tap(([_, renderingEngine]) => renderingEngine?.resize(true))
);

////////////////////////////3、//合并所有操作流/////////////////////////
////////////////////////////4、//绑定流，释放hooks函数、触发API//////////
export const [useStackViewPort, StackViewport$] = bind(enableElement$, null);
// StackViewport$.subscribe();
export const [useCurrentStackViewport, CurrentStackViewport$] = bind(
  getStackViewport$,
  null
);
////////////////////////////5、//订阅/////////////////////////////////
renderStackViewport$.subscribe();
