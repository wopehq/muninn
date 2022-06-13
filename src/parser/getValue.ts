import { ElementPassArg } from './types';
import { InputConfig } from '../config/types';

import getConfig from '../config/getConfig';
import getElement from './getElement';
import getSimpleValue from './getSimpleValue';
import getSchemaValue from './getSchemaValue';
import getArrayValue from './getArrayValue';

function getValue({ $, el }: ElementPassArg, inputConfig: InputConfig) {
  const config = getConfig({ $, el }, inputConfig);
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
    const currentSchema = getConfig({ $, el }, schema);

    if (!elemExists) {
      if (!(config.ignoreExistenceChecks === true)) {
        return rest.initial ?? null;
      }
    }

    return getSchemaValue({ $, el: element }, currentSchema);
  } else {
    return getSimpleValue({ $, el: element }, rest);
  }
}

export default getValue;
