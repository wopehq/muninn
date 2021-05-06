const configBlockSchema = {
  $id: 'muninn.configBlockSchema',
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

export default configBlockSchema;
