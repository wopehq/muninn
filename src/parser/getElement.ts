import { Cheerio } from 'cheerio';
import { ElementPassArg } from './types';
import { Config } from '../config/types';

function getElement({ $, el }: ElementPassArg, config: Config): Cheerio<any> {
  if (!config) return $(el);

  const { selector, rootScope, type } = config;
  let element;

  if (!selector) {
    element = $(el || 'html');
  } else if (rootScope) {
    element = $(selector);
  } else if (el) {
    element = $(el).find(selector);
  } else {
    element = $(selector);
  }

  return type !== 'array' ? element.first() : element;
}

export default getElement;
