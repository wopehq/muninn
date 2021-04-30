// We can't define the type of this variable,
// see: https://github.com/ajv-validator/ajv/issues/1521

import Ajv from 'ajv';

const selectorSchema = {
  $id: 'muninn.selectorSchema',
  oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }]
};

const fieldSelectorSchema = {
  $id: 'muninn.fieldSelectorSchema',
  type: 'object',
  properties: {
    selector: {
      $ref: 'muninn.selectorSchema'
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

const collectionItemSchema = {
  $id: 'muninn.collectionItemSchema',
  type: 'object',
  properties: {
    schema: {
      type: 'object',
      additionalProperties: {
        oneOf: [
          { $ref: 'muninn.fieldSelectorSchema' },
          { $ref: 'muninn.selectorSchema' }
        ]
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

const configSchema = {
  $id: 'muninn.configSchema.json',
  type: 'object',
  properties: {
    selector: {
      $ref: 'muninn.selectorSchema'
    },
    collection: {
      type: 'object',
      additionalProperties: {
        $ref: 'muninn.collectionItemSchema'
      }
    }
  },
  required: ['collection'],
  additionalProperties: false
};

const configFileSchema = {
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
