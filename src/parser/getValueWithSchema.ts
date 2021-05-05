import getValue from './getValue';

function getValueWithSchema($, el, schema) {
  const value = Object.keys(schema).reduce((acc, key) => {
    const currentSchema = schema[key];
    const value = getValue($, el, currentSchema);

    acc[key] = value;

    return acc;
  }, {});

  return value;
}

export default getValueWithSchema;
