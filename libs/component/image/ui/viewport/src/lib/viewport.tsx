import { ForwardedRef, forwardRef } from 'react';
import { ViewPortStyles } from './shared/ui';

/* eslint-disable-next-line */
export interface ViewportProps {
  activated?: boolean;
  onActivated?: () => void;
}

export const Viewport = forwardRef(function Viewport(
  props: ViewportProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const { activated = false, onActivated } = props;
  return (
    <div
      ref={ref}
      className={ViewPortStyles`${{ activated }}`}
      onClick={(e) => onActivated && onActivated()}
    ></div>
  );
});
export default Viewport;
