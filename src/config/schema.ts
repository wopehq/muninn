import Ajv from 'ajv';

// We can't define the type of this variable,
// see: https://github.com/ajv-validator/ajv/issues/1521
const selectorSchema /*: JSONSchemaType<SelectorType> */ = {
  $id: 'muninn.selectorSchema.json',
  oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }]
};

const fieldSelectorSchema = {
  $id: 'muninn.fieldSelectorSchema',
  type: 'object',
  properties: {
    selector: {
      $ref: 'muninn.selectorSchema.json'
    },
    html: {
      type: 'string'
    },
    attr: {
      type: 'string'
    },
    schema: {
      type: 'object',
      additionalProperties: {
        $ref: 'muninn.fieldSelectorSchema'
      }
    }
  },
  required: [],
  dependencies: {
    schema: {
      not: {
        required: ['selector', 'html', 'attr']
      }
    },
    selector: {
      not: {
        required: ['schema']
      }
    },
    html: {
      not: {
        required: ['schema']
      }
    },
    attr: {
      not: {
        required: ['schema']
      }
    }
  },
  additionalProperties: false
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
        $ref: 'muninn.fieldSelectorSchema'
      }
    },
    detect: {
      type: 'object',
      properties: {
        withInnerSelector: {
          type: 'string'
        }
      },
      required: ['withInnerSelector'],
      additionalProperties: false
    }
  },
  additionalProperties: false
};

// We can't define the type of this variable,
// see: https://github.com/ajv-validator/ajv/issues/1521
const configSchema /*: JSONSchemaType<ConfigType> */ = {
  $id: 'muninn.configSchema.json',
  type: 'object',
  properties: {
    selector: {
      $ref: 'muninn.selectorSchema.json'
    },
    collection: {
      type: 'object',
      additionalProperties: {
        $ref: 'muninn.collectionItemSchema.json'
      }
    }
  },
  required: ['collection'],
  additionalProperties: false
};

// We can't define the type of this variable,
// see: https://github.com/ajv-validator/ajv/issues/1521
const configFileSchema /*: JSONSchemaType<ConfigFileType> */ = {
  type: 'object',
  additionalProperties: { $ref: 'muninn.configSchema.json' },
  properties: {}
};

const ajv = new Ajv({
  schemas: [
    configFileSchema,
    selectorSchema,
    fieldSelectorSchema,
    collectionItemSchema,
    configSchema
  ]
});

export default ajv.compile(configFileSchema);
