import { load, CheerioAPI, CheerioOptions } from 'cheerio';
import { Config } from '../config/types';
import { getRawConfig } from './getRawConfig';
import getValue from './getValue';

/**
 * Create a JSON output using the provided schema and markup.
 *
 * Note that similar to web browser contexts, this operation may introduce
 * `<html>`, `<head>`, and `<body>` elements; set `isDocument` to `false` to
 * switch to fragment mode and disable this.
 *
 * @param content - Markup to be loaded or a cheerio instance.
 * @param config - Your parse config including your schema
 * @param options - Cheerio options for the created instance.
 * @param isDocument - Allows cheerio parser to be switched to fragment mode.
 * @returns Your JSON output parsed according to your schema.
 * @see {@link https://wopehq.gitbook.io/muninn} for additional usage information.
 */
function parse<Initial = unknown>(
  data: string | CheerioAPI,
  config: Config<Initial>,
  options?: CheerioOptions,
  isDocument?: boolean
): Record<string, unknown> {
  let $;

  if (typeof data === 'string') {
    $ = load(data, options, isDocument);
  } else if (typeof data === 'function') {
    $ = data;
  }

  const rawConfig = getRawConfig(config);

  if (Array.isArray(rawConfig)) {
    for (const conf of rawConfig) {
      const value = getValue({ $, el: $ }, conf);

      if (value !== null) return value;
    }

    return null;
  }

  return getValue({ $ }, rawConfig);
}

export default parse;
