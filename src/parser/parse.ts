import { load, CheerioAPI } from 'cheerio';
import { InputConfig } from '../config/types';
import getValue from './getValue';

function parse(
  data: string | CheerioAPI,
  config: InputConfig
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
