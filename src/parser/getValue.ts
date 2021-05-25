import cheerio = require('cheerio');
import { Selector, SelectorConfig } from '../config';
import getConfigSchema from '../config/getConfigSchema';
import getValueWithSchema from './getValueWithSchema';
import transformValue from '../utils/transformValue';

function getValue(
  $: cheerio.Root,
  el: any,
  selectorConfig: Selector | SelectorConfig
): any {
  const {
    selector,
    method,
    params,
    regex,
    trim,
    rootScope,
    type,
    custom,
    methods,
    schema
  } = getConfigSchema(selectorConfig);

  let currentEl;

  if (!selector) {
    currentEl = $(el);
  } else {
    if (rootScope) {
      currentEl = $(selector.join(', '));
      if (type !== 'array') {
        currentEl = currentEl.first();
      }
    } else {
      currentEl = $(el).first().find(selector.join(', '));
    }
  }

  if (type === 'array') {
    const values = [];

    currentEl.each((index, el) => {
      const value = schema
        ? getValueWithSchema($, el, schema)
        : transformValue({
            value: $(el)[method](params),
            trim,
            regex,
            type
          });

      values.push(value);
    });

    return values;
  }

  if (schema) {
    return getValueWithSchema($, currentEl, schema);
  }

  let value = $(currentEl).first()?.[method]?.(params) || null;

  value = transformValue({ value, trim, regex, type, custom, methods });

  return value;
}

export default getValue;
