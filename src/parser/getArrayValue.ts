import { ElementPassArg } from './types';

import getValue from './getValue';
import { Config } from '../config/types';

function getArrayValue(
  { $, el: element }: ElementPassArg,
  config: Config
): any[] | number {
  const values = [];

  function eachFunction(index, el) {
    const { selector, type, ...rest } = config;
    const value = getValue({ $, el: $(el) }, rest);
    values.push(value);
  }

  if (config?.elementFilter) {
    $(element)
      .filter((index, el) => config.elementFilter(index, el, $))
      .each(eachFunction);
  } else {
    $(element).each(eachFunction);
  }

  return values;
}

export default getArrayValue;
