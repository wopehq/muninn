import { load } from 'cheerio';
import { InputConfig } from '../config/types';
import getValue from './getValue';

function parse(data: string, config: InputConfig): Object {
  const $ = load(data);

  return getValue({ $ }, config);
}

export default parse;
