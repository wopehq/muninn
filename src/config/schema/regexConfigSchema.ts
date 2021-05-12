const regexConfigSchema = {
  $id: 'muninn.regexConfigSchema',
  oneOf: [
    {
      type: 'object',
      properties: {
        pattern: {
          type: 'string'
        },
        flags: {
          type: 'string'
        }
      }
    },
    {
      type: 'string'
    }
  ]
};

export default regexConfigSchema;
