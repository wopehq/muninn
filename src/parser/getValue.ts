import { ElementPassArg } from './types';
import { Config } from '../config/types';

import getConfig from '../config/getConfig';
import getElement from './getElement';
import getSimpleValue from './getSimpleValue';
import getSchemaValue from './getSchemaValue';
import getArrayValue from './getArrayValue';
import { getRawConfig } from './getRawConfig';

function getValue<Initial = unknown>(
  { $, el }: ElementPassArg,
  conf: Config<Initial>
) {
  const rawConf = getRawConfig(conf);

  if (Array.isArray(rawConf)) {
    for (const conf of rawConf) {
      const val = getValue({ $, el }, conf);

      if (val !== null && val !== undefined) {
        return val;
      }
    }

    return null;
  }

  const config = getConfig({ $, el }, rawConf);

  if (Array.isArray(config)) {
    for (const conf of config) {
      const val = getValue({ $, el }, conf);

      if (val !== null && val !== undefined) {
        return val;
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
    if (config?.methods?.includes('size')) {
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
