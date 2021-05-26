import { Root, Cheerio } from 'cheerio';

type ElementArgs = {
  $: Root;
  el?: Cheerio | string;
};

function getElement({ $, el }: ElementArgs, config) {
  const { selector, rootScope, type } = config;
  let element;

  if (!selector) {
    element = $(el || 'body');
  } else if (rootScope) {
    element = $(selector);
  } else {
    if (el) {
      element = $(el).find(selector);
    } else {
      element = $(selector);
    }
  }

  if (type !== 'array') {
    return element.first();
  }

  return element;
}

export default getElement;
