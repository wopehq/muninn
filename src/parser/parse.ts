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

  const rawConf = getRawConfig(config);

  if (Array.isArray(rawConf)) {
    for (const conf of rawConf) {
      const value = getValue({ $, el: $ }, conf);

      if (value !== null) {
        return value;
      }
    }

    return null;
  }

  return getValue({ $ }, rawConf);
}

export default parse;
