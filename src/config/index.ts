import { ErrorObject } from 'ajv';
import { SchemaConfig } from './types';
import validateConfigSchema from './schema';

export * from './types';
export * from './schema';

export function validateConfig(config: SchemaConfig): ErrorObject[] {
  validateConfigSchema(config);

  return validateConfigSchema.errors;
}
