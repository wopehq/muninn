import { load, CheerioAPI } from 'cheerio';
import { Config } from '../config/types';
import { getRawConfig } from './getRawConfig';
import getValue from './getValue';

function parse<Initial = unknown>(
  data: string | CheerioAPI,
  config: Config<Initial>
): Record<string, unknown> {
  let $;

  if (typeof data === 'string') {
    $ = load(data);
  } else if (typeof data === 'function') {
    $ = data;
  }

  const rawConfig = getRawConfig(config);

  if (Array.isArray(rawConfig)) {
    for (const conf of rawConfig) {
      const value = getValue({ $, el: $ }, conf);

      if (value !== null) return value;
    }

    return null;
  }

  return getValue({ $ }, rawConfig);
}

export default parse;
