import cheerio = require('cheerio');
import { RegexConfig, SelectorSchema } from '../config';
import getConfigSchema from '../utils/getConfigSchema';
import transformValueType from '../utils/transformValueType';
import execRegex from '../utils/execRegex';

type TransformValueArgs = {
  value?: any;
  trim?: boolean;
  type?: string;
  regex: RegexConfig;
};

function transformValue({ value, trim, regex, type }: TransformValueArgs): any {
  if (typeof value === 'string' && trim !== false) {
    value = value.trim();
  }

  if (regex) {
    value = execRegex(value, regex);
  }

  value = transformValueType(value, type);

  return value;
}

function getValue($el: cheerio.Cheerio, fieldSelector: SelectorSchema): any {
  const {
    selector,
    method,
    params,
    regex,
    trim,
    type,
    schema
  } = getConfigSchema(fieldSelector);

  if (schema) {
    return Object.keys(schema).reduce((acc, key) => {
      const currentSchema = schema[key];
      let value = getValue($el, currentSchema);

      value = transformValue({ value, trim, regex, type });

      acc[key] = value;

      return acc;
    }, {});
  }

  let value = $el.find(selector.join(', ')).first()[method](params);

  value = transformValue({ value, trim, regex, type });

  return value;
}

export default getValue;
