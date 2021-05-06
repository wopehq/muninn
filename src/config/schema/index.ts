// We can't define the type of this variable,
// see: https://github.com/ajv-validator/ajv/issues/1521

import Ajv from 'ajv';
import regexConfigSchema from './regexConfigSchema';
import configFileSchema from './configFileSchema';
import selectorSchema from './selectorSchema';
import fieldSelectorSchema from './fieldSelectorSchema';
import collectionItemSchema from './collectionItemSchema';
import configBlockSchema from './configBlockSchema';
import configDefaultSchema from './configDefaultSchema';

const ajv = new Ajv({
  schemas: [
    regexConfigSchema,
    configFileSchema,
    selectorSchema,
    fieldSelectorSchema,
    collectionItemSchema,
    configBlockSchema,
    configDefaultSchema
  ]
});

export default ajv.compile(configFileSchema);
