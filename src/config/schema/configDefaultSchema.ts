const configDefaultSchema = {
  $id: 'muninn.configDefaultSchema',
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

export default configDefaultSchema;
