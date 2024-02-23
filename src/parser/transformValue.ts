import { Cheerio, Element } from 'cheerio';
import { RawConfig } from '../config/types';
import Methods from './methods';
import execRegex from './regex/execRegex';

function transformValue<Initial = unknown>(
  value: any,
  config: RawConfig<Initial>,
  element: Cheerio<Element>
) {
  const { trim, regex, type, methods = [], transform } = config;

  if (typeof value === 'string' && trim !== false) {
    if (regex) {
      value = execRegex(value, regex);
    }

    if (value) value = value.trim();
  }

  if (type && type !== 'array') {
    methods.push(type);
  }

  methods.forEach((name) => {
    if (Methods[name]) {
      value = Methods[name](value);
    }
  });

  if (typeof transform === 'function') {
    value = transform(value, element);
  }

  return value;
}

export default transformValue;
