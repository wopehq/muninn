import parseSelector from '../config/getSelector';
import { Config, RawConfig } from '../config/types';

export function getRawConfig<Initial = unknown>(
  conf: Config<Initial>
): RawConfig<Initial> | RawConfig<Initial>[] {
  if (typeof conf === 'string') {
    return parseSelector(conf);
  }

  if (typeof conf === 'function') {
    return {
      selector: '',
      schema: conf
    };
  }

  if (Array.isArray(conf)) {
    return conf.map((c) => getRawConfig(c) as RawConfig<Initial>);
  }

  return conf;
}
