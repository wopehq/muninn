import cheerio = require('cheerio');
import { SelectorSchema } from '../config';
import getConfigSchema from '../utils/getConfigSchema';

function getValue(
  $el: cheerio.Cheerio,
  fieldSelector: SelectorSchema
): Record<string, unknown> {
  const { selector, method, params, schema } = getConfigSchema(fieldSelector);

  if (schema) {
    return Object.keys(schema).reduce((acc, key) => {
      const currentSchema = schema[key];

      acc[key] = getValue($el, currentSchema);

      return acc;
    }, {});
  }

  return $el.find(selector.join(', ')).first()[method](params);
}

export default getValue;
