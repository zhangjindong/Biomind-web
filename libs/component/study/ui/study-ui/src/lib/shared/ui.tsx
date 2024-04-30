import { property, styles } from '@biomind-web/brise';

/**
 * tailwind styles
 * List Viewer herder
 * @example
 * TsHeaderClass({
 *  'overflow-hidden': true ,
 *  className:'text-red-500'
 * })
 */
export const TsHeaderClass = styles`
w-full
bg-[#233240]
h-[50px]
text-white
flex
items-center
${(props) =>
  ((props?.className as string) || '') +
  ' ' +
  Object.keys(props)
    .filter((prop) => !['className'].includes(prop) && props[prop])
    .join(' ')}
`;
console.log(
  property(
    'size', // name of the property
    {
      small: 'text-2xl', // value can be a string
      medium: styles`text-4xl`, // or a reusable style
      large: (props) => 'text-6xl', // or a function
    },
    'medium' // default value
  )
);
