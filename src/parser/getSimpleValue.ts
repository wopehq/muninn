import { type RawConfig } from '../config/types';
import { type ElementPassArg } from './types';
import { type Value } from './value';
import parseSelector from '../config/parseSelector';
import transformValue from './transformValue';
import extractValue from './extractValue';

function getSimpleValue<Initial = unknown>(
  { $, el }: ElementPassArg,
  config: RawConfig<Initial>
): Value<Initial> {
  if (typeof config === 'string') {
    config = parseSelector(config);
  }

  const { initial } = config;
  const element = $(el);

  let value: string | Record<string, string> | Initial = extractValue(
    { $, el },
    config
  );

  if (initial && !value) {
    value = initial;
  }

  const isEmptyStringInitial = typeof initial === 'string' && initial === '';

  if (
    value === null ||
    value === undefined ||
    (value === '' && !isEmptyStringInitial)
  ) {
    return null;
  }

  return transformValue<Initial>(value, config, element);
}

export default getSimpleValue;
