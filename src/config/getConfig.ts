import parseSelector from './parseSelector';
import { ElementPassArg } from '../parser/types';
import { Config, RawConfig } from './types';
import { applyMethods } from './applyMethods';

function getConfig(
  { $, el }: ElementPassArg,
  conf?: string
): ReturnType<typeof parseSelector>;
function getConfig(
  { $, el }: ElementPassArg,
  conf?: string[]
): ReturnType<typeof parseSelector>[];
function getConfig<Initial = unknown>(
  { $, el }: ElementPassArg,
  conf?: RawConfig<Initial>
): RawConfig<Initial>;
function getConfig<Initial = unknown>(
  { $, el }: ElementPassArg,
  conf?: Config<Initial>
): Config<Initial> | Config<Initial>[] {
  if (!conf) {
    return { selector: '' };
  }

  if (typeof conf === 'function') {
    const schema = conf($ && el ? $(el) : null);

    conf = {
      selector: '',
      schema
    };
  }

  if (Array.isArray(conf)) {
    return conf.map((c: string | RawConfig<Initial>) => {
      if (typeof c === 'string') {
        return parseSelector<Initial>(c);
      }

      return getConfig<Initial>({ $, el }, c);
    });
  }

  if (typeof conf === 'string') {
    conf = parseSelector(conf);
  } else if (conf?.selector) {
    conf = {
      ...conf,
      ...parseSelector(conf.selector)
    };
  }

  applyMethods(conf);

  return conf;
}

export default getConfig;
