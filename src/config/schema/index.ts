// We can't define the type of this variable,
// see: https://github.com/ajv-validator/ajv/issues/1521

import Ajv from 'ajv';
import regexConfigSchema from './regexSchema';
import selectorSchema from './selectorSchema';
import rawConfigSchema from './rawConfigSchema';

const CLASSES = { Function: Function };
const ajv = new Ajv();

// ajv.addKeyword({
//   keyword: 'function',
//   validate: function (data) {
//     return typeof data === 'function';
//   }
// });

ajv.addKeyword({
  keyword: 'instanceof',
  compile: (schema) => (data) => data instanceof CLASSES[schema]
});

ajv.addSchema([regexConfigSchema, rawConfigSchema, selectorSchema]);

export default ajv.compile(rawConfigSchema);
