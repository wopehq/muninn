import { Selector, SelectorConfig, ConfigSchema } from './types';

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
    self,
    rootScope,
    custom,
    regex,
    html,
    schema
  } = $schema;

  let $selector;

  if (selector && !Array.isArray(selector)) {
    $selector = [selector];
  } else {
    $selector = null;
  }

  const method = html ? 'html' : attr ? 'attr' : 'text';
  const params = attr;

  return {
    selector: $selector,
    method,
    self,
    params,
    rootScope,
    regex,
    custom,
    trim,
    type,
    schema
  };
}

export default getConfigSchema;
