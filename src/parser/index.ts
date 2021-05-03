import * as cheerio from 'cheerio';
import { Config, ConfigItem } from '../config';
import getBlocks from './getBlocks';

let untypeds = [];

function collect(
  config: ConfigItem,
  data: string | Buffer
): Record<string, unknown>[] {
  const { collection, blocksSelector } = config;
  const $ = cheerio.load(data);

  if (blocksSelector) {
    const [results, _untypeds] = getBlocks($, blocksSelector, collection);
    untypeds = _untypeds;

    return results;
  }

  return [];
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
