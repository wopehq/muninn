import parseSelector from './getSelector';
import { ElementPassArg } from '../parser/types';
import { Config, RawConfig } from './types';

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

  const { methods } = conf;
  const type = methods?.includes('array') ? 'array' : conf.type;
  const html = methods?.includes('html') ? true : conf.html;
  const exist = methods?.includes('exist') ? true : conf.exist;
  let trim = methods?.includes('trim') ? true : conf.trim;
  trim = methods?.includes('non-trim') ? false : conf.trim;

  if (type) conf.type = type;
  if (html) conf.html = html;
  if (exist) conf.exist = exist;
  if (typeof trim === 'boolean') conf.trim = trim;

  return conf;
}

export default getConfig;
