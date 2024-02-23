import { type Selector, type RawConfig, type Method } from './types';

function parseSelector<Initial = unknown>(
  selector: Selector
): RawConfig<Initial> {
  const config: RawConfig<Initial> = { selector: '' };

  let $selector: string, methods: string[], attr: string | string[];

  if (typeof selector !== 'string') {
    return selector;
  }

  if (selector.includes('|')) {
    [$selector, ...methods] = selector.split('|').map((key) => key.trim());

    if (methods.length > 0) {
      const validMethods = [
        'boolean',
        'float',
        'number',
        'length',
        'lowercase',
        'uppercase',
        'email',
        'url'
      ];

      const acceptedMethods = methods.filter((method: string) =>
        validMethods.includes(method)
      ) as Method[];

      const type = methods.includes('array') ? 'array' : config.type;
      const html = methods.includes('html') ? true : config.html;
      const exist = methods.includes('exist') ? true : config.exist;

      let trim = config.trim;

      if (methods.includes('trim')) {
        trim = true;
      } else if (methods.includes('non-trim')) {
        trim = false;
      }

      if (type) config.type = type;
      if (html) config.html = html;
      if (exist) config.exist = exist;
      if (typeof trim === 'boolean') config.trim = trim;

      if (acceptedMethods.length > 0) {
        config.methods = acceptedMethods;
      }
    }
  }

  if ($selector === undefined) {
    $selector = selector;
  }

  if ($selector.includes('@')) {
    [$selector, attr] = $selector.split('@').map((key) => key.trim());
    const attrs = attr.split(',').map((key) => key.trim());
    attr = attrs.length > 1 ? attrs : attr;
  }

  if ($selector)
    config.selector = Array.isArray($selector)
      ? $selector.join(', ')
      : $selector;

  if (attr) config.attr = attr;

  return config;
}

export default parseSelector;
