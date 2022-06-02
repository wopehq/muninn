import parseSelector from './getSelector';
import { ElementPassArg } from '../parser/types';
import { Config, InputConfig, RawConfig } from './types';

function getConfig(
  { $, el }: ElementPassArg,
  inputConfig: InputConfig
): Config {
  if (!inputConfig) return {};

  if (typeof inputConfig === 'function') {
    inputConfig = <RawConfig>inputConfig($ && el ? $(el) : null);
  }

  if (typeof inputConfig === 'string' || Array.isArray(inputConfig)) {
    inputConfig = parseSelector(inputConfig);
  } else if (inputConfig?.selector) {
    const config = <Config>inputConfig;
    inputConfig = {
      ...config,
      ...parseSelector(config.selector)
    };
  }

  const { methods } = inputConfig;
  const type = methods?.includes('array') ? 'array' : inputConfig.type;
  const html = methods?.includes('html') ? true : inputConfig.html;
  const exist = methods?.includes('exist') ? true : inputConfig.exist;
  let trim = methods?.includes('trim') ? true : inputConfig.trim;
  trim = methods?.includes('non-trim') ? false : inputConfig.trim;

  if (type) inputConfig.type = type;
  if (html) inputConfig.html = html;
  if (exist) inputConfig.exist = exist;
  if (typeof trim === 'boolean') inputConfig.trim = trim;

  const config = <Config>inputConfig;

  return config;
}

export default getConfig;
