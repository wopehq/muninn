import { Root, Cheerio } from 'cheerio';

import transformValue from './transformValue';

type ValueArgs = {
  $: Root;
  el?: Cheerio | string;
};

function getSimpleValue({ $, el }: ValueArgs, config) {
  const { html, attr } = config;
  const element = $(el);

  let value;

  if (html) {
    value = element.html();
  } else if (attr) {
    value = element.attr(attr);
  } else {
    value = element.text();
  }

  return transformValue(value, config);
}

export default getSimpleValue;
