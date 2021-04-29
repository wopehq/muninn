import * as cheerio from 'cheerio';
import { ConfigType, ConfigFileType } from './config';
import validateConfigSchema from './config-schema';

type TypeOrder = { [key: string]: number };

export function validateConfig(config: ConfigType): Object[] {
  validateConfigSchema(config);

  return validateConfigSchema.errors;
}

export function parse(config: ConfigFileType, data: string | Buffer): Object {
  const results = {};

  Object.keys(config).forEach((key) => {
    results[key] = collect(config[key], data);
  });

  return results;
}

export function collect(config: ConfigType, data: string | Buffer): Object[] {
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

      const { schema } = currentType;
      const result = {};

      typeOrders[key] = (typeOrders[key] || 0) + 1;

      Object.keys(schema).forEach((field) => {
        const { selector, html, attr } = schema[field];
        const $selector = Array.isArray(selector) ? selector : [selector];
        const method = html ? 'html' : attr ? 'attr' : 'text';
        const params = attr;

        result[field] = $(el).find($selector.join(', ')).first()[method](params);
      });

      results.push({
        order: index,
        typeOrder: typeOrders[key],
        type: key,
        ...result,
      });
    });
  });

  return results;
}
