import * as cheerio from 'cheerio';
import getValue from './getValue';

function parse(data, config) {
  const $ = cheerio.load(data);

  return getValue({ $ }, config);
}

export default parse;
