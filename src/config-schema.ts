import Ajv, { JSONSchemaType } from 'ajv';
import { JTDSchemaType } from 'ajv/dist/jtd';
import { CollectionItem, ConfigType } from './config';

// We can't define the type of this variable,
// see: https://github.com/ajv-validator/ajv/issues/1521
const collectionItemSchema /*: JSONSchemaType<CollectionItem>*/ = {
  $id: 'muninn.collectionItemSchema.json',
  type: 'object',
  properties: {
    schema: {
      type: 'object',
      additionalProperties: {
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
          }
        },
        required: ['selector'],
        additionalProperties: false
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
    collectionItemSchema,
    configSchema
  ]
})

export const validateConfig = ajv.compile(configSchema)
