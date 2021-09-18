import { ElementPassArg } from './types';

import getValue from './getValue';
import { Config } from '../config/types';

function getArrayValue({ $, el: element }: ElementPassArg, config: Config) {
  const values = [];

  if (config?.methods?.includes('size')) {
    return $(element).length;
  }

  function eachFunction(index, el) {
    const { selector, type, ...rest } = config;
    const value = getValue({ $, el: $(el) }, rest);
    values.push(value);
  }

  if (typeof config?.elementFilter === 'function') {
    $(element)
      .filter((index, el) => config.elementFilter(index, el, $))
      .each(eachFunction);
  } else {
    $(element).each(eachFunction);
  }

  return values;
}

export default getArrayValue;
