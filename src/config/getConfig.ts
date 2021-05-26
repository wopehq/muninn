import parseSelector from './getSelector';

function getConfig(config) {
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
