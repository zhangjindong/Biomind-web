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
  (viewportInput: PublicViewportInput) => viewportInput
);
export const enableElement$ = combineLatest([
  newStackViewport$,
  RenderingEngine$,
]).pipe(
  tap(([viewportInput, renderingEngine]) => {
    renderingEngine?.enableElement(viewportInput);
  }),
  map(
    ([viewportInput, renderingEngine]) =>
      renderingEngine?.getViewport(viewportInput.viewportId) as IStackViewport
  )
);

////////////////////////////3、//合并所有操作流/////////////////////////
////////////////////////////4、//绑定流，释放hooks函数、触发API//////////
export const [useStackViewPort, StackViewport$] = bind(enableElement$, null);
////////////////////////////5、//订阅/////////////////////////////////
