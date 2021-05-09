import * as cheerio from 'cheerio';
import { Config, ConfigItem } from '../config';
import getBlocks from './getBlocks';
import getValue from './getValue';

type ResultObject = { [key: string]: any };

let untypeds = [];

function collect(
  config: ConfigItem,
  data: string | Buffer
): Record<string, unknown>[] | ResultObject {
  const { collection, blocksSelector, selector, schema } = config;
  const $ = cheerio.load(data);

  if (blocksSelector) {
    const [results, _untypeds] = getBlocks($, blocksSelector, collection);
    untypeds = _untypeds;

    return results;
  } else if (selector && schema) {
    const result = {};
    const el = $(selector);

    Object.keys(schema).forEach((key) => {
      result[key] = getValue($, el, schema[key]);
    });

    return result;
  }

  return null;
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
