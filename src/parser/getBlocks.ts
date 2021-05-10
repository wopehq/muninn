import * as cheerio from 'cheerio';
import { TypeOrder } from './types';
import { Selector } from '../config';
import getValue from './getValue';

function getBlocks($: cheerio.Root, blocksSelector: Selector, collection) {
  const blocks = $(blocksSelector);
  const results: Record<string, unknown>[] = [];
  const untypeds: Record<string, unknown>[] = [];
  const typeOrders: TypeOrder = {};

  blocks.each((index, el) => {
    const keys = Object.keys(collection);

    keys.forEach((key) => {
      const currentType = collection[key];
      const { schema, detect } = currentType;

      if (detect) {
        let typeCheck;

        if (detect?.withInnerSelector) {
          typeCheck = $(el).find(detect?.withInnerSelector).length > 0;
        } else if (detect?.hasClassName) {
          typeCheck = $(el).hasClass(detect?.hasClassName);
        }

        if (!typeCheck) {
          if (keys.length - 1 === index) {
            typeOrders.untyped = (typeOrders.untyped || 0) + 1;

            untypeds.push({
              order: index + 1,
              typeOrder: typeOrders.untyped,
              type: 'untyped',
              html: $(el).html()
            });
          }
          return;
        }
      }

      const result = Object.keys(schema).reduce((acc, key) => {
        const selectorConfig = schema[key];
        const value = getValue($, el, selectorConfig);
        acc[key] = value;

        return acc;
      }, {});

      typeOrders[key] = (typeOrders[key] || 0) + 1;

      results.push({
        order: index + 1,
        typeOrder: typeOrders[key],
        type: key,
        ...result
      });
    });
  });

  return [results, untypeds];
}

export default getBlocks;
