import { Selector, SelectorConfig, ConfigSchema } from '../config/types';

function getConfigSchema(
  selectorSchema: Selector | SelectorConfig
): ConfigSchema {
  let $schema: SelectorConfig;

  if (typeof selectorSchema === 'string' || Array.isArray(selectorSchema)) {
    $schema = { selector: <Selector>selectorSchema };
  } else {
    $schema = <SelectorConfig>selectorSchema;
  }

  const {
    selector,
    attr,
    trim,
    type,
    rootScope,
    regex,
    html,
    schema
  } = $schema;
  const $selector = Array.isArray(selector) ? selector : [selector];
  const method = html ? 'html' : attr ? 'attr' : 'text';
  const params = attr;

  return {
    selector: $selector,
    method,
    params,
    rootScope,
    regex,
    trim,
    type,
    schema
  };
}

export default getConfigSchema;
