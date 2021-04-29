import Ajv from 'ajv';

const fieldSelectorSchema = {
  $id: 'muninn.fieldSelectorSchema',
  type: 'object',
  properties: {
    selector: {
      type: 'string'
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
        $ref: 'muninn.fieldSelectorSchema',
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
}

// We can't define the type of this variable,
// see: https://github.com/ajv-validator/ajv/issues/1521
const collectionItemSchema /*: JSONSchemaType<CollectionItem>*/ = {
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
}

// We can't define the type of this variable,
// see: https://github.com/ajv-validator/ajv/issues/1521
const configSchema /*: JSONSchemaType<ConfigType>*/ = {
  type: 'object',
  properties: {
    selector: {
      type: 'string'
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
}

const ajv = new Ajv({
  schemas: [
    fieldSelectorSchema,
    collectionItemSchema,
    configSchema
  ]
})

export const validateConfig = ajv.compile(configSchema)
