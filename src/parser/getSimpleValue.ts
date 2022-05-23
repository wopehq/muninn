import { ElementPassArg } from './types';

import transformValue from './transformValue';
import { Config } from '../config/types';

function getSimpleValue({ $, el }: ElementPassArg, config: Config) {
  const { html, attr, initial, fill } = config;

  if (fill) return fill;

  const element = $(el);
  let value;

  if (html) {
    value = element.html();
  } else if (attr) {
    value = element.attr(attr);
  } else {
    value = element.text();
  }

  if (initial && !value) {
    value = initial;
  }

  if (value === undefined) {
    return null;
  }

  return transformValue(value, config);
}

export default getSimpleValue;
