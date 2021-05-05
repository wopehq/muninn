import cheerio = require('cheerio');
import { RegexConfig, SelectorSchema } from '../config';
import getConfigSchema from '../utils/getConfigSchema';
import transformValueType from '../utils/transformValueType';
import execRegex from '../utils/execRegex';
import getValueWithSchema from './getValueWithSchema';

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
