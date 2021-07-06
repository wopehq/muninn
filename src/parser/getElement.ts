import * as cheerio from 'cheerio';
import { ElementPassArg } from './types';
import { Config } from '../config/types';

function getElement(
  { $, el }: ElementPassArg,
  config: Config
): cheerio.Cheerio {
  if (!config) return $(el);

  const { selector, type } = config;
  let element;

  if (!selector) {
    element = $(el || 'html');
  } else if (el) {
    element = $(el).find(selector);
  } else {
    element = $(selector);
  }

  return type !== 'array' ? element.first() : element;
}

export default getElement;
