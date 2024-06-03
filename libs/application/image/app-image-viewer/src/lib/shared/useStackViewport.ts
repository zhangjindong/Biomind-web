import {
  IStackViewport,
  PublicViewportInput,
} from '@cornerstonejs/core/dist/types/types';
import { createSignal } from '@react-rxjs/utils';
import { combineLatest, map, tap } from 'rxjs';
import { RenderingEngine$ } from './useRenderingEngine';
import { bind } from '@react-rxjs/core';

////////////////////////////1、//默认值及辅助函数////////////////////////
////////////////////////////2、//操作流////////////////////////////////
export const [newStackViewport$, onNewStackViewport] = createSignal(
  (viewportInputs: PublicViewportInput[]) => viewportInputs
);
export const [activateStackViewport$, onActivateStackViewport] = createSignal(
  (viewportId: string) => viewportId
);
export const enableElement$ = combineLatest([
  newStackViewport$,
  RenderingEngine$,
]).pipe(
  tap(([viewportInputs, renderingEngine]) => {
    // renderingEngine?.enableElement();
    renderingEngine?.setViewports(viewportInputs);
  }),
  map(
    ([_viewportInputs, renderingEngine]) =>
      renderingEngine?.getViewports() as IStackViewport[]
  )
);
export const getViewport$ = combineLatest([
  activateStackViewport$,
  RenderingEngine$,
]).pipe(
  map(([viewportId, renderingEngine]) =>
    renderingEngine?.getViewport(viewportId)
  )
);

////////////////////////////3、//合并所有操作流/////////////////////////
////////////////////////////4、//绑定流，释放hooks函数、触发API//////////
export const [useStackViewPort, StackViewport$] = bind(enableElement$, null);
export const [useCurrentStackViewport, CurrentStackViewport$] = bind(
  getViewport$,
  null
);
////////////////////////////5、//订阅/////////////////////////////////
