// We can't define the type of this variable,
// see: https://github.com/ajv-validator/ajv/issues/1521

import Ajv from 'ajv';

const selectorSchema = {
  $id: 'muninn.selectorSchema',
  oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }]
};

const regexConfigSchema = {
  $id: 'muninn.regexConfigSchema',
  type: 'object',
  properties: {
    pattern: {
      type: 'string'
    },
    flags: {
      type: 'string'
    }
  }
};

const fieldSelectorSchema = {
  $id: 'muninn.fieldSelectorSchema',
  type: 'object',
  properties: {
    selector: {
      $ref: 'muninn.selectorSchema'
    },
    regex: {
      $ref: 'muninn.regexConfigSchema'
    },
    html: {
      type: 'string'
    },
    attr: {
      type: 'string'
    },
    type: {
      type: 'string'
    },
    trim: {
      type: 'boolean'
    },
    rootScope: {
      type: 'boolean'
    },
    schema: {
      type: 'object',
      additionalProperties: {
        oneOf: [
          { $ref: 'muninn.fieldSelectorSchema' },
          { $ref: 'muninn.selectorSchema' }
        ]
      }
    }
  },
  required: [],
  dependencies: {
    schema: {
      not: {
        required: ['html', 'attr', 'trim', 'regex']
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
    },
    regex: {
      not: {
        required: ['schema']
      }
    },
    trim: {
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

const configBlockSchema = {
  $id: 'muninn.configBlockSchema.json',
  type: 'object',
  properties: {
    blocksSelector: {
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

const configNormalSchema = {
  $id: 'muninn.configNormalSchema.json',
  type: 'object',
  properties: {
    selector: {
      $ref: 'muninn.selectorSchema'
    },
    schema: {
      type: 'object',
      additionalProperties: {
        $ref: 'muninn.fieldSelectorSchema'
      }
    }
  },
  required: ['schema'],
  additionalProperties: false
};

const configFileSchema = {
  type: 'object',
  additionalProperties: {
    oneOf: [
      { $ref: 'muninn.configBlockSchema.json' },
      { $ref: 'muninn.configNormalSchema.json' }
    ]
  },
  properties: {}
};

const ajv = new Ajv({
  schemas: [
    regexConfigSchema,
    configFileSchema,
    selectorSchema,
    fieldSelectorSchema,
    collectionItemSchema,
    configBlockSchema,
    configNormalSchema
  ]
});

export default ajv.compile(configFileSchema);
