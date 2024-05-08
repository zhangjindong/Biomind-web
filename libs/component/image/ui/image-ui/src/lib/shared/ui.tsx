import { ClassNamesTag } from '@biomind-web/utils';
import classnames, {
  TArg,
  THeight,
  backgroundColor,
  display,
  flexBox,
  height,
  padding,
  textColor,
  width,
} from 'tailwindcss-classnames';

type PropsType = {
  color: 'white' | 'zinc' | 'blue' | 'sky';
};
type PropsFun = (props?: PropsType) => TArg;
export const ImageViewerHeaderStyles = ClassNamesTag<
  PropsType,
  PropsFun | string
>`${classnames(
  display('flex'),
  flexBox('items-center'),
  width('w-full'),
  height('h-[50px]' as THeight),
  backgroundColor('bg-zinc-800'),
  padding('pl-7')
)} ${(props = { color: 'zinc' }) =>
  classnames(
    textColor({
      'text-white': props.color === 'white',
      'text-zinc-400': props.color === 'zinc',
      'text-blue-600': props.color === 'blue',
      'text-sky-600': props.color === 'sky',
    })
  )}`;
