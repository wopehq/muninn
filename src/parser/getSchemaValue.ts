import getConfig from '../config/getConfig';
import { Config } from '../config/types';
import getValue from './getValue';
import { ElementPassArg } from './types';

function getSchemaValue(
  { $, el }: ElementPassArg,
  config: Config
): Record<string, unknown> {
  const value = Object.keys(config).reduce((values, key) => {
    const currentRawConfig = getConfig({ $, el }, config[key]);
    values[key] = getValue({ $, el }, currentRawConfig);

    return values;
  }, {});

  return value;
}

export default getSchemaValue;
