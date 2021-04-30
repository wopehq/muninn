import * as cheerio from 'cheerio';
import { Config, ConfigItem } from '../config';
import { TypeOrder } from './types';
import getValue from '../utils/getValue';

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
        const value = getValue($(el), fieldSelector);
        acc[key] = value;

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
