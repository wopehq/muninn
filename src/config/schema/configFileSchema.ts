const configFileSchema = {
  type: 'object',
  additionalProperties: {
    $ref: 'muninn.configDefaultSchema'
  },
  properties: {}
};

export default configFileSchema;
