import { RawConfig } from './types';

export function applyMethods<Initial = unknown>(
  config: RawConfig<Initial>
): typeof config {
  const { methods } = config;

  if (!methods) return config;

  const type = methods.includes('array') ? 'array' : config.type;
  const html = methods.includes('html') ? true : config.html;
  const exist = methods.includes('exist') ? true : config.exist;
  let trim = methods.includes('trim') ? true : config.trim;

  trim = methods.includes('non-trim') ? false : config.trim;

  if (type) config.type = type;
  if (html) config.html = html;
  if (exist) config.exist = exist;
  if (typeof trim === 'boolean') config.trim = trim;

  return config;
}
