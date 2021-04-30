import cheerio = require('cheerio');
import { SelectorSchema } from '../config';
import getConfigSchema from '../utils/getConfigSchema';
import transformValueType from '../utils/transformValueType';

type TransformValueArgs = { value?: any; trim?: boolean; type?: string };

function transformValue({ value, trim, type }: TransformValueArgs): any {
  if (typeof value === 'string' && trim !== false) {
    value = value.trim();
  }

  value = transformValueType(value, type);

  return value;
}

function getValue($el: cheerio.Cheerio, fieldSelector: SelectorSchema): any {
  const { selector, method, params, trim, type, schema } = getConfigSchema(
    fieldSelector
  );

  if (schema) {
    return Object.keys(schema).reduce((acc, key) => {
      const currentSchema = schema[key];
      let value = getValue($el, currentSchema);

      value = transformValue({ value, trim, type });

      acc[key] = value;

      return acc;
    }, {});
  }

  let value = $el.find(selector.join(', ')).first()[method](params);

  value = transformValue({ value, trim, type });

  return value;
}

export default getValue;
