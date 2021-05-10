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
        },
        hasClassName: {
          type: 'string'
        }
      },
      additionalProperties: false
    }
  },
  additionalProperties: false
};

export default collectionItemSchema;
