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
  const exist = methods?.includes('exist') ? true : config.exist;
  let trim = methods?.includes('trim') ? true : config.trim;
  trim = methods?.includes('non-trim') ? false : config.trim;

  if (html) config.html = html;
  if (exist) config.exist = exist;
  if (typeof trim === 'boolean') config.trim = trim;

  return config;
}

export default getConfig;
