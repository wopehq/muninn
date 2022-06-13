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
      for (const conf of rawConf) {
        let schema = conf.schema;

        if (typeof schema === 'function') {
          schema = schema($ && el ? $(el) : null);
        }

        const val = getSchemaValue<Initial>({ $, el }, schema);

        if (val !== null && val !== undefined) {
          values[key] = val;
          break;
        }
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
