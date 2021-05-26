import { Root, Cheerio } from 'cheerio';

import getValue from './getValue';

type ValueArgs = {
  $: Root;
  el?: Cheerio | string;
};

function getArrayValue({ $, el: element }: ValueArgs, config) {
  const values = [];

  $(element).each((index, el) => {
    const { selector, type, ...rest } = config;
    const value = getValue({ $, el: $(el) }, rest);
    values.push(value);
  });

  return values;
}

export default getArrayValue;
