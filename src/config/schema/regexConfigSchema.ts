const regexConfigSchema = {
  $id: 'muninn.regexConfigSchema',
  type: 'object',
  properties: {
    pattern: {
      type: 'string'
    },
    flags: {
      type: 'string'
    }
  }
};

export default regexConfigSchema;
