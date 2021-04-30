import { Selector, SelectorSchema, ConfigSchema } from '../config/types';

function getConfigSchema(
  selectorSchema: Selector | SelectorSchema
): ConfigSchema {
  let $schema: SelectorSchema;

  if (typeof selectorSchema === 'string' || Array.isArray(selectorSchema)) {
    $schema = { selector: <Selector>selectorSchema };
  } else {
    $schema = <SelectorSchema>selectorSchema;
  }

  const { selector, attr, trim, html, schema } = $schema;
  const $selector = Array.isArray(selector) ? selector : [selector];
  const method = html ? 'html' : attr ? 'attr' : 'text';
  const params = attr;

  return {
    selector: $selector,
    method,
    params,
    trim,
    schema
  };
}

export default getConfigSchema;
