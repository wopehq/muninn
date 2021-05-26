import { Root, Cheerio } from 'cheerio';

import getConfig from '../config/getConfig';
import getElement from './getElement';
import transformValue from './transformValue';

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

function getSchemaValue({ $, el }: ValueArgs, config) {
  const value = Object.keys(config).reduce((values, key) => {
    const currentRawConfig = getConfig(config[key]);
    values[key] = getValue({ $, el }, currentRawConfig);

    return values;
  }, {});

  return value;
}

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

function getValue({ $, el }: ValueArgs, rawConfig) {
  const config = getConfig(rawConfig);
  const element = getElement({ $, el }, config);
  const { type, selector, ...rest } = config;
  const { schema } = rest;

  if (type === 'array') {
    return getArrayValue({ $, el: element }, rest);
  } else if (schema) {
    return getSchemaValue({ $, el: element }, schema);
  } else {
    return getSimpleValue({ $, el: element }, rest);
  }
}

export default getValue;
