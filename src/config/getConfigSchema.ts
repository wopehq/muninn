import { Selector, SelectorConfig, ConfigSchema } from './types';
import parseSelector from './parseSelector';

function getConfigSchema(
  selectorSchema: Selector | SelectorConfig
): ConfigSchema {
  let $schema: SelectorConfig;

  if (typeof selectorSchema === 'string') {
    $schema = parseSelector(selectorSchema);
  } else if (Array.isArray(selectorSchema)) {
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
    methods,
    regex,
    html,
    schema
  } = $schema;

  let $selector;

  if (selector) {
    $selector = Array.isArray(selector) ? selector : [selector];
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
    methods,
    trim,
    type,
    schema
  };
}

export default getConfigSchema;
