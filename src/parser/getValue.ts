import { ElementPassArg } from './types';
import { RawConfig } from '../config/types';

import getElement from './getElement';
import getSimpleValue from './getSimpleValue';
import getSchemaValue from './getSchemaValue';
import getArrayValue from './getArrayValue';

function getValue<Initial = unknown>(
  { $, el }: ElementPassArg,
  config: RawConfig<Initial> | RawConfig<Initial>[]
) {
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
  const { type, condition, exist, ...rest } = config;
  const { schema } = rest;
  const elemExists = element.length > 0;

  if (exist) {
    return elemExists;
  }

  if (condition && !condition($(el))) {
    return rest.initial ?? null;
  }

  if (type === 'array') {
    if (config.methods?.includes('size')) {
      return $(element).length;
    }

    return getArrayValue({ $, el: element }, rest);
  } else if (schema) {
    if (!elemExists) {
      if (!(config.ignoreExistenceChecks === true)) {
        return rest.initial ?? null;
      }
    }

    let schm = schema;

    if (typeof schm === 'function') {
      schm = schm($ && el ? $(el) : null);
    }

    return getSchemaValue({ $, el: element }, schm);
  } else {
    return getSimpleValue({ $, el: element }, rest);
  }
}

export default getValue;
