import { ElementPassArg } from './types';

import getValue from './getValue';

function getArrayValue({ $, el: element }: ElementPassArg, config) {
  const values = [];

  $(element).each((index, el) => {
    const { selector, type, ...rest } = config;
    const value = getValue({ $, el: $(el) }, rest);
    values.push(value);
  });

  return values;
}

export default getArrayValue;
