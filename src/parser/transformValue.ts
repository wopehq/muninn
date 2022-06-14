import { RawConfig } from '../config/types';
import Methods from './methods';
import execRegex from './regex/execRegex';
import { Value } from './value';

function transformValue<Initial = unknown>(
  value: Value<Initial>,
  config: RawConfig<Initial>
) {
  const { trim, regex, type, methods = [], transform } = config;

  if (typeof value === 'string' && trim !== false) {
    value = value.trim();

    if (regex) {
      value = execRegex(value, regex);
    }
  }

  if (type) {
    methods.push(type);
  }

  methods.forEach((name) => {
    if (Methods[name]) {
      value = Methods[name](value);
    }
  });

  if (typeof transform === 'function') {
    value = transform(value);
  }

  return value;
}

export default transformValue;
