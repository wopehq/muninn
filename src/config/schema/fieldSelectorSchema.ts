const fieldSelectorSchema = {
  $id: 'muninn.fieldSelectorSchema',
  type: 'object',
  properties: {
    selector: {
      $ref: 'muninn.selectorSchema'
    },
    regex: {
      $ref: 'muninn.regexConfigSchema'
    },
    html: {
      type: 'string'
    },
    attr: {
      type: 'string'
    },
    type: {
      type: 'string'
    },
    trim: {
      type: 'boolean'
    },
    custom: {
      instanceof: 'Function'
    },
    methods: {
      type: 'array'
    },
    rootScope: {
      type: 'boolean'
    },
    schema: {
      oneOf: [
        { instanceof: 'Function' },
        {
          type: 'object',
          additionalProperties: {
            oneOf: [
              { $ref: 'muninn.fieldSelectorSchema' },
              { $ref: 'muninn.selectorSchema' }
            ]
          }
        }
      ]
    }
  },
  required: [],
  dependencies: {
    schema: {
      not: {
        required: ['html', 'attr', 'trim', 'regex', 'custom', 'methods']
      }
    },
    html: {
      not: {
        required: ['schema']
      }
    },
    attr: {
      not: {
        required: ['schema']
      }
    },
    regex: {
      not: {
        required: ['schema']
      }
    },
    trim: {
      not: {
        required: ['schema']
      }
    },
    custom: {
      not: {
        required: ['schema']
      }
    },
    methods: {
      not: {
        required: ['schema']
      }
    }
  },
  additionalProperties: false
};

export default fieldSelectorSchema;
