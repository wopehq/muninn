import { type ElementPassArg } from './types';
import { type RawConfig } from '../config/types';

import getElement from './getElement';
import getSimpleValue from './getSimpleValue';
import getSchemaValue from './getSchemaValue';
import getArrayValue from './getArrayValue';

function getValue<Initial = unknown>(
  { $, el }: ElementPassArg,
  config: RawConfig<Initial> | RawConfig<Initial>[]
) {
  if (!config) return null;

  if (Array.isArray(config)) {
    for (const conf of config) {
      const value = getValue({ $, el }, conf);

      if (value !== null) {
        return value;
      }
    }

    return null;
  }

  const element = getElement({ $, el }, config);
  const { type, condition, exist, fill, ...rest } = config;
  const { schema } = rest;
  const elemExists = element.length > 0;

  if (exist) return elemExists;

  if (condition && !condition($(el))) {
    return rest.initial ?? null;
  }

  if (typeof fill !== 'undefined') {
    if (typeof fill === 'function') {
      return fill();
    }

    return fill;
  }

  const isIgnoreExistenceChecks = config.ignoreExistenceChecks === true;

  if (!elemExists && !isIgnoreExistenceChecks) {
    return rest.initial ?? null;
  }

  if (type === 'array') {
    if (config.methods?.includes('length')) {
      return $(element).length;
    }

    const arrayValue = getArrayValue({ $, el: element }, rest);

    if (config.arrayTransform) {
      return config.arrayTransform(arrayValue, element);
    }

    return arrayValue;
  } else if (schema) {
    let currentSchema = schema;

    if (typeof currentSchema === 'function') {
      currentSchema = currentSchema($ && el ? $(el) : null, $);
    }

    return getSchemaValue({ $, el: element }, currentSchema);
  } else {
    return getSimpleValue({ $, el: element }, rest);
  }
}

export default getValue;
