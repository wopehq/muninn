import { Config } from './types';
import validateConfigSchema from './schema'

export * from './types'
export * from './schema'

export function validateConfig(config: Config): Object[] {
  validateConfigSchema(config);

  return validateConfigSchema.errors;
}
