import { SelectorSchema } from '../config/types';

function getConfigSchema(selectorSchema: string | SelectorSchema) {
  let $schema: SelectorSchema;

  if (typeof selectorSchema === 'string') {
    $schema = { selector: <string>selectorSchema };
  } else {
    $schema = <SelectorSchema>selectorSchema;
  }

  const { selector, attr, html, schema } = $schema;
  const $selector = Array.isArray(selector) ? selector : [selector];
  const method = html ? 'html' : attr ? 'attr' : 'text';
  const params = attr;

  return {
    selector: $selector,
    method,
    params,
    schema
  };
}

export default getConfigSchema;
