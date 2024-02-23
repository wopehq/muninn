import { type RawConfig } from '../config/types';
import { type ElementPassArg } from './types';

function extractValue<Initial>(
  { $, el }: ElementPassArg,
  config: RawConfig<Initial>
) {
  const element = $(el);

  const { html, attr } = config;

  if (html) return element.html();

  if (Array.isArray(attr)) {
    return attr.reduce((acc, arg) => {
      acc[arg] = element.attr(arg);
      return acc;
    }, {});
  }

  if (attr === '$all') return element.attr();
  if (attr) return element.attr(attr);

  return element.text();
}

export default extractValue;
