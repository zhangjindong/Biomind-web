import '../assets/iconfont.js';
import { styles } from '@biomind-web/brise';
const icon = styles`
inline-block
${(props) => (props?.className as string) || ''}`;
const iconSvg = styles`
w-[1em] h-[1em]
vertical-align-[-0.15em]
fill-current
overflow-hidden
${(props) => props?.className as string || ''}`;

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
    <span className={icon({ className: props?.className })}>
      <svg
        className={iconSvg({ className: props?.svgClassName })}
        aria-hidden="true"
        {...props.svgProps}
      >
        <use xlinkHref={`#icon-${props.type}`}></use>
      </svg>
    </span>
  );
}

export default Iconfont;
