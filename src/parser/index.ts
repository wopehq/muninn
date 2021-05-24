import * as cheerio from 'cheerio';
import { SchemaConfig, ConfigItem } from '../config';
import getValueWithSchema from './getValueWithSchema';

type ResultObject = { [key: string]: any };

function collect(
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

export function parse(
  config: ConfigItem,
  data: string | Buffer
): Record<string, unknown> {
  const results = {};

  Object.keys(config).forEach((key) => {
    results[key] = collect(config[key], data);
  });

  return results;
}
