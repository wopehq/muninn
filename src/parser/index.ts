import * as cheerio from 'cheerio';
import { SchemaConfig, ConfigItem } from '../config';
import getValueWithSchema from './getValueWithSchema';

type ResultObject = { [key: string]: any };

export function parse(
  config: ConfigItem,
  data: string | Buffer
): Record<string, unknown>[] | ResultObject {
  const { selector, schema } = config;
  const $ = cheerio.load(data);

  if (selector && schema) {
    const el = $(selector);

    if (config.type === 'array') {
      const values = [];

      el.each((index, cel) => {
        let currentSchema: SchemaConfig;
        if (typeof schema === 'function') {
          currentSchema = schema($(cel));
        } else {
          currentSchema = schema;
        }
        values.push(getValueWithSchema($, cel, currentSchema));
      });

      return values;
    }

    return getValueWithSchema($, el, schema);
  }

  return null;
}
