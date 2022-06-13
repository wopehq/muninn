import { load, CheerioAPI } from 'cheerio';
import { Config } from '../config/types';
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

  return getValue({ $ }, config);
}

export default parse;
