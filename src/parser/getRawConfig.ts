import parseSelector from '../config/parseSelector';
import { type Config, type RawConfig } from '../config/types';

export function getRawConfig<Initial = unknown>(
  config: Config<Initial>
): RawConfig<Initial> | RawConfig<Initial>[] {
  if (typeof config === 'string') {
    return parseSelector(config);
  }

  if (typeof config === 'function') {
    return {
      selector: '',
      schema: config
    };
  }

  if (Array.isArray(config)) {
    return config.map(getRawConfig) as RawConfig<Initial>[];
  }

  if (config.selector !== '') {
    return {
      ...config,
      ...parseSelector(config.selector)
    };
  }

  return config;
}
