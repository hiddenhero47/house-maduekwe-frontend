import { createGlobalStyle } from 'styled-components';
import { colors } from './utilities/colors';

const flattenColors = (obj, prefix = '') =>
	Object.entries(obj).flatMap(([key, value]) =>
		typeof value === 'object'
			? flattenColors(value, `${prefix}${key}-`)
			: [`--${prefix}${key}: ${value};`]
	);

const GlobalStyleInjector = createGlobalStyle`
  :root {
    ${flattenColors(colors.light).join('\n')}
  }

  [data-theme="dark"] {
    ${flattenColors(colors.dark).join('\n')}
  }

  body {
    font-family: Outfit;
    margin: 0px;
    overflow-x: hidden;
    overscroll-behavior-y: none;
    display: flex;
    justify-content: center;
  }

  #containerBody {
    /* max-width: 1500px; */
    width: 100vw;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;
  }

  div {
    box-sizing: border-box;
  }
`;

export default GlobalStyleInjector;
