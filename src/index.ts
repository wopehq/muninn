import * as cheerio from 'cheerio';
import { CollectionItemSchema, ConfigItem, Config } from './config';
import validateConfigSchema from './config-schema';

type TypeOrder = { [key: string]: number };

export { Config } from './config'

export function validateConfig(config: Config): Object[] {
  validateConfigSchema(config);

  return validateConfigSchema.errors;
}

function extractFieldValue($parent, fieldSelector: CollectionItemSchema) {
    const { selector, attr, html, schema } = fieldSelector
    const $selector = Array.isArray(selector) ? selector : [selector];
    const method = html ? 'html' : attr ? 'attr' : 'text';
    const params = attr;

    if (schema) {
        return extractFieldValues($parent, schema)
    }

    return $parent.find($selector.join(', ')).first()[method](params);
}

function extractFieldValues($parent, fieldSelectors: { [key: string]: CollectionItemSchema }) {
    return Object.keys(fieldSelectors).reduce((acc, key) => {
        const fieldSelector = fieldSelectors[key]

        acc[key] = extractFieldValue($parent, fieldSelector)

        return acc
    }, {})
}

export function parse(config: Config, data: string | Buffer): Object {
  const results = {};

  Object.keys(config).forEach((key) => {
    results[key] = collect(config[key], data);
  });

  return results;
}

export function collect(config: ConfigItem, data: string | Buffer): Object[] {
  const { collection, selector } = config;
  const $ = cheerio.load(data);
  const blocks = $(selector);
  const results: Object[] = [];
  const typeOrders: TypeOrder = {};

  blocks.each((index, el) => {
    Object.keys(collection).forEach((key) => {
      const currentType = collection[key];
      const typeCheck = $(el).find(currentType.detect.withInnerSelector).length > 0;

      if (!typeCheck) return;

      const result = extractFieldValues($(el), currentType.schema);

      typeOrders[key] = (typeOrders[key] || 0) + 1;

      results.push({
        order: index,
        typeOrder: typeOrders[key],
        type: key,
        ...result,
      })
    });
  });

  return results;
}
