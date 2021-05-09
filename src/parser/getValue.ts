import cheerio = require('cheerio');
import { SelectorConfig } from '../config';
import getConfigSchema from '../utils/getConfigSchema';
import getValueWithSchema from './getValueWithSchema';
import transformValue from './transformValue';

function getValue(
  $: cheerio.Root,
  el: any,
  fieldSelector: SelectorConfig
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
    schema
  } = getConfigSchema(fieldSelector);

  let currentEl;

  if (rootScope) {
    currentEl = $(selector.join(', ')).first();
  } else {
    currentEl = $(el).first().find(selector.join(', '));
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

  let value = $(currentEl).first()[method](params);

  value = transformValue({ value, trim, regex, type, custom });

  return value;
}

export default getValue;
