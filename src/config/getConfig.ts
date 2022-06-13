import parseSelector from './parseSelector';
import { ElementPassArg } from '../parser/types';
import { Config, RawConfig } from './types';
import { applyMethods } from './applyMethods';

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
    return conf.map((conf) => getConfig({ $, el }, conf));
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
