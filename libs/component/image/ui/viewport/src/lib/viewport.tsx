import { ForwardedRef, forwardRef } from 'react';
import { ViewPortStyles } from './shared/ui';

/* eslint-disable-next-line */
export interface ViewportProps {
  activated?: boolean;
}

export const Viewport = forwardRef(function Viewport(
  props: ViewportProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const { activated = false } = props;
  return <div ref={ref} className={ViewPortStyles`${{ activated }}`}></div>;
});
export default Viewport;
