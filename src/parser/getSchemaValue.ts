import { ElementPassArg } from './types';

import getConfig from '../config/getConfig';
import getValue from './getValue';

function getSchemaValue({ $, el }: ElementPassArg, config) {
  const value = Object.keys(config).reduce((values, key) => {
    const currentRawConfig = getConfig({ $, el }, config[key]);
    values[key] = getValue({ $, el }, currentRawConfig);

    return values;
  }, {});

  return value;
}

export default getSchemaValue;
