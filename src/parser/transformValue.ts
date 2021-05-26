import Methods from './methods';

function transformValue(value, config) {
  const { trim, regex, type, custom } = config;
  let { methods } = config;

  if (typeof value === 'string' && trim !== false) {
    value = value.trim();
  }

  // TODO - Regex
  // -

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
