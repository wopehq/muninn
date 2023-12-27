import getConfig from '../config/getConfig';
import { Schema, SchemaGenerator } from '../config/types';
import { getRawConfig } from './getRawConfig';
import getValue from './getValue';
import { ElementPassArg } from './types';

function getSchemaValue<Initial = unknown>(
  { $, el }: ElementPassArg,
  config: Schema<Initial>
): Record<keyof Exclude<typeof config, SchemaGenerator>['schema'], unknown> {
  return Object.keys(config).reduce((values, key) => {
    const conf = config[key];
    const rawConfig = getRawConfig(conf);

    if (Array.isArray(rawConfig)) {
      for (const rconf of rawConfig) {
        const currentRawConfig = getConfig({ $, el }, rconf);

        const value = getValue({ $, el }, currentRawConfig);

        if (value !== null && value !== undefined) {
          values[key] = value;
          break;
        }
      }

      if (!Object.prototype.hasOwnProperty.call(values, key)) {
        values[key] = null;
      }

      return values;
    }

    const currentRawConfig = getConfig({ $, el }, rawConfig);

    values[key] = getValue({ $, el }, currentRawConfig);

    return values;
  }, {});
}

export default getSchemaValue;
