import cheerio = require('cheerio');
import { SelectorSchema } from '../config';
import getConfigSchema from '../utils/getConfigSchema';

function getValue($el: cheerio.Cheerio, fieldSelector: SelectorSchema): any {
  const { selector, method, params, trim, schema } = getConfigSchema(
    fieldSelector
  );

  if (schema) {
    return Object.keys(schema).reduce((acc, key) => {
      const currentSchema = schema[key];
      let value = getValue($el, currentSchema);

      if (typeof value === 'string' && trim !== false) {
        value = value.trim();
      }

      acc[key] = value;

      return acc;
    }, {});
  }

  let value = $el.find(selector.join(', ')).first()[method](params);

  if (typeof value === 'string' && trim !== false) {
    value = value.trim();
  }

  return value;
}

export default getValue;
