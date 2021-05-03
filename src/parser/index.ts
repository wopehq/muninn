import * as cheerio from 'cheerio';
import { Config, ConfigItem } from '../config';
import { TypeOrder } from './types';
import getValue from '../utils/getValue';

const untypeds = [];

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
    const keys = Object.keys(collection);

    keys.forEach((key) => {
      const currentType = collection[key];
      const { schema, detect } = currentType;
      const typeCheck = $(el).find(detect.withInnerSelector).length > 0;

      if (!typeCheck) {
        if (keys.length - 1 === index) {
          typeOrders.untyped = (typeOrders.untyped || 0) + 1;

          untypeds.push({
            order: index,
            typeOrder: typeOrders.untyped,
            type: 'untyped',
            html: $(el).html()
          });
        }
        return;
      }

      const result = Object.keys(schema).reduce((acc, key) => {
        const fieldSelector = schema[key];
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
  const results = {
    __untyped: untypeds
  };

  Object.keys(config).forEach((key) => {
    results[key] = collect(config[key], data);
  });

  return results;
}
