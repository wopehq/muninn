import { Selector, SelectorSchema } from '../config/types';

function getConfigSchema(selectorSchema: Selector | SelectorSchema) {
  let $schema: SelectorSchema;

  if (typeof selectorSchema === 'string' || Array.isArray(selectorSchema)) {
    $schema = { selector: <Selector>selectorSchema };
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
