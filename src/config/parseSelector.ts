import { SelectorConfig } from './types';

const parseSelector = (selector: string) => {
  const newSelector: SelectorConfig = {};
  let $selector = selector;
  let pipelines, attr;

  if (typeof selector !== 'string') {
    return selector;
  }

  if (selector?.includes('|')) {
    [$selector, ...pipelines] = selector.split('|').map((key) => key.trim());
    pipelines?.map((p) => p.trim());
  }

  if ($selector?.includes('@')) {
    [$selector, attr] = $selector.split('@').map((key) => key.trim());
  }

  if ($selector) newSelector.selector = $selector;
  if (attr) newSelector.attr = attr;
  if (pipelines?.length) newSelector.methods = pipelines;

  return newSelector;
};

export default parseSelector;
