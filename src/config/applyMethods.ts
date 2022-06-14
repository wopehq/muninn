import { RawConfig } from './types';

export function applyMethods<Initial = unknown>(
  conf: RawConfig<Initial>
): typeof conf {
  const { methods } = conf;

  if (!methods) {
    return;
  }

  const type = methods.includes('array') ? 'array' : conf.type;
  const html = methods.includes('html') ? true : conf.html;
  const exist = methods.includes('exist') ? true : conf.exist;
  let trim = methods.includes('trim') ? true : conf.trim;

  trim = methods.includes('non-trim') ? false : conf.trim;

  if (type) conf.type = type;
  if (html) conf.html = html;
  if (exist) conf.exist = exist;
  if (typeof trim === 'boolean') conf.trim = trim;

  return conf;
}
