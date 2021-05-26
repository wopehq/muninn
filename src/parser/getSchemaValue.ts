import { Root, Cheerio } from 'cheerio';

import getConfig from '../config/getConfig';
import getValue from './getValue';

type ValueArgs = {
  $: Root;
  el?: Cheerio | string;
};

function getSchemaValue({ $, el }: ValueArgs, config) {
  const value = Object.keys(config).reduce((values, key) => {
    const currentRawConfig = getConfig({ $, el }, config[key]);
    values[key] = getValue({ $, el }, currentRawConfig);

    return values;
  }, {});

  return value;
}

export default getSchemaValue;
