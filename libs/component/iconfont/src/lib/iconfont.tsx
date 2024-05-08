import classnames, { TArg, display } from 'tailwindcss-classnames';
import '../assets/iconfont.js';

const icon = classnames(display('inline-block'));
const iconSvg = classnames(
  `w-[1em]
  h-[1em]
  vertical-align-[-0.15em]
  fill-current
  overflow-hidden` as TArg
);

/* eslint-disable-next-line */
export interface IconfontProps {
  type: string;
  className?: string;
  svgProps?: Record<string, any>;
  svgClassName?: string;
}
// /* 通过设置 font-size 来改变图标大小 */
// width: 1em;
// /* 图标和文字相邻时，垂直对齐 */
// vertical-align: -0.15em;
// /* 通过设置 color 来改变 SVG 的颜色/fill */
// fill: currentColor;
// /* path 和 stroke 溢出 viewBox 部分在 IE 下会显示
//     normalize.css 中也包含这行 */
// overflow: hidden;
export function Iconfont(props: IconfontProps) {
  return (
    <span className={classnames(icon, props?.className as TArg)} role="img">
      <svg
        className={classnames(iconSvg, props?.svgClassName as TArg)}
        aria-hidden="true"
        {...props.svgProps}
      >
        <title>{props.type}</title>
        <use xlinkHref={`#icon-${props.type}`}></use>
      </svg>
    </span>
  );
}

export default Iconfont;
