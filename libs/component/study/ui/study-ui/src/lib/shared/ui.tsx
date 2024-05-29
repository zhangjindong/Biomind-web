import { ClassNamesTag } from '@biomind-web/utils';
import classnames, {
  TArg,
  TTailwindString,
  backgrounds,
  borders,
  effects,
  flexBox,
  layout,
  sizing,
  spacing,
  textColor,
  typography,
} from 'tailwindcss-classnames';

type PropsType = {
  color: 'white' | 'zinc' | 'blue' | 'sky';
};
type PropsFun = (props?: PropsType) => TArg;
export const ListViewHeaderStyles = ClassNamesTag<
  PropsType,
  PropsFun | string
>`${classnames(
  layout('flex'),
  flexBox('items-center'),
  spacing('pl-2'),
  backgrounds('bg-slate-800'),
  sizing('w-full', 'h-[50px]' as TTailwindString)
)} ${(props) =>
  !props
    ? textColor('text-white')
    : classnames(
        textColor({
          'text-white': props.color === 'white',
          'text-zinc-400': props.color === 'zinc',
          'text-blue-600': props.color === 'blue',
          'text-sky-600': props.color === 'sky',
        })
      )}`;

export const ListViewTableStyles = ClassNamesTag`${classnames(
  borders(
    'border-solid',
    'border-t-0',
    'border-r-0',
    'border-zinc-300',
    '[&_.ant-table-thead_tr_th]:border-zinc-300' as TTailwindString
  ),
  effects('shadow-md', 'shadow-zinc-200'),
  backgrounds('[&_.ant-table-thead_tr_th]:bg-sky-100' as TTailwindString),
  typography('[&_.ant-table-thead_tr_th]:text-slate-600' as TTailwindString),
  layout('[&_.ant-pagination-total-text]:flex-1' as TTailwindString)
)}`;
