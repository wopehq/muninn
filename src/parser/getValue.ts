import { Root, Cheerio } from 'cheerio';

import getConfig from '../config/getConfig';
import getElement from './getElement';
import getSimpleValue from './getSimpleValue';
import getSchemaValue from './getSchemaValue';
import getArrayValue from './getArrayValue';

type ValueArgs = {
  $: Root;
  el?: Cheerio | string;
};

function getValue({ $, el }: ValueArgs, rawConfig) {
  const config = getConfig({ $, el }, rawConfig);
  const element = getElement({ $, el }, config);
  const { type, selector, ...rest } = config;
  const { schema } = rest;

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
