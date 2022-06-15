import getConfig from '../config/getConfig';
import { Schema, SchemaGenerator } from '../config/types';
import { getRawConfig } from './getRawConfig';
import getValue from './getValue';
import { ElementPassArg } from './types';

function getSchemaValue<Initial = unknown>(
  { $, el }: ElementPassArg,
  config: Schema<Initial>
): Record<keyof Exclude<typeof config, SchemaGenerator>['schema'], unknown> {
  const value = Object.keys(config).reduce((values, key) => {
    const conf = config[key];
    const rawConf = getRawConfig(conf);

    if (Array.isArray(rawConf)) {
      for (const rconf of rawConf) {
        const currentRawConfig = getConfig({ $, el }, rconf);

        const val = getValue({ $, el }, currentRawConfig);

        if (val !== null && val !== undefined) {
          values[key] = val;
          break;
        }
      }

      if (!Object.prototype.hasOwnProperty.call(values, key)) {
        values[key] = null;
      }

      return values;
    }

    const currentRawConfig = getConfig({ $, el }, rawConf);

    values[key] = getValue({ $, el }, currentRawConfig);

    return values;
  }, {});

  return value;
}

export default getSchemaValue;
