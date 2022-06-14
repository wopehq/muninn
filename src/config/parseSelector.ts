import { Selector, RawConfig } from './types';

function parseSelector<Initial = unknown>(
  selector: Selector
): RawConfig<Initial> {
  const config: RawConfig<Initial> = { selector: '' };

  let $selector: string, methods: string[], attr: string;

  if (typeof selector !== 'string') {
    return selector;
  }

  if (selector.includes('|')) {
    [$selector, ...methods] = selector.split('|').map((key) => key.trim());

    methods = methods.map((p: string) => p.trim());
  }

  if (!$selector) {
    $selector = selector;
  }

  if ($selector.includes('@')) {
    [$selector, attr] = $selector.split('@').map((key) => key.trim());
  }

  if ($selector)
    config.selector = Array.isArray($selector)
      ? $selector.join(', ')
      : $selector;

  if (attr) config.attr = attr;

  if (methods?.length) {
    if (methods.includes('array')) {
      config.type = 'array';
    }
    config.methods = methods.filter((i) => i !== 'array');
  }

  return config;
}

export default parseSelector;
