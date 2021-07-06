import { Config } from '../config/types';
import Methods from './methods';
import execRegex from './regex/execRegex';

function transformValue(value: any, config: Config) {
  const { trim, regex, type, custom } = config;
  let { methods } = config;

  if (typeof value === 'string' && trim !== false) {
    value = value.trim();
  }

  if (regex) {
    value = execRegex(value, regex);
  }

  if (Array.isArray(methods)) {
    methods.push(type);
  } else {
    methods = [type];
  }

  if (methods?.length > 0) {
    methods.forEach((name) => {
      if (Methods[name]) {
        value = Methods[name](value);
      }
    });
  }

  if (typeof custom === 'function') {
    value = custom(value);
  }

  return value;
}

export default transformValue;
