import { ClassNamesTag } from '@biomind-web/utils';
import classnames, {
  TArg,
  backgroundColor,
  borderColor,
  borderStyle,
  borderWidth,
  display,
  flexBox,
  height,
  width,
} from 'tailwindcss-classnames';

type PropsType = {
  activated: boolean;
};
type PropsFun = (props?: PropsType) => TArg;
export const ViewPortStyles = ClassNamesTag<
  PropsType,
  PropsFun | string
>`${classnames(
  display('flex'),
  flexBox('items-center'),
  width('w-full'),
  height('h-full'),
  backgroundColor('bg-transparent'),
  borderWidth('border-2'),
  borderStyle('border-solid'),
  borderColor('border-black', 'hover:border-orange-300')
)} ${(props = { activated: false }) =>
  classnames(
    borderColor({
      'border-orange-500': props.activated,
    })
  )}`;
