const regexSchema = {
  $id: 'muninn.regexSchema',
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

export default regexSchema;
