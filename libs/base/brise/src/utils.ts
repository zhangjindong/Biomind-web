import validAttr from '@emotion/is-prop-valid';

export type ObjectMap<ValueType> = { [key: string]: ValueType };
export type EmbeddedExpression<T> = string | ((props: T) => string);

export function buildClassList<T>(
  parts: TemplateStringsArray,
  expressions: EmbeddedExpression<T>[],
  props: T
) {
  let className = '';
  for (let i = 0; i < parts.length; i++) {
    if (parts[i]) {
      className += parts[i];
    }
    if (i < expressions.length) {
      const expr = expressions[i];
      className += typeof expr === 'string' ? expr : expr(props);
    }
  }
  return className.replace(/\s+/g, ' ').trim();
}

export const mergeClassNames = (a: string, b = '') => `${a}${b ? ` ${b}` : ''}`;

export function filterProps<T extends object>(props: T): T {
  const filteredProps: T = {} as T;
  for (const name in props) {
    if (Object.prototype.hasOwnProperty.call(props, name)) {
      if (validAttr(name)) {
        filteredProps[name] = props[name];
      }
    }
  }
  return filteredProps;
}
