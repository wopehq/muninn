const configDefaultSchema = {
  $id: 'muninn.configDefaultSchema',
  type: 'object',
  properties: {
    selector: {
      $ref: 'muninn.selectorSchema'
    },
    type: {
      type: 'string'
    },
    schema: {
      oneOf: [
        { instanceof: 'Function' },
        {
          type: 'object',
          additionalProperties: {
            $ref: 'muninn.fieldSelectorSchema'
          }
        }
      ]
    }
  },
  required: ['selector', 'schema'],
  additionalProperties: false
};

export default configDefaultSchema;
