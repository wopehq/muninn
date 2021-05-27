import { load } from 'cheerio';
import getValue from './getValue';

function parse(data, config) {
  const $ = load(data);

  return getValue({ $ }, config);
}

export default parse;
