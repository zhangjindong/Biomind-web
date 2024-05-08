import classnames, { TArg, TTailwindString } from 'tailwindcss-classnames';

/**
 * classnames 支持对象属性/或函数计算
 * @param rawStrings 模板字符串
 *  @param rawExps 模板字符串
 *  @example
  type PropsType = { color: 'white' | 'zinc' | 'blue' | 'sky' };
  type PropsFun = (props?: PropsType) => TArg;
  export const HeaderStyles = ClassNamesTag<
    PropsType,
    PropsFun | string
  >`flex ${(props) =>
    (props?.color === 'white'? 'text-white'
      : props?.color === 'zinc'? 'text-zinc-400'
      : '') as TArg}`;

  <div className={HeaderStyles` ${{ color: 'zinc' }}`}>
 */
export const ClassNamesTag =
  <T, U>(rawStrings: TemplateStringsArray, ...rawExps: U[]) =>
  (strings: TemplateStringsArray, ...exps: T[]) => {
    let i = 0;
    const argResult = rawExps.reduce((acc, cur) => {
      if (typeof cur === 'function')
        return classnames(acc as TArg, cur(exps[i++]));

      return classnames(acc as TArg, cur as TArg);
    }, '');
    const argsRaw = classnames(
      ...(rawStrings as unknown as TArg[]),
      ...(strings as unknown as TArg[])
    );
    return classnames(argsRaw, argResult as TTailwindString);
  };
