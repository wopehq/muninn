const rawConfigSchema = {
  $id: 'muninn.rawConfigSchema',
  type: 'object',
  properties: {
    selector: {
      $ref: 'muninn.selectorSchema'
    },
    html: { type: 'boolean' },
    attr: { type: 'string' },
    type: { type: 'string' },
    trim: { type: 'boolean' },
    exist: { type: 'boolean' },
    initial: {},
    fill: {},
    methods: { type: 'array' },
    regex: { $ref: 'muninn.regexSchema' },
    // custom: { instanceof: 'Function' },
    // condition: { instanceof: 'Function' },
    schema: {
      oneOf: [
        { instanceof: 'Function' },
        {
          type: 'object',
          additionalProperties: {
            oneOf: [
              { $ref: 'muninn.rawConfigSchema' },
              { $ref: 'muninn.selectorSchema' }
            ]
          }
        }
      ]
    }
  },
  required: [],
  additionalProperties: false
};

export default rawConfigSchema;
