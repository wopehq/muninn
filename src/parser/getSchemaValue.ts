import { ElementPassArg } from './types';

import getConfig from '../config/getConfig';
import getValue from './getValue';
import { Config } from '../config/types';

function getSchemaValue({ $, el }: ElementPassArg, config: Config): Object {
  const value = Object.keys(config).reduce((values, key) => {
    const currentRawConfig = getConfig({ $, el }, config[key]);
    values[key] = getValue({ $, el }, currentRawConfig);

    return values;
  }, {});

  return value;
}

export default getSchemaValue;
