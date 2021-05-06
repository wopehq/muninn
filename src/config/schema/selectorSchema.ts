const selectorSchema = {
  $id: 'muninn.selectorSchema',
  oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }]
};

export default selectorSchema;
