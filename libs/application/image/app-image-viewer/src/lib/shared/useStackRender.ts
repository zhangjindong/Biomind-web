import { createSignal } from '@react-rxjs/utils';
import { combineLatest, concatMap, from, of, switchMap, tap } from 'rxjs';
import { StackViewport$ } from './useStackViewport';
import { SUSPENSE, bind } from '@react-rxjs/core';

////////////////////////////1、//默认值及辅助函数////////////////////////

////////////////////////////2、//操作流////////////////////////////////
export const [ChangeImageIds$, onChangeImageIds] = createSignal(
  (imageIds: string[]) => imageIds
);

export const setStack$ = combineLatest([ChangeImageIds$, StackViewport$]).pipe(
  switchMap(([imageIds, viewport]) =>
    from(viewport?.[0]?.setStack(imageIds) || of(SUSPENSE))
  ),
  tap((id) => console.log('---id:', id)),
  concatMap(() => StackViewport$),
  tap((viewport) => {
    viewport?.[0]?.render();
  })
);

////////////////////////////3、//合并所有操作流/////////////////////////
////////////////////////////4、//绑定流，释放hooks函数、触发API//////////
export const [useCurrentImageId, CurrentImageId$] = bind(setStack$, null);
////////////////////////////5、//订阅/////////////////////////////////
