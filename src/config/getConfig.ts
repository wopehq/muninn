import parseSelector from './parseSelector';
import { ElementPassArg } from '../parser/types';
import { Config, RawConfig } from './types';
import { applyMethods } from './applyMethods';

function getConfig(
  { $, el }: ElementPassArg,
  config?: string
): ReturnType<typeof parseSelector>;
function getConfig(
  { $, el }: ElementPassArg,
  config?: string[]
): ReturnType<typeof parseSelector>[];
function getConfig<Initial = unknown>(
  { $, el }: ElementPassArg,
  config?: RawConfig<Initial>
): RawConfig<Initial>;
function getConfig<Initial = unknown>(
  { $, el }: ElementPassArg,
  config?: Config<Initial>
): Config<Initial> | Config<Initial>[] {
  if (!config) {
    return { selector: '' };
  }

  if (Array.isArray(config)) {
    return config.map((conf: string | RawConfig<Initial>) => {
      if (typeof conf === 'string') {
        return parseSelector<Initial>(conf);
      }

      return getConfig<Initial>({ $, el }, conf);
    });
  }

  if (typeof config === 'function') {
    const schema = config($ && el ? $(el) : null, $);

    config = {
      selector: '',
      schema
    };
  }

  if (typeof config === 'string') {
    config = parseSelector(config);
  } else if (config?.selector) {
    config = {
      ...config,
      ...parseSelector(config.selector)
    };
  }

  return applyMethods(config);
}

export default getConfig;
