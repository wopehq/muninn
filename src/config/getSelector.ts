import { SelectorConfig } from './types';

const parseSelector = (selector: string | string[]) => {
  const newSelector: SelectorConfig = {};
  let $selector;
  let methods, attr;

  if (Array.isArray(selector)) {
    return { selector: selector.join(', ') };
  }

  if (typeof selector !== 'string') {
    return selector;
  }

  if (selector?.includes('|')) {
    [$selector, ...methods] = selector.split('|').map((key) => key.trim());
    methods?.map((p) => p.trim());
  }

  if (!$selector) {
    $selector = selector;
  }

  if ($selector?.includes('@')) {
    [$selector, attr] = $selector.split('@').map((key) => key.trim());
  }

  if ($selector)
    newSelector.selector = Array.isArray($selector)
      ? $selector.join(', ')
      : $selector;
  if (attr) newSelector.attr = attr;
  if (methods?.length) {
    if (methods.includes('array')) {
      newSelector.type = 'array';
    }
    newSelector.methods = methods.filter((i) => i !== 'array');
  }

  return newSelector;
};

export default parseSelector;
