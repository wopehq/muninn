const configFileSchema = {
  type: 'object',
  additionalProperties: {
    oneOf: [
      { $ref: 'muninn.configBlockSchema' },
      { $ref: 'muninn.configDefaultSchema' }
    ]
  },
  properties: {}
};

export default configFileSchema;
