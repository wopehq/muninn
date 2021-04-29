import Ajv /* , { JSONSchemaType } */ from 'ajv';
// import { JTDSchemaType } from 'ajv/dist/jtd';
// import { CollectionItemType, ConfigType, ConfigFileType, SelectorType } from './config';

// We can't define the type of this variable,
// see: https://github.com/ajv-validator/ajv/issues/1521
const selectorSchema /*: JSONSchemaType<SelectorType> */ = {
  $id: 'muninn.selectorSchema.json',
  oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
};

// We can't define the type of this variable,
// see: https://github.com/ajv-validator/ajv/issues/1521
const collectionItemSchema /*: JSONSchemaType<CollectionItemType> */ = {
  $id: 'muninn.collectionItemSchema.json',
  type: 'object',
  properties: {
    schema: {
      type: 'object',
      additionalProperties: {
        type: 'object',
        properties: {
          selector: {
            $ref: 'muninn.selectorSchema.json',
          },
          html: {
            type: 'string',
          },
          attr: {
            type: 'string',
          },
        },
        required: ['selector'],
        additionalProperties: false,
      },
    },
    detect: {
      type: 'object',
      properties: {
        withInnerSelector: {
          type: 'string',
        },
      },
      required: ['withInnerSelector'],
      additionalProperties: false,
    },
  },
  additionalProperties: false,
};

// We can't define the type of this variable,
// see: https://github.com/ajv-validator/ajv/issues/1521
const configSchema /*: JSONSchemaType<ConfigType> */ = {
  $id: 'muninn.configSchema.json',
  type: 'object',
  properties: {
    selector: {
      $ref: 'muninn.selectorSchema.json',
    },
    collection: {
      type: 'object',
      additionalProperties: {
        $ref: 'muninn.collectionItemSchema.json',
      },
    },
  },
  required: ['collection'],
  additionalProperties: false,
};

// We can't define the type of this variable,
// see: https://github.com/ajv-validator/ajv/issues/1521
const configFileSchema /*: JSONSchemaType<ConfigFileType> */ = {
  type: 'object',
  properties: {
    additionalProperties: { $ref: 'muninn.configSchema.json' },
  },
};

const ajv = new Ajv({
  schemas: [
    configFileSchema,
    selectorSchema,
    collectionItemSchema,
    configSchema,
  ],
});

export default ajv.compile(configFileSchema);
