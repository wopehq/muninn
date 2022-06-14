import { Cheerio, Element } from 'cheerio';
import { ElementPassArg } from './types';
import { RawConfig } from '../config/types';

function getElement<Initial = unknown>(
  { $, el }: ElementPassArg,
  config: RawConfig<Initial>
): Cheerio<Element> {
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
