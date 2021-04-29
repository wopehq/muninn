import * as cheerio from 'cheerio';
import { CollectionItemSchema, Config, ConfigItem } from "../config";

function extractFieldValue($el, fieldSelector: CollectionItemSchema) {
  const { selector, attr, html, schema } = fieldSelector;
  const $selector = Array.isArray(selector) ? selector : [selector];
  const method = html ? 'html' : attr ? 'attr' : 'text';
  const params = attr;

  if (schema) {
    return extractFieldValues($el, schema);
  }

  return $el.find($selector.join(', ')).first()[method](params);
}

function extractFieldValues(
  $el,
  fieldSelectors: { [key: string]: CollectionItemSchema }
) {
  return Object.keys(fieldSelectors).reduce((acc, key) => {
    const fieldSelector = fieldSelectors[key];

    acc[key] = extractFieldValue($el, fieldSelector);

    return acc;
  }, {});
}

function collect(config: ConfigItem, data: string | Buffer): Object[] {
  const { collection, selector } = config;
  const $ = cheerio.load(data);
  const blocks = $(selector);
  const results: Object[] = [];
  const typeOrders: Parser.TypeOrder = {};

  blocks.each((index, el) => {
    Object.keys(collection).forEach((key) => {
      const currentType = collection[key];
      const typeCheck =
        $(el).find(currentType.detect.withInnerSelector).length > 0;

      if (!typeCheck) return;

      const result = extractFieldValues($(el), currentType.schema);

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

export function parse(config: Config, data: string | Buffer): Object {
  const results = {};

  Object.keys(config).forEach((key) => {
    results[key] = collect(config[key], data);
  });

  return results;
}
