import { ElementPassArg } from './types';

import getConfig from '../config/getConfig';
import getElement from './getElement';
import getSimpleValue from './getSimpleValue';
import getSchemaValue from './getSchemaValue';
import getArrayValue from './getArrayValue';

function getValue({ $, el }: ElementPassArg, rawConfig) {
  const config = getConfig({ $, el }, rawConfig);
  const element = getElement({ $, el }, config);
  const { type, selector, condition, ...rest } = config;
  const { schema } = rest;

  if (condition && !condition($(el))) {
    return null;
  }

  if (type === 'array') {
    return getArrayValue({ $, el: element }, rest);
  } else if (schema) {
    const currentSchema = getConfig({ $, el }, schema);
    return getSchemaValue({ $, el: element }, currentSchema);
  } else {
    return getSimpleValue({ $, el: element }, rest);
  }
}

export default getValue;
