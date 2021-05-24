import { Selector, SelectorConfig, ConfigSchema } from './types';
import parseSelector from './parseSelector';
import deepParseSelector from './deepParseSelector';

function getConfigSchema(
  selectorSchema: Selector | SelectorConfig
): ConfigSchema {
  let $schema: SelectorConfig;

  if (typeof selectorSchema === 'string') {
    $schema = parseSelector(selectorSchema);
  } else if (Array.isArray(selectorSchema)) {
    $schema = { selector: <Selector>selectorSchema };
  } else if (typeof selectorSchema === 'object') {
    $schema = deepParseSelector(selectorSchema);
  } else {
    $schema = selectorSchema;
  }

  const {
    selector,
    attr,
    trim,
    self,
    rootScope,
    custom,
    methods,
    regex,
    html,
    schema
  } = $schema;

  const type = methods?.includes('array') ? 'array' : $schema.type;

  let $selector;

  if (selector) {
    $selector = Array.isArray(selector) ? selector : [selector];
  } else {
    $selector = null;
  }

  const isHTML = html || methods?.includes('html');
  const method = isHTML ? 'html' : attr ? 'attr' : 'text';
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
