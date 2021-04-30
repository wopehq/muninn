import * as cheerio from 'cheerio';
import { SelectorSchema, Config, ConfigItem } from '../config';
import { TypeOrder } from './types';
import getConfigSchema from '../utils/getConfigSchema';

function extractFieldValue($el, fieldSelector: SelectorSchema) {
  const { selector, method, params, schema } = getConfigSchema(fieldSelector);

  if (schema) {
    return Object.keys(schema).reduce((acc, key) => {
      const currentSchema = schema[key];

      acc[key] = extractFieldValue($el, currentSchema);

      return acc;
    }, {});
  }

  return $el.find(selector.join(', ')).first()[method](params);
}

function collect(
  config: ConfigItem,
  data: string | Buffer
): Record<string, unknown>[] {
  const { collection, selector } = config;
  const $ = cheerio.load(data);
  const blocks = $(selector);
  const results: Record<string, unknown>[] = [];
  const typeOrders: TypeOrder = {};

  blocks.each((index, el) => {
    Object.keys(collection).forEach((key) => {
      const currentType = collection[key];
      const typeCheck =
        $(el).find(currentType.detect.withInnerSelector).length > 0;

      if (!typeCheck) return;

      const result = Object.keys(currentType.schema).reduce((acc, key) => {
        const fieldSelector = currentType.schema[key];

        acc[key] = extractFieldValue($(el), fieldSelector);

        return acc;
      }, {});

      typeOrders[key] = (typeOrders[key] || 0) + 1;

      results.push({
        order: index,
        typeOrder: typeOrders[key],
        type: key,
        ...result
      });
    });
  });

  return results;
}

export function parse(
  config: Config,
  data: string | Buffer
): Record<string, unknown> {
  const results = {};

  Object.keys(config).forEach((key) => {
    results[key] = collect(config[key], data);
  });

  return results;
}
