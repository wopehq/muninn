import parseSelector from './getSelector';
import { ElementPassArg } from '../parser/types';

function getConfig({ $, el }: ElementPassArg, config) {
  if (!config) return null;

  if (typeof config === 'function') {
    let element = null;
    if ($ && el) {
      element = $(el);
    }
    config = config(element);
  }

  if (typeof config?.selector === 'string' || Array.isArray(config?.selector)) {
    config = { ...config, ...parseSelector(config.selector) };
  } else {
    config = parseSelector(config);
  }

  const { methods } = config;

  const type = methods?.includes('array') ? 'array' : config.type;
  const html = methods?.includes('html') ? true : config.html;

  if (type) config.type = type;
  if (html) config.html = html;

  return config;
}

export default getConfig;
