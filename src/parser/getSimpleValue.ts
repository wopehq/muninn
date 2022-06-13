import { RawConfig } from '../config/types';
import parseSelector from '../config/parseSelector';
import transformValue from './transformValue';
import { ElementPassArg } from './types';
import { Value } from './value';

function getSimpleValue<Initial = unknown>(
  { $, el }: ElementPassArg,
  config: RawConfig<Initial>
): Value<Initial> {
  if (typeof config === 'string') {
    config = parseSelector(config);
  }

  const { html, attr, initial } = config;

  const element = $(el);
  let value: string | Initial;

  if (html) {
    value = element.html();
  } else if (attr) {
    value = element.attr(attr);
  } else {
    value = element.text();
  }

  if (initial && !value) {
    value = initial;
  }

  if (
    value === null ||
    value === undefined ||
    (value === '' && !(typeof initial === 'string' && initial === ''))
  ) {
    return null;
  }

  return transformValue<Initial>(value, config);
}

export default getSimpleValue;
