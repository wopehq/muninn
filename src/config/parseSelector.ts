import { SelectorConfig } from './types';

const parseSelector = (selector: string) => {
  const newSelector: SelectorConfig = {};

  if (typeof selector === 'string') {
    const [$selector, attr] = selector.split('@').map((key) => key.trim());
    newSelector.selector = $selector;
    if (attr) {
      newSelector.attr = attr;
    }

    return newSelector;
  }

  return selector;
};

export default parseSelector;
