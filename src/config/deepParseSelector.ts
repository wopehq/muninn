import { Selector, SelectorConfig } from './types';
import parseSelector from './parseSelector';

function deepParseSelector(selectorSchema: SelectorConfig): SelectorConfig {
  Object.keys(selectorSchema).forEach((key) => {
    const currentSelectorSchema = selectorSchema[key];
    if (key === 'selector') {
      if (typeof selectorSchema[key] === 'string') {
        selectorSchema = {
          ...selectorSchema,
          ...parseSelector(currentSelectorSchema)
        };
      } else if (typeof currentSelectorSchema === 'object') {
        selectorSchema[key] = <Selector>(
          deepParseSelector(currentSelectorSchema)
        );
      }
    }
  });

  return selectorSchema;
}

export default deepParseSelector;
