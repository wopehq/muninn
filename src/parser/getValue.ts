import cheerio = require('cheerio');
import { SelectorSchema } from '../config';
import getConfigSchema from '../utils/getConfigSchema';
import getValueWithSchema from './getValueWithSchema';
import transformValue from './transformValue';

function getValue(
  $: cheerio.Root,
  el: any,
  fieldSelector: SelectorSchema
): any {
  const {
    selector,
    method,
    params,
    regex,
    trim,
    type,
    schema
  } = getConfigSchema(fieldSelector);

  if (type === 'array') {
    const values = [];

    $(el)
      .find(selector.join(', '))
      .each((index, el) => {
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
    return getValueWithSchema($, el, schema);
  }

  let value = $(el).find(selector.join(', ')).first()[method](params);

  value = transformValue({ value, trim, regex, type });

  return value;
}

export default getValue;
